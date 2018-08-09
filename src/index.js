import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngCookies from 'angular-cookies';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/js/all';
import 'chart.js/dist/Chart.min.js';

import 'angular/angular-csp.css';
import './index.scss';
import { router } from './router';

/**
 * Import modules
 */
import mainModule from './main/main';

const myApp = angular.module('home', [
  ngCookies,
  uiRouter,
  mainModule,
]);

myApp.config(router);

// myApp.run(['userService', function(userService, $rootScope) {
//   var user = userService.GetCurrentUser();
//   $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
//     /**
//      * @todo more validation for logged in user if valid yung token nyaaaa
//      */
//     if ( toState.data.auth === 'LoggedUser' && user === "") {
//         event.preventDefault();
//         return false;
//     }
//   })
// }]);

// myApp.run(['$state', '$rootScope', function($state, $rootScope) {
//     //var user = userService.GetCurrentUser();
//     $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
//       /**
//        * @todo more validation for logged in user if valid yung token nya
//        * @todo kung LoggedUser yung auth ng pupuntahan nyang state and yung user is loggedIn
//        */
//       console.log('state change start');
//       if ( toState.data.auth === 'LoggedUser') {
//         $state.go('sales');
//           // event.preventDefault();
//           // return false;
//       }
//     })
//   }]);

