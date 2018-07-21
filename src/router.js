const router = ($stateProvider, $locationProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
    const states = [
        {
            name: 'merchants',
            url: 'merchants',
            template: '<merchants></merchants>',
        },
        {
            name: 'profile',
            url: 'profile',
            template: '<profile></profile>',
        },
        {
            name: 'table-demo',
            url: 'table-demo',
            template: '<table-demo></table-demo>',
        },
        {
            name: 'login-component',
            url: 'login',
            template: '<login-component></login-component>'
        },
        {
            name: 'sales',
            url: 'sales',
            template: '<sales></sales>',
        },
        {
            name: 'privacy-policy',
            url: 'privacy-policy',
            template: '<privacy-policy></privacy-policy>'
        }
    ];

    $locationProvider.hashPrefix('');

    const rootState = {
        name: 'root',
        url: '/',
        template: '<root-component></root-component>',
    };


    $stateProvider.state(rootState);
    states.forEach((state) => {
        state.name = `root.${state.name}`;
        $stateProvider.state(state);
    });
};

router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

module.exports = {
    router,
};
