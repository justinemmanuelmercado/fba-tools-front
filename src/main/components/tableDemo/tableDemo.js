import './tableDemo.css';

function ComponentController(rawRunnerService, orderBy) {
    const vm = this;

    vm.sqlQuery = 'SELECT * FROM mwsdb.sales_last_12_months LIMIT 100';
    vm.tableData = [];
    vm.fetchedData = [];
    vm.tableHeaders = [];

    vm.propertyName = '';
    vm.reverse = true;
    vm.searchFilter = '';

    vm.loadData = () => {
        rawRunnerService.rawQuerySelect(vm.sqlQuery).then((data) => {
            const [tableData] = data.data;

            vm.fetchedData = tableData;
            vm.tableData = tableData;
            vm.tableHeaders = data.data[1].map(value => value.name);

            vm.propertyName = vm.tableHeaders[0];

        });
    };

    const activate = function activate() {
        vm.loadData();
        vm.tableData = orderBy(vm.fetchedData, vm.propertyName, vm.reverse);
    };

    vm.sortBy = (propertyName) => {
        
        vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
        vm.propertyName = propertyName;
        vm.tableData = orderBy(vm.fetchedData, vm.propertyName, vm.reverse);
        console.log(vm.propertyName, vm.reverse);
        
      };

    vm.$onInit = activate;

}

ComponentController.$inject = ['rawRunnerService', 'orderByFilter'];

export default {
    template: require('./tableDemo.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
};
