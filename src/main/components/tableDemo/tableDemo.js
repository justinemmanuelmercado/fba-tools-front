import './tableDemo.css';

function ComponentController(rawRunnerService) {
    const vm = this;

    vm.sqlQuery = 'SELECT * FROM mwsdb.sales_last_12_months';
    vm.tableData = [];
    vm.tableHeaders = [];

    vm.loadData = () => {
        rawRunnerService.rawQuerySelect(vm.sqlQuery).then((data) => {
            const [tableData] = data.data;
            vm.tableData = tableData;
            vm.tableHeaders = data.data[1].map(value => value.name);

            console.log(vm.tableData, vm.tableHeaders);
        });
    };

    const activate = function activate() {
        vm.loadData();
    };

    vm.$onInit = activate;

}

ComponentController.$inject = ['rawRunnerService'];

export default {
    template: require('./tableDemo.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
