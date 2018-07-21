const service = function service() {
  const tableViewsAvailable = [
    {
      label: 'Today',
      viewName: 'sales_today',
      hash: 'today',
    },
    {
      label: 'Yesterday',
      viewName: 'sales_yesterday',
      hash: 'yesterday',
    },
    {
      label: 'Last 7 days',
      viewName: 'sales_last_7_days',
      hash: '7days',
    },
    {
      label: 'Week to date',
      viewName: 'sales_week_to_date',
      hash: 'week',
    },
    {
      label: 'Last 30 days',
      viewName: 'sales_last_30_days',
      hash: '30days',
    },
    {
      label: 'Month to date',
      viewName: 'sales_month_to_date',
      hash: 'month',
    },
    {
      label: 'Last 12 months',
      viewName: 'sales_last_12_months',
      hash: '12months',
    },
    {
      label: 'Year to date',
      viewName: 'sales_year_to_date',
      hash: 'year',
    },
  ];

  //const API_HOME = 'https://18.232.244.33:3443/api/';
  const API_HOME = 'http://localhost:3000/api/';
  //const API_HOME = 'https://localhost:3443/api/';

  return {
    tableViewsAvailable,
    API_HOME,
  };
};

service.$inject = [];

module.exports = service;
