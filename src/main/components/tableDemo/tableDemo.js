import numeral from 'numeral';
import './tableDemo.css';

function ComponentController(rawRunnerService, pagerService) {
  const vm = this;

  vm.sqlQuery = 'SELECT * FROM mwsdb.customers limit 100';
  vm.tableData = [];
  vm.tableHeaders = [];
  vm.tableHeaderFilters = {};
  vm.objectFilter = {};
  vm.activeTables = {};
  vm.headerAllOption = {};
  vm.maxLengthCell = 100;

  vm.reverse = false;
  vm.column = '';

  //pagination
  vm.pager = {};
  vm.items = [];
  //vm.setPage = setPage;

  vm.change = () => console.log(vm.objectFilter);

  vm.loadData = () => {
    rawRunnerService.rawQuerySelect(vm.sqlQuery).then((data) => {
      const [tableData] = data.data;

      vm._parseNumericValues(tableData);
      vm.tableData = tableData;

      vm.tableHeaders = data.data[1].map(value => value.name);
      //set current page to 1
      vm.setPage(1);
      vm.createSelectData(vm.tableData, vm.tableHeaders);
      vm.createDefaultObjectFilter(vm.tableHeaders);
      vm.createBlankActivesObject(vm.tableHeaders);
    });

  };

  vm.setPage = (page) => {
    if (page < 1 || page > vm.pager.totalPages) {
      return;
    }
    // get pager object from service (yung 5 number of record per page)
    vm.pager = pagerService.GetPager(vm.tableData.length, page, 5);
    // get current page of items
    vm.items = vm.tableData.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
  };

  vm._parseNumericValues = (tableData) => {

    tableData.forEach((rowData, index) => {
      var parsed_fee_data = '';
      var parsed_sales_data = '';

      //isip pa kung pano madedetect yung mga fields na dapat numerical
      // for now 
      parsed_fee_data = numeral(rowData.FEES);
      parsed_sales_data = numeral(rowData.SALES);

      tableData[index].FEES = parsed_fee_data.value();
      tableData[index].SALES = parsed_sales_data.value();

    });
  }

  vm.createDefaultObjectFilter = (tableHeaders) => {
    vm.objectFilter = {};
    tableHeaders.forEach((header) => {
      vm.objectFilter[header] = angular.copy(vm.tableHeaderFilters[header]);
    });
  };

  vm.createBlankActivesObject = (tableHeaders) => {
    vm.activeTables = {};
    tableHeaders.forEach((header) => {
      vm.activeTables[header] = false;
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
    if (vm.column === col) {
      if (vm.reverse) {
        return 'arrow-down';
      }
      return 'arrow-up';
    }

    return '';
  };

  vm.toggleSelection = (value, columnTitle) => {
    const idx = vm.objectFilter[columnTitle].indexOf(value);
    // Is currently selected
    if (idx > -1) {
      vm.objectFilter[columnTitle].splice(idx, 1);
    } else {
      vm.objectFilter[columnTitle].push(value);
    }
  };

  vm.inSelection = (value, columnTitle) => {
    const idx = vm.objectFilter[columnTitle].indexOf(value);

    return idx > -1;
  };

  vm.toggleAllSelection = (columnTitle) => {
    if (vm.tableHeaderFilters[columnTitle].length === vm.objectFilter[columnTitle].length) {
      vm.objectFilter[columnTitle] = [];
      return;
    }
    vm.objectFilter[columnTitle] = angular.copy(vm.tableHeaderFilters[columnTitle]);
  };

  vm.$onInit = function activate() {
    vm.loadData();
  };

  vm.multipleSelectFilter = (item) => {
    let matchesAllHeaders = false;
    const headersMatched = [];

    // for(let i = 0; i < vm.tableHeaders.length; i++){
    //   const currentHeader = vm.tableHeaders[i];
    //   const itemValue = item[currentHeader];
    //   const filterValueArray = vm.objectFilter[currentHeader];

    //   if (filterValueArray.includes(itemValue)) {
    //     headersMatched.push(true);
    //   } else {
    //     headersMatched.push(false);
    //   }
    // }

    vm.tableHeaders.forEach((currentHeader) => {
      const itemValue = item[currentHeader];
      const filterValueArray = vm.objectFilter[currentHeader];

      if (filterValueArray.includes(itemValue)) {
        headersMatched.push(true);
      } else {
        headersMatched.push(false);
      }
    });

    matchesAllHeaders = !headersMatched.includes(false);

    return matchesAllHeaders;
  };

}

ComponentController.$inject = ['rawRunnerService', 'pagerService'];

export default {
  template: require('./tableDemo.html'),
  controllerAs: '$ctrl',
  controller: ComponentController,
};

