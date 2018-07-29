const service = function helperService($http, constantsService, cookieHelper) {
    $http.defaults.headers.common.Authorization = cookieHelper.getUserAuthTokenFromCookie();
    const { API_HOME } = constantsService;

    const post = (url, requestBody) => { return $http.post(`${API_HOME}${url}`, requestBody); };
    const get = url => $http.get(`${API_HOME}${url}`);

    return {
        post,
        get,
    };
};

service.$inject = ['$http', 'constantsService', 'cookieHelper'];

module.exports = service;
