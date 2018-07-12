import './loginComponent.css';

function ComponentController($scope) {
    const vm = this;

    $scope.massage = 'Hello';
    console.log("YES!");
    vm.message = 'World';
}

ComponentController.$inject = ['$scope'];

export default {
    template: require('./loginComponent.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
