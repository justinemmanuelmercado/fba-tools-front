const service = function service(requestsHelper) {

    const rawQuerySelect = (query) => {
        const requestBody = {
            query,
        };
        return requestsHelper.post('raw', requestBody);
    };

    const requestView = view => requestsHelper.post('raw/view', { view });

    return {
        rawQuerySelect,
        requestView,
    };
};

service.$inject = ['requestsHelper'];

module.exports = service;
