import './loginComponent.css';

ComponentController.$inject = ['$scope', 'authenticationService', 'navigationService', 'merchantService'];

function ComponentController($scope, authenticationService, navigate, merchantService) {
    const vm = this;

    /** Promises **/
    vm.loginPromise = {};

    vm.merchantDropdownList = [];

    vm.loginCredentials = {};
    vm.registerDetails = {};
    $scope.isLogin = true;

    vm.$onInit = function activate() {
        vm.getDropdownMerchantList();
    };

    /**
     * @todo LOGIC FOR LOGIN AND REGISTER
     */
    vm.login = (form) => {

        var creds = {
            email: vm.loginCredentials.email,
            password: vm.loginCredentials.password
        };

        //if form is valid 
        if (form.$valid) {
            //login logic here
            vm.loginPromise = authenticationService.login(creds)
                .then((result) => {
                    if (result.data) {
                        navigate.toSales();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    vm.register = (form) => {

        var register_details = {
            email: vm.registerDetails.email,
            password: vm.registerDetails.password,
            merchant: vm.registerDetails.merchant
        };


        if (form.$valid) {
            authenticationService.register(register_details)
                .then((result) => {
                    if (result.data) {
                        console.log(result);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        //register logic here
    }

    //get list of merchants
    vm.getDropdownMerchantList = () => {

        vm.merchantDropdownPromise = merchantService.getMerchants()
        .then((result) => {
            vm.merchantDropdownList = result.data;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    vm.clearForm = () => {

    }

}

export default {
    template: require('./loginComponent.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
