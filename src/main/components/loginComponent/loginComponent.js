import './loginComponent.css';
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
    template: require('./loginComponent.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
