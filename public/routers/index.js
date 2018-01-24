app.config(['$stateProvider', '$urlRouterProvider', function($s, $url) {
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
            url: '/generate?{id}',
            params: {
                id:null
            },
            templateUrl: 'pages/generatelist.html',
            resolve: {
                loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['controller/generatelist.js', 'directives/isloading.js', 'directives/loadxc.js']); // 按需加载目标 js file
                }]
            }
        })
}])