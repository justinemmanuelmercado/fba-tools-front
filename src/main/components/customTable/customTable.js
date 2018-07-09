import numeral from 'numeral';
import './tableDemo.css';

function ComponentController(rawRunnerService, pagerService, dataTypeHelper, $scope) {
  const vm = this;

  // Data
  vm.sqlQuery = 'select * from sales_last_12_months';
  vm.tableData = [];
  vm.tableHeaders = [];
  vm.tableHeaderFilters = {};
  vm.objectFilter = {};
  vm.activeTables = {};
  vm.headerAllOption = {};
  vm.typeMap = {};
  vm.reverse = false;
  vm.column = '';
  vm.pager = {};
  vm.items = [];

  // Constants
  vm.maxLengthCell = 100;


  //vm.setPage = setPage; // @todo temporarily removed
  
  vm.change = () => console.log(vm.objectFilter);

  vm.loadData = () => {
    rawRunnerService.rawQuerySelect(vm.sqlQuery).then((data) => {
      /**
       * Set index 0 of data.data as const tableData
       * and index 1 of data.data as const rawHeaderData
       */
      const [tableData, rawHeaderData] = data.data;

      const tempTableData = tableData;

      vm.tableHeaders = rawHeaderData.map(value => value.name);

      /**
       * Set current page to 1
       */
      vm.setPage(1);

      /**
       *  Set default data
       */
      vm.createBlankActivesObject(vm.tableHeaders);
      
      vm.createTypeMapper(tempTableData, vm.tableHeaders).then((typeMap) => {
        if (Object.values(typeMap).includes('number')) {
          const numberHeaders = [];
          for (let i = 0; i < vm.tableHeaders.length; i++) {
            const currentTableHeader = vm.tableHeaders[i];
            const currentTableHeaderType = vm.typeMap[currentTableHeader];
            
            if (currentTableHeaderType !== 'number') {
              continue;
            }
            
            numberHeaders.push(currentTableHeader);
          }
          
          vm.tableData = tempTableData.map((row) => {
            numberHeaders.forEach((header) => {
              row[header] = numeral(row[header]).value();
            });
            
            return row;
          });
          
          console.log(vm.tableData);
          vm.createSelectData(vm.tableData, vm.tableHeaders);
          vm.createDefaultObjectFilter(vm.tableHeaders);
        } else {
          vm.tableData = tempTableData;
        }
        $scope.$digest();
      });
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
    for (let i = 0; i < vm.tableHeaders.length; i++) {
      const currentHeader = vm.tableHeaders[i];
      const itemValue = item[currentHeader];
      const filterValueArray = vm.objectFilter[currentHeader];

      if (!filterValueArray.includes(itemValue)) {
        return false;
      }
    }
    console.log(item);
    return true;
  };

  vm.createTypeMapper = (tableData, tableHeaders) => {
    return new Promise((resolve) => {
      for (let i = 0; i < tableHeaders.length; i++) {
        const currentHeader = tableHeaders[i];
        let testRowIndex = 0;
        let testData = tableData[testRowIndex][currentHeader];

        while (!testData && testData !== 0) {
          testRowIndex++;
          testData = tableData[testRowIndex][currentHeader];
        }

        vm.typeMap[currentHeader] = dataTypeHelper.identifyDataType(testData);
      }

      resolve(vm.typeMap);
    });
  };
}

ComponentController.$inject = ['rawRunnerService', 'pagerService', 'dataTypeHelper', '$scope'];

export default {
  template: require('./customTable.html'),
  controllerAs: '$ctrl',
  controller: ComponentController,
  bindings: {
    query: '=',
  },
};
