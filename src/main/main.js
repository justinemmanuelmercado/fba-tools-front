import angular from 'angular';

/**
 * Import Components
 */
import rootComponent from './components/rootComponent/rootComponent';
import navigationBar from './components/navigationBar/navigationBar';
import footerBar from './components/footerBar/footerBar';
import profile from './components/profile/profile';
import merchants from './components/merchants/merchants';
import tableDemo from './components/tableDemo/tableDemo';
import loginComponent from './components/loginComponent/loginComponent';

/**
 * Import Services
 */
import rawRunnerService from './services/rawRunner';
import requestsHelper from './services/serviceHelper/requestsHelper';
import pagerService from './services/pagerService';
import dataTypeHelper from './services/commonHelper/dataTypeHelper';

const mainModule = angular.module('main', [])
    /**
     * Inject Components
     */
    .component('rootComponent', rootComponent)
    .component('navigationBar', navigationBar)
    .component('footerBar', footerBar)
    .component('profile', profile)
    .component('merchants', merchants)
    .component('tableDemo', tableDemo)
    .component('loginComponent', loginComponent)
    /**
     * Inject Services
     */
    .factory('pagerService', pagerService)
    .factory('requestsHelper', requestsHelper)
    .factory('rawRunnerService', rawRunnerService)
    .factory('dataTypeHelper', dataTypeHelper);

export default mainModule.name;
