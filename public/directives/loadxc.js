app.directive('loadxc', function($timeout, $rootScope) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "directives/template/loadxc.html",
        link: function(scope, el, attr) {
            $rootScope.loading.show = true
            $rootScope.loading.text = '正在渲染'
            $timeout(function() {
                var width = el.find('.pic-bg').width()
                scope.item.textList.forEach(function(item, index, array) {
                    $rootScope.loading.text = '正在渲染数据相册'
                    item.style.relFontSize = width * item.style.relFontSize
                    $rootScope.loading.text = '正在渲染数据相册完成'
                    $rootScope.loading.show = false
                })
            })
        }
    }
})