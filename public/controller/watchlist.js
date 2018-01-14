app.controller('watchlist',['$scope','$rootScope','$http','$location','$state','$stateParams',
	 function(s,rs,$http,location,state,params){
		rs.$emit('getStateName',state.current.name)
		s.listTitle=[]
		$http.get(rs.baseUrl+'/typelist').then(function(res){
			if(res.status===200){
				s.listTitle=res.data
			}
		})
		s.getItem=function(index){
			s.choise=index
		}

		s.getModel=[
			{
				
			}
		]

		$http.get(rs.baseUrl+'/getusalbum?id='+1).then(function(res){
			if(res.status===200){
				console.log(res)
			}
		})

}])


