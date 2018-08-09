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
import chartsComponent from './components/chartsComponent/chartsComponent';
import privacyPolicy from './components/privacyPolicy/privacyPolicy';

/**
 * Import Services
 */
import rawRunnerService from './services/rawRunner';
import requestsHelper from './services/serviceHelper/requestsHelper';
import pagerService from './services/pagerService';
import dataTypeHelper from './services/commonHelper/dataTypeHelper';
import chartHelper from './services/commonHelper/chartHelper';
import constantsService from './services/constantsService';
//user service - single instance ng user status i.e. logged in ba sya accross components
import userService from './services/userService';
import authenticationService from './services/authenticationService';
import navigationService from './services/navigationService';
import merchantService from './services/merchantService';
import cookieHelper from './services/serviceHelper/cookieHelper';
import awsService from './services/awsService';

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
    .component('chartsComponent', chartsComponent)
    .component('privacyPolicy', privacyPolicy)
    /**
     * Inject Services
     */
    .factory('cookieHelper', cookieHelper)
    .factory('pagerService', pagerService)
    .factory('requestsHelper', requestsHelper)
    .factory('rawRunnerService', rawRunnerService)
    .factory('dataTypeHelper', dataTypeHelper)
    .factory('chartHelper', chartHelper)
    .factory('authenticationService', authenticationService)
    .factory('constantsService', constantsService)
    .factory('userService', userService)
    .factory('navigationService', navigationService)
    .factory('merchantService', merchantService)
    .factory('awsService', awsService);

export default mainModule.name;
