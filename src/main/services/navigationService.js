const service = function service($window) {

    const toHome = () => {
        $window.location.href = "#";
    };

    const toSales = () => {
        $window.location.href = "#sales";
    }

    return {
        toHome,
        toSales
    };
};

service.$inject = ['$window'];

module.exports = service;
