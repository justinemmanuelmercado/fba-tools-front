import './rootComponent.css';

function ComponentController($scope) {
    const vm = this;

    $scope.massage = 'Hello';
    //everytime narerefresh yung buong app dapat chinecheck kung may nakalogin o wala
    vm.message = 'World';
}

ComponentController.$inject = ['$scope'];

export default {
    template: require('./rootComponent.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
    bindings: { view: '<'}
};
