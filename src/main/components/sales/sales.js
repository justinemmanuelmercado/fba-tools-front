import numeral from 'numeral';
import './sales.css';

ComponentController.$inject = ['rawRunnerService', 'pagerService', 'dataTypeHelper', '$scope', 'constantsService'];

function ComponentController(rawRunnerService, pagerService, dataTypeHelper, $scope, constantsService) {
  const vm = this;

  // Data
  vm.tableData = [];
  vm.tableHeaders = [];
  vm.tableHeadersLabel = {};
  vm.tableHeaderFilters = {};
  vm.objectFilter = {};
  vm.activeTables = {};
  vm.headerAllOption = {};
  vm.typeMap = {};
  vm.reverse = false;
  vm.column = '';
  vm.pager = {};
  vm.items = [];
  vm.currentView = 'Last 12 months';
  vm.viewName = 'sales_last_12_months';
  vm.tableDataPromise = {};
  vm.tableOptions = {
    sort: '',
  };

  vm.authToken = '';

  // Constants
  vm.maxLengthCell = 100;
  vm.viewsAvailable = constantsService.tableViewsAvailable;

  //vm.setPage = setPage; // @todo temporarily removed

  vm.$onInit = function activate() {
    vm.loadData();
  };

  vm.loadData = () => {
    /**
     * @todo Make way to pass array of data, to cache data
     * instead of always querying same query
     */
    vm.tableDataPromise = rawRunnerService.requestView(vm.viewName).then((data) => {
      /**
       * Set index 0 of data.data as const tableData
       * and index 1 of data.data as const rawHeaderData
       */
      const [tableData, rawHeaderData] = data.data;
      const tempTableData = tableData;

      vm.resetData();

      /**
       * @todo create new table map for headers taken from query
       * and create new string headers that are property safe
       * create map object
       */
      const tempHeaderData = rawHeaderData.map(value => value.name);
      tempHeaderData.forEach((header) => {
        const newHeader = header.replace(/\W/g, '');
        if (newHeader !== header) {
          tempTableData.forEach((row) => {
            row[newHeader] = row[header];
            delete row[header];
          });
        }
        vm.tableHeaders.push(newHeader);
        vm.tableHeadersLabel[newHeader] = header;
      });
      /**
       * Set current page to 1
       */
      vm.setPage(1);

      /**
       *  Set default data
       */
      vm.createBlankActivesObject(vm.tableHeaders);

      /**
       * @todo improve implementation, use promises to chain data building
       * properly
       */
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
        } else {
          vm.tableData = tempTableData;
        }
        //console.log(vm.typeMap);
        vm.createSelectData(vm.tableData, vm.tableHeaders);
        vm.createDefaultObjectFilter(vm.tableHeaders);
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

  /**
   * For flagging active filters
   * @param {*} tableHeaders 
   */
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
    const positiveColumn = col;
    const negativeColumn = `-${col}`;
    /**
     * Check if negative sorting
     */
    if (vm.tableOptions.sort === negativeColumn) {
      vm.tableOptions.sort = '';
      return;
    }
    /**
     * Check if positive sorting
     */
    if (vm.tableOptions.sort === positiveColumn) {
      vm.tableOptions.sort = negativeColumn;
      return;
    }

    /**
     * Check if not sorted with current column
     */
    vm.tableOptions.sort = positiveColumn;
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

  vm.multipleSelectFilter = (item) => {
    for (let i = 0; i < vm.tableHeaders.length; i++) {
      const currentHeader = vm.tableHeaders[i];
      const itemValue = item[currentHeader];
      const filterValueArray = vm.objectFilter[currentHeader];
      if (!filterValueArray.includes(itemValue)) {
        return false;
      }
    }
    return true;
  };

  vm.createTypeMapper = (tableData, tableHeaders) => {
    return new Promise((resolve) => {
      for (let i = 0; i < tableHeaders.length; i++) {
        const currentHeader = tableHeaders[i];
        let testRowIndex = 0;
        //console.log(tableData);
        let testData = tableData[testRowIndex][currentHeader];

        //added tableData.length to avoid exceeding
        while (!testData && testData !== 0 && testRowIndex < tableData.length) {
          testData = tableData[testRowIndex][currentHeader];
          testRowIndex++; //moved increment after assigning testData
        }

        vm.typeMap[currentHeader] = dataTypeHelper.identifyDataType(testData);
      }

      resolve(vm.typeMap);
    });
  };

  vm.isViewActive = view => view.label === vm.currentView;

  vm.openView = (view) => {
    vm.currentView = view.label;
    vm.sqlView = view.viewName;
    vm.loadData();
  };

  vm.getSortStatus = (columnTitle, direction) => {
    const positiveColumn = columnTitle;
    const negativeColumn = `-${columnTitle}`;

    /**
     * Check if negative sorting
     */
    if (vm.tableOptions.sort === negativeColumn) {
      return direction === 'down';
    }
    /**
     * Check if positive sorting
     */
    if (vm.tableOptions.sort === positiveColumn) {
      return direction === 'up';
    }

    /**
     * Check if not sorted with current column
     */
    return direction === 'minus';
  };

  vm.resetData = () => {
    vm.tableData = [];
    vm.tableHeaders = [];
    vm.tableHeadersLabel = {};
    vm.tableHeaderFilters = {};
    vm.objectFilter = {};
    vm.activeTables = {};
    vm.headerAllOption = {};
    vm.typeMap = {};
    vm.reverse = false;
    vm.column = '';
    vm.pager = {};
    vm.items = [];
    vm.tableOptions = {
      sort: '',
    };
  };
}

export default {
  template: require('./sales.html'),
  controllerAs: '$ctrl',
  controller: ComponentController,
};
