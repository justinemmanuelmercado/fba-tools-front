const service = function (requestsHelper) {

    const rawQuerySelect = (query) => {
        const requestBody = {
            query
        };
        return requestsHelper.post('raw', requestBody);
    }

    return {
        rawQuerySelect,
    };
};

service.$inject = ['requestsHelper'];

module.exports = service;
