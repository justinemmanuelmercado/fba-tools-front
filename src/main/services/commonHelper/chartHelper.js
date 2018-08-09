const moment = require('moment');

const service = function helperService(dataTypeHelper) {

    // const getTimeScale = (tempDateLabels) => {
    //     for ( var date of tempDateLabels) {
    //         //vm.dateLabels.push(dateLabel);
    //     }
    // }

    // return {
    //     getTimeScale
    // };

    const getTimeScale = (tempDateLabels) => {
        let {0: first, length: l, [l -1]: last} = tempDateLabels;
        console.log(first, last);
        //get first and last date then compare
        //get the difference then return the unit

        //hour, day, week, month, year
    }

    return {
        getTimeScale
    };
};

service.$inject = ['dataTypeHelper'];

module.exports = service;
