const service = function service($rootScope) {

    var fac = {};
    fac.CurrentUser = null;
    fac.SetCurrentUser = function (user_data) {
        var user = {};
        if (user_data) {
            user = {
                loggedIn : true,
                email    : user_data.email
            }
        }

        fac.CurrentUser = user;
        //store to session user email and info that user is logged on
        //sessionStorage.setItem("logged_user",angular.toJson(user));
        sessionStorage.user = angular.toJson(user);
        $rootScope.user = user;
    }
    fac.GetCurrentUser = function () {
        // if (sessionStorage.getItem("logged_user") != undefined) {
        if (sessionStorage.user != undefined) {
            fac.CurrentUser = angular.fromJson(sessionStorage.user);
        }
        return fac.CurrentUser;
    }

    fac.RemoveCurrentUser = function () {
        fac.CurrentUser = null;
        fac.SetCurrentUser(fac.CurrentUser);
        delete sessionStorage.user;
    }

    return {
        fac
    };
};

service.$inject = ['$rootScope'];

module.exports = service;
