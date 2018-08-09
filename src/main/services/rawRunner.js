const service = function service(requestsHelper) {

    const rawQuerySelect = (query) => {
        const requestBody = {
            query,
        };
        return requestsHelper.post('raw', requestBody);
    };

    const requestView = view => requestsHelper.post('raw/view', { view });
    const requestTable = table => requestsHelper.post('raw/chart', { table });

    return {
        rawQuerySelect,
        requestView,
        requestTable
    };
};

service.$inject = ['requestsHelper'];

module.exports = service;
