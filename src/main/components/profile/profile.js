function ComponentController() {
    const vm = this;
}

ComponentController.$inject = [];

export default {
    template: require('./profile.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
