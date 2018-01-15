app.config(['$stateProvider', '$urlRouterProvider',function($s, $url) {
    /*路由重定向 $urlRouterProvider:如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至 home.html,  
     *这个页面就是状态名称被声明的地方. */
    $url.otherwise('/setalbum');
    $s
    .state('setalbum', {
        url: '/setalbum',
        templateUrl: 'pages/setalbum.html',
        resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('controller/setalbum.js'); // 按需加载目标 js file
          }]
        }
    })
    .state('watchlist', {
        url: '/watchlist',
        templateUrl: 'pages/watchlist.html',
        resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('controller/watchlist.js'); // 按需加载目标 js file
          }]
        }
    })
    .state('generate', {
        url: '/generate',
        templateUrl: 'pages/generatelist.html',
        resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load(['controller/generatelist.js','directives/isloading.js']); // 按需加载目标 js file
          }]
        }
    })
}])