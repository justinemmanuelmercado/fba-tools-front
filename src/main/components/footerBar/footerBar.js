function ComponentController() {
    const vm = this;
}

ComponentController.$inject = [];

export default {
    template: require('./footerBar.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
