app.controller('watchlist',['$scope','$rootScope','$http','$location','$state','$stateParams',
	 function(s,rs,$http,location,state,params){
		// rs.$emit('getStateName',state.current.name)
		s.listTitle=[]
		$http.get(rs.baseUrl+'/typelist').then(function(res){
			if(res.status===200){
				s.listTitle=res.data
			}
		})
		s.getItem=function(index,item){
			s.choise=index
			s.theme=item.theme
			$http.get(rs.baseUrl+'/photolist?theme='+s.theme).then(function(res){
				if(res.status===200){
					console.log(res)
				}
			})
		}
		s.getModel=[
			{
				
			}
		]
		// http://tp.taodama.net/mobile/photo/getalbum
		

}])


