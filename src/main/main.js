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

/**
 * Import Services
 */
import rawRunnerService from './services/rawRunner';
import requestsHelper from './services/serviceHelper/requestsHelper';

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
    /**
     * Inject Services
     */
    .factory('requestsHelper', requestsHelper)
    .factory('rawRunnerService', rawRunnerService);

export default mainModule.name;
