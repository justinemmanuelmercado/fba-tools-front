import './tableDemo.css';

function ComponentController(rawRunnerService) {
  const vm = this;

  vm.sqlQuery = 'SELECT * FROM mwsdb._get_merchant_listings_all_data_';
  vm.tableData = [];
  vm.tableHeaders = [];
  vm.tableHeaderFilters = {};
  vm.objectFilter = {};

  vm.reverse = false;
  vm.column = '';

  vm.change = () => console.log(vm.objectFilter);

  vm.loadData = () => {
    rawRunnerService.rawQuerySelect(vm.sqlQuery).then((data) => {
      const [tableData] = data.data;
      vm.tableData = tableData;
      vm.tableHeaders = data.data[1].map(value => value.name);
     
      vm.createSelectData(vm.tableData, vm.tableHeaders);
      vm.createBlankObjectFilter(vm.tableHeaders);
    });
  };

  vm.createBlankObjectFilter = (tableHeaders) => {
    tableHeaders.forEach((header) => {
      vm.objectFilter[header] = '!!';
    });
  };

  vm.createSelectData = (tableData, tableHeaders) => {
    for (let i = 0; i < tableHeaders.length; i++) {

      const currentTableHeader = tableHeaders[i];
      const seen = {};
      const filterArray = [];

      for (let j = 0; j < tableData.length; j++) {
        const currentTableData = tableData[j];
        const currentTableDataValue = currentTableData[currentTableHeader];
        if (!seen[currentTableDataValue]) {
          filterArray.push(currentTableDataValue);
          seen[currentTableDataValue] = true;
        }
      }

      vm.tableHeaderFilters[currentTableHeader] = filterArray;
    }
  };

 // called on header click
 vm.sortColumn = (col) => {;
    vm.column = col;
    if(vm.reverse){
      vm.reverse = false;
      vm.reverseclass = 'arrow-up';
    }else{
      vm.reverse = true;
      vm.reverseclass = 'arrow-down';
    }
 };
 
 // remove and change class
 vm.sortClass = (col) => {
    if(vm.column == col ){
      if(vm.reverse){
        return 'arrow-down'; 
      }else{
        return 'arrow-up';
      }
    }else{
      return '';
    }
 }; 


  vm.$onInit = function activate() {
    vm.loadData();
  };

}

ComponentController.$inject = ['rawRunnerService', 'orderByFilter'];

export default {
  template: require('./tableDemo.html'),
  controllerAs: '$ctrl',
  controller: ComponentController,
};

