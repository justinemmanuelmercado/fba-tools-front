function ComponentController() {
    const vm = this;
    vm.policy_url = 'http://localhost:2992/#/privacy-policy';
}

ComponentController.$inject = [];

export default {
    template: require('./footerBar.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
