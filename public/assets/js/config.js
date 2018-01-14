app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
 function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
     app.controller = $controllerProvider.register;
     app.directive = $compileProvider.directive;
     app.filter = $filterProvider.register;
     app.factory = $provide.factory;
     app.service = $provide.service;
     app.constant = $provide.constant;
}]);