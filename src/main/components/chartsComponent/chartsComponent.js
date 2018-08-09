import './chartsComponent.css';


ComponentController.$inject = ['$scope', 'rawRunnerService', 'chartHelper'];

function ComponentController($scope, rawRunnerService, chartHelper) {
  const vm = this;

  $scope.massage = 'Hello';
  vm.message = 'World';
  vm.tableName = 'sales';

  vm.dateLabels = [];

  vm.$onInit = function activate() { 
    vm.tableDataPromise = rawRunnerService.requestTable(vm.tableName)
    .then((data) => {
      console.log(data);
      vm._buildChart(data);
    });
  }

  vm._buildChart = (data) => {

    const [tableData, rawHeaderData] = data.data;

    var rawDateLabels = Array.from(tableData, data => data.purchaseDate);
    vm._getDateLabels(rawDateLabels);


    // Bar chart
    new Chart(document.getElementById("line-chart"), {
      type: 'line',
      data: {
        labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
        datasets: [{ 
            data: [86,114,106,106,107,111,133,221,783,2478],
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false
          }, { 
            data: [282,350,411,502,635,809,947,1402,3700,5267],
            label: "Asia",
            borderColor: "#8e5ea2",
            fill: false
          }, { 
            data: [168,170,178,190,203,276,408,547,675,734],
            label: "Europe",
            borderColor: "#3cba9f",
            fill: false
          }, { 
            data: [40,20,10,16,24,38,74,167,508,784],
            label: "Latin America",
            borderColor: "#e8c3b9",
            fill: false
          }, { 
            data: [6,3,2,2,7,26,82,172,312,433],
            label: "North America",
            borderColor: "#c45850",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'World population per region (in millions)'
        }
      }
    });
  }

  vm._getDateLabels = (tempDateLabels) => {
    // var tempDateLabels = new Set(tempDateLabels);
    console.log(tempDateLabels);
    chartHelper.getTimeScale(tempDateLabels);
    //console.log(vm.dateLabels);
    
  }

}

export default {
  template: require('./chartsComponent.html'),
  controllerAs: '$ctrl',
  controller: ComponentController,
};

