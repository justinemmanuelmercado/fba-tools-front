function ComponentController(rawRunnerService) {
    const vm = this;
    vm.data = "none yet";

    const activate = function() {
        console.log('activate');
        rawRunnerService.rawQuerySelect('SELECT * FROM mwsdb.sales_last_12_months').then((data) => {
            console.log(data);
        });
    };

    vm.$onInit = activate;
}

ComponentController.$inject = ['rawRunnerService'];

export default {
    template: require('./tableDemo.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
