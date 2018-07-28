const service = function service(requestsHelper, cookieHelper) {
    const rawQuerySelect = (query) => {
        const requestBody = {
            query,
        };
        return requestsHelper.post('raw', requestBody);
    };

    const login = credentials => {
        return requestsHelper.post('accounts/login', credentials)
            .then((login_response) => {
                if (login_response.status == 200) {
                    //if success store auth token
                    cookieHelper.setUserAuthTokenToCookie(login_response.data.token);
                }
                return login_response;
            });
    };

    const register = userInfo => requestsHelper.post('accounts', userInfo);

    const authenticateUser = userInfo => {
        
    }

    return {
        rawQuerySelect,
        login,
        register
    };
};

service.$inject = ['requestsHelper', 'cookieHelper'];

module.exports = service;
