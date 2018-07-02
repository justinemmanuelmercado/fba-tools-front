import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/js/all';

import 'angular/angular-csp.css';
import './index.scss';
import { router } from './router';

/**
 * Import modules
 */
import mainModule from './main/main';

const myApp = angular.module('home', [
  uiRouter,
  mainModule,
]);

myApp.config(router);
