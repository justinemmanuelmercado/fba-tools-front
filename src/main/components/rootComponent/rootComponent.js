import './rootComponent.css';

function ComponentController($scope) {
    const vm = this;

    $scope.massage = 'Hello';

    vm.message = 'World';
}

ComponentController.$inject = ['$scope'];

export default {
    template: require('./rootComponent.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
    bindings: { view: '<'}
};
