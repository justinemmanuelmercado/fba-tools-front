const service = function service(requestsHelper, cookieHelper, $q, userService) {

    const API_URLS = {
        validate_token: 'accounts/valid',
        login: 'accounts/login',
        register: 'accounts'
    }

    const login = credentials => {
        return requestsHelper.post(API_URLS.login, credentials)
            .then((login_response) => {
                if (login_response.status == 200) {
                    //if success store auth token
                    cookieHelper.setUserAuthTokenToCookie(login_response.data.token);
                    userService.fac.SetCurrentUser(login_response.config.data);
                }
                return login_response.status;
            });
    };

    const logout = () => {
        userService.fac.RemoveCurrentUser();
        return cookieHelper.deleteUserAuthTokenFromCookie();
    }

    /**
     * @todo further validation needed
     */
    const register = userInfo => requestsHelper.post(API_URLS.register, userInfo);

    const authenticateUser = () => {
        let authToken = cookieHelper.getUserAuthTokenFromCookie();
        if (!authToken) return false;
        var isAuthorized = false;

        requestsHelper.get(API_URLS.validate_token)
            .then((result) => {
                if (result.data.result) {
                    isAuthorized = true;
                }
            })
            .catch((err) => {
                console.log(err); return false;
            });

        return isAuthorized;
    }

    return {
        login,
        logout,
        register,
        authenticateUser
    };
};

service.$inject = ['requestsHelper', 'cookieHelper', '$q', 'userService'];

module.exports = service;
