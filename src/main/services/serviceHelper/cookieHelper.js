const service = function service(constantsService, $cookies) {

    const setUserAuthTokenToCookie = auth_token => {
        return $cookies.putObject(constantsService.auth_cookie_config.name, auth_token, constantsService.auth_cookie_config.options);
    };

    const getUserAuthTokenFromCookie = () => {
        return $cookies.getObject(constantsService.auth_cookie_config.name);
    };

    return {
        setUserAuthTokenToCookie,
        getUserAuthTokenFromCookie
    };
};

service.$inject = ['constantsService', '$cookies'];

module.exports = service;
