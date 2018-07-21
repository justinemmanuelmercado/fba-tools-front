import './privacyPolicy.css';
function ComponentController($scope) {
    const vm = this;

    $scope.massage = 'Hello';
    vm.message = 'World';
    $scope.isLogin = true;

    vm.login = () => {
        //login logic here
    }

    vm.register = () => {
        //register logic here
    }

}

ComponentController.$inject = ['$scope'];

export default {
    template: require('./privacyPolicy.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
