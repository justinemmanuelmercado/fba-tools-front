import './tableDemo.css';

function ComponentController(rawRunnerService) {
  const vm = this;

  vm.sqlQuery = 'SELECT * FROM mwsdb._get_merchant_listings_all_data_';
  vm.tableData = [];
  vm.tableHeaders = [];
  vm.tableHeaderFilters = {};
  vm.objectFilter = {};
  vm.maxLengthCell = 100;

  vm.reverse = false;
  vm.column = '';

  vm.change = () => console.log(vm.objectFilter);

  vm.loadData = () => {
    rawRunnerService.rawQuerySelect(vm.sqlQuery).then((data) => {
      const [tableData] = data.data;
      vm.tableData = tableData;
      vm.tableHeaders = data.data[1].map(value => value.name);

      console.log(vm.tableData);

      vm.createSelectData(vm.tableData, vm.tableHeaders);
      vm.createBlankObjectFilter(vm.tableHeaders);
    });

  };

  vm.createBlankObjectFilter = (tableHeaders) => {
    vm.objectFilter = {};
    tableHeaders.forEach((header) => {
      vm.objectFilter[header] = ['!!'];
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
  vm.sortColumn = (col) => {
    vm.column = col;
    if (vm.reverse) {
      vm.reverse = false;
      vm.reverseclass = 'arrow-up';
    } else {
      vm.reverse = true;
      vm.reverseclass = 'arrow-down';
    }

  };

  // remove and change class
  vm.sortClass = (col) => {
    if (vm.column == col) {
      if (vm.reverse) {
        return 'arrow-down';
      } else {
        return 'arrow-up';
      }
    } else {
      return '';
    }
  };


  vm.$onInit = function activate() {
    vm.loadData();
  };

  vm.multipleSelectFilter = (item) => {
    let matchesAllHeaders = false;
    const headersMatched = [];

    vm.tableHeaders.forEach((currentHeader) => {
      const itemValue = item[currentHeader];
      const filterValueArray = vm.objectFilter[currentHeader];
      const isMatchForHeader = [];

      if (filterValueArray.includes('!!') ||
        filterValueArray.includes(itemValue)) {
        headersMatched.push(true);
      } else {
        headersMatched.push(false);
      }

    });

    matchesAllHeaders = !headersMatched.includes(false);

    return matchesAllHeaders;
  };

}

ComponentController.$inject = ['rawRunnerService', 'orderByFilter'];

export default {
  template: require('./tableDemo.html'),
  controllerAs: '$ctrl',
  controller: ComponentController,
};

