function ComponentController() {
    const vm = this;
}

ComponentController.$inject = [];

export default {
    template: require('./navigationBar.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
