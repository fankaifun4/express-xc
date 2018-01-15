app.controller('mainController', ['$scope','$rootScope','$http','$location','$state','$stateParams',
	 function(s,rs,$http,location,state,params){
	 	rs.loading={
	 		show:false,
	 		text:""
	 	}
		rs.$on('getStateName',function(event,value){
			s.navchoise=value
		})
		rs.baseUrl="http://tp.taodama.net/mobile/photo"

		s.goSetAlbum=function(){
			state.go('setalbum')
		}
		s.goWatchList=function(){
			state.go('watchlist')
		}
		s.goGenera=function(){
			state.go('generate')
		}
}])