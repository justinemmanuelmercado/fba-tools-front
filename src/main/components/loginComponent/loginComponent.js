import './loginComponent.css';

ComponentController.$inject = ['$scope', 'authenticationService'];

function ComponentController($scope, authenticationService) {
    const vm = this;

    vm.loginPromise = {};
    vm.credentials = {};
    $scope.isLogin = true;

    vm.$onInit = function activate() {

    };

    /**
     * @todo LOGIC FOR LOGIN AND REGISTER
     */
    vm.login = (form) => {
        
        var creds = {
            email : vm.credentials.email,
            password : vm.credentials.password
        };

        //if form is valid 
        if (form.$valid) {
            //login logic here
            authenticationService.login(creds)
            .then((result) => {
                if (result.data) {
                    
                }
                //console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    vm.register = () => {
        //register logic here
    }

    vm.clearForm = () => {

    }

}

export default {
    template: require('./loginComponent.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
