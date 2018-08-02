const service = function service(constantsService, $cookies) {

    var logged_user_info_cookie = {
        name : 'logged-user-info',
        options : {
            path : '/',
            secure : true
        }
    }

    const setUserAuthTokenToCookie = auth_token => {
        return $cookies.putObject(constantsService.auth_cookie_config.name, auth_token, constantsService.auth_cookie_config.options);
    };

    const getUserAuthTokenFromCookie = () => {
        return $cookies.getObject(constantsService.auth_cookie_config.name);
    };

    const deleteUserAuthTokenFromCookie = () => {
        return $cookies.remove(constantsService.auth_cookie_config.name, constantsService.auth_cookie_config.options);
    }

    /** Logged User **/
    const setLoggedUserToCookie = userInfo => {
        return $cookies.putObject(constantsService.logged_user_info_cookie.name, userInfo, constantsService.logged_user_info_cookie.options);
    }

    const getLoggedUserFromCookie = () => {
        return $cookies.getObject(constantsService.logged_user_info_cookie.name);
    }

    const deleteLoggedUserFromCookie = () => {
        return $cookies.remove(constantsService.logged_user_info_cookie.name, constantsService.logged_user_info_cookie.options);
    }

    return {
        setUserAuthTokenToCookie,
        getUserAuthTokenFromCookie,
        deleteUserAuthTokenFromCookie,
        setLoggedUserToCookie,
        getLoggedUserFromCookie,
        deleteLoggedUserFromCookie
    };
};

service.$inject = ['constantsService', '$cookies'];

module.exports = service;
