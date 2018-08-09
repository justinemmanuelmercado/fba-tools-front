function ComponentController(authenticationService, navigate, userService, $rootScope) {
    const vm = this;
    vm.currentUser = {};
    vm.showLogout = false;
    vm.userlogged = $rootScope.user;
    

    vm.$onInit = function activate() {
        vm.currentUser = userService.fac.GetCurrentUser();
        if (vm.currentUser) {
            vm.showLogout = vm.currentUser.loggedIn;
        }
    }

    vm.setView = () => {
        vm.onViewChange({$event: {view: view}})
    }

    vm.logout = () => {
        authenticationService.logout();
        vm.showLogout = false;
        navigate.toHome();
        
        //logout amazon account
        //amazon.Login.logout();
    }
}


ComponentController.$inject = ['authenticationService', 'navigationService', 'userService', '$rootScope'];

export default {
    template: require('./navigationBar.html'),
    controllerAs: '$ctrl',
    controller: ComponentController,
    bindings: {
        view : '<',
        onViewChange : '&'
    }
};
