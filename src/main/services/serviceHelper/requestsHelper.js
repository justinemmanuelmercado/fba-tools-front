const service = function helperService($http) {
    const API_HOME = 'http://localhost:3000/api/';

    const post = (url, requestBody) => $http.post(`${API_HOME}${url}`, requestBody);
    const get = url => $http.get(`${API_HOME}${url}`);
    
    return {
        post,
        get,
    };
};

service.$inject = ['$http'];

module.exports = service;
