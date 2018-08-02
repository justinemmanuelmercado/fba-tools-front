const router = ($stateProvider, $locationProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
    const states = [
        {
            name: 'merchants',
            url: 'merchants',
            template: '<merchants></merchants>',
            data: { auth : "LoggedUser" }
        },
        {
            name: 'profile',
            url: 'profile',
            template: '<profile></profile>',
            data: { auth : "LoggedUser" }
        },
        {
            name: 'table-demo',
            url: 'table-demo',
            template: '<table-demo></table-demo>',
            data: { auth : "" }
        },
        {
            name: 'login-component',
            url: 'login',
            template: '<login-component></login-component>',
            data: { auth : "" }
        },
        {
            name: 'sales',
            url: 'sales',
            template: '<sales></sales>',
            data: { auth : "LoggedUser" }
        },
        {
            name: 'privacy-policy',
            url: 'privacy-policy',
            template: '<privacy-policy></privacy-policy>',
            data: { auth : "" }
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
