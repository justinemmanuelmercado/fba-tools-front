function ComponentController() {
    const vm = this;
}

ComponentController.$inject = [];

export default {
    template: require('./merchants.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
