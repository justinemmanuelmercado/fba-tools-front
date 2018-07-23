const service = function service(requestsHelper) {

    const rawQuerySelect = (query) => {
        const requestBody = {
            query,
        };
        return requestsHelper.post('raw', requestBody);
    };

    const login = credentials => requestsHelper.post('accounts/login', credentials);
    const register = userInfo => requestsHelper.post('accounts', userInfo);

    return {
        rawQuerySelect,
        login,
        register
    };
};

service.$inject = ['requestsHelper'];

module.exports = service;
