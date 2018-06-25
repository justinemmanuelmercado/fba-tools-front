const service = function ($http) {
    const API_HOME = 'http://localhost:3000/api/'

    const post = (url, requestBody) => {
        return $http.post(`${API_HOME}${url}`, requestBody);
    };

    return {
        post,
    };
};

service.$inject = ['$http'];

module.exports = service;
