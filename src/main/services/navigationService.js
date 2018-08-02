const service = function service($window, $location, $state) {

    const toHome = () => {
        //$window.location.href = '#';
        $location.path('/');

        // $window.location.reload(true);
        //$window.location.reload(true);
    };

    const toSales = () => {
        //$state.go('sales');
        //$location.path('/sales');
        $window.location.href = '#sales';
        $window.location.reload(true);
        //$window.location.reload(true);
    }

    return {
        toHome,
        toSales
    };
};

service.$inject = ['$window', '$location', '$state'];

module.exports = service;
