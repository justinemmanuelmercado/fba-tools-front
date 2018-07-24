const service = function service(requestsHelper) {

    const getMerchants = () => requestsHelper.get('merchants');

    return {
        getMerchants
    };
};

service.$inject = ['requestsHelper'];

module.exports = service;
