const service = function helperService($http, constantsService) {
    const { API_HOME } = constantsService;

    const post = (url, requestBody) => $http.post(`${API_HOME}${url}`, requestBody);
    const get = url => $http.get(`${API_HOME}${url}`);

    return {
        post,
        get,
    };
};

service.$inject = ['$http', 'constantsService'];

module.exports = service;
