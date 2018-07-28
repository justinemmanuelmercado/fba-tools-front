import angular from 'angular';

/**
 * Import Components
 */
import rootComponent from './components/rootComponent/rootComponent';
import navigationBar from './components/navigationBar/navigationBar';
import footerBar from './components/footerBar/footerBar';
import tableDemo from './components/tableDemo/tableDemo';
import loginComponent from './components/loginComponent/loginComponent';
import sales from './components/sales/sales';
import privacyPolicy from './components/privacyPolicy/privacyPolicy';

/**
 * Import Services
 */
import rawRunnerService from './services/rawRunner';
import requestsHelper from './services/serviceHelper/requestsHelper';
import pagerService from './services/pagerService';
import dataTypeHelper from './services/commonHelper/dataTypeHelper';
import constantsService from './services/constantsService';
import authenticationService from './services/authenticationService';
import navigationService from './services/navigationService';
import merchantService from './services/merchantService';
import cookieHelper from './services/serviceHelper/cookieHelper';

const mainModule = angular.module('main', [])
    /**
     * Inject Components
     */
    .component('rootComponent', rootComponent)
    .component('navigationBar', navigationBar)
    .component('footerBar', footerBar)
    .component('tableDemo', tableDemo)
    .component('loginComponent', loginComponent)
    .component('sales', sales)
    .component('privacyPolicy', privacyPolicy)
    /**
     * Inject Services
     */
    .factory('cookieHelper', cookieHelper)
    .factory('pagerService', pagerService)
    .factory('requestsHelper', requestsHelper)
    .factory('rawRunnerService', rawRunnerService)
    .factory('dataTypeHelper', dataTypeHelper)
    .factory('authenticationService', authenticationService)
    .factory('constantsService', constantsService)
    .factory('navigationService', navigationService)
    .factory('merchantService', merchantService);

export default mainModule.name;
