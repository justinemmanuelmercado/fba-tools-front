import numeral from 'numeral';
import './tableDemo.css';

function ComponentController(rawRunnerService, pagerService, dataTypeHelper, $scope) {
  const vm = this;

  // Data
  vm.sqlQuery = 'SELECT * from sales_last_12_months';
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
  vm.currentView = 'Last 12 months';
  vm.tableDataPromise = {};
  vm.tableOptions = {
    sort: '',
  };

  // Constants
  vm.maxLengthCell = 100;
  /**
   * Avaialable views: Paassign nalang kasi hindi pa gumagana local db
   * sales, sales_last_12_months, sales_last_30_days, sales_last_7_days
   * sales_month_to_date, sales_today, sales_week_to_date, 
   * sales_year_to_date, sales_yesterday
   */
  vm.viewsAvailable = [
    {
      label: 'Today',
      viewName: 'sales_today',
    },
    {
      label: 'Yesterday',
      viewName: 'sales_yesterday',
    },
    {
      label: 'Last 7 days',
      viewName: 'sales_last_7_days',
    },
    {
      label: 'Week to date',
      viewName: 'sales_week_to_date',
    },
    {
      label: 'Last 30 days',
      viewName: 'sales_last_30_days',
    },
    {
      label: 'Month to date',
      viewName: 'sales_month_to_date',
    },
    {
      label: 'Last 12 months',
      viewName: 'sales_last_12_months',
    },
    {
      label: 'Year to date',
      viewName: 'sales_year_to_date',
    },
  ];


  //vm.setPage = setPage; // @todo temporarily removed

  vm.loadData = () => {
    /**
     * @todo Make way to pass array of data, to cache data
     * instead of always querying same query
     */
    vm.tableDataPromise = rawRunnerService.rawQuerySelect(vm.sqlQuery).then((data) => {
      /**
       * Set index 0 of data.data as const tableData
       * and index 1 of data.data as const rawHeaderData
       */

      const [tableData, rawHeaderData] = angular.copy(data.data);
      console.log(data.data);
      let tempTableData = tableData;

      /**
       * @todo create new table map for headers taken from query
       * and create new string headers that are property safe
       * create map object
       */
      vm.tableHeaders = rawHeaderData.map(value => value.name);
      vm.tableHeaders.forEach(header => {
        
        let newHeader = header.replace(/\W/g, '');
        if(newHeader !== header){  
          tempTableData.forEach((row, index) => {
            row[newHeader] = row[header];
            delete row[header];
          })
          vm.tableHeaders.push(newHeader);
          vm.tableHeaders.splice(vm.tableHeaders.indexOf(header), 1);
        }
      })
      
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

  // vm.sortColumn = (col) => {
  //   vm.column = col;
  //   if (vm.reverse) {
  //     vm.reverse = false;
  //     vm.reverseclass = 'arrow-up';
  //   } else {
  //     vm.reverse = true;
  //     vm.reverseclass = 'arrow-down';
  //   }
  // }

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

  vm.isViewActive = view => view.label === vm.currentView;

  vm.openView = (view) => {
    vm.currentView = view.label;
    vm.sqlQuery = `SELECT * FROM ${view.viewName}`;
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
  // vm.getSortStatus = (columnTitle, direction) => {
  //   console.log(columnTitle, vm.column);
  //   /**
  //    * Check if not sorted with current column
  //    */
  //   if(columnTitle !== vm.column){
  //     return direction === 'minus';
  //   }

  //   /**
  //    * Check if negative sorting
  //    */
  //   if (vm.reverse === true) {
  //     return direction === 'down';
  //   }
  //   /**
  //    * Check if positive sorting
  //    */
  //   if ( vm.reverse === false) {
  //     return direction === 'up';
  //   }
  // };
}

ComponentController.$inject = ['rawRunnerService', 'pagerService', 'dataTypeHelper', '$scope'];

export default {
  template: require('./tableDemo.html'),
  controllerAs: '$ctrl',
  controller: ComponentController,
};

