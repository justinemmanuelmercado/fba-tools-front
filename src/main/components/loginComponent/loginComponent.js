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
        vm.activateAmazon();
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
                    if (result.status == 200) {
                        //store token on localstorage
                    } else {
                        
                    }
                    console.log(result);
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
            merchantId: vm.registerDetails.merchant
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

    };

    vm.activateAmazon = () => {
        document.getElementById('LoginWithAmazon').onclick = function () {
            let options = { scope: 'profile' };
            amazon.Login.authorize(options,
                'http://localhost:2992');
            return false;
        };

        window.onAmazonLoginReady = function () {
            amazon.Login.setClientId('amzn1.application-oa2-client.da5763eff90341b69303a354628e534a');
        };
        (function (d) {
            var a = d.createElement('script'); a.type = 'text/javascript';
            a.async = true; a.id = 'amazon-login-sdk';
            a.src = 'https://api-cdn.amazon.com/sdk/login1.js';
            d.getElementById('amazon-root').appendChild(a);
        })(document);
    };

}

export default {
    template: require('./loginComponent.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
