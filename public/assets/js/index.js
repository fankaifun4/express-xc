var app=angular.module('app',[])

app.controller('xcCtrl',['$scope','$http',function(s,$http){
	//储存类型数据
	s.tempData={
		//背景
		bgImg:"",
		//列表单个ID
		id:"img_list_0",
		//主视图比例
		cvsRatio:10/7,
		//文字数据
		textList:[],
		//相片元素数据
		//除了opcity,rotate为实数，其他都为百分比
		list:[{
			width:0,
			height:0,
			top:0,
			left:0,
			rotate:0,
			id:'222',
			opcity:1,
			pic:"",
			aspectRatio:1.777,
		}]
	}

	//当前加号集合
	s.itemList=[]

	//当前加号
	s.currentItem={}

	//增加新的元素+号
	s.addItems=function(){
		let box={}
		box.width=200
		box.height=200
		box.left=0
		box.top=0
		box.transform='rotate(0deg)'
		box.rotate=0
		box.aspectRatio=1
		box.opcity=1
		box.id=new Date().getTime().toString(36)
		box.aspectRatio=box.width/box.height
		s.itemList.push(box)
		for( var i=0;i<s.itemList.length;i++ ){
			if(s.itemList[i].id==box.id ){
				s.currentItem=s.itemList[i]
			}
		}
	}
	//背景图片默认大小
	s.canvasComputed={
		width:960,
		height:540,
	}

	//背景图片比例
	s.cvsRatio={
		rotate:(s.canvasComputed.width/s.canvasComputed.height).toFixed(3)
	}

	//改变背景图片大小
	s.changeSize=function(model,tpl,name){
		if( model.width<0 ){
			model.width=0
		}
		if( model.width>=960 ){
			model.width=960
		}
		if( model.height<0 ){
			model.height=0
		}
		if( model.height>2000 ){
			model.height=2000
		}
		if(name)
			tpl[name]=(model.width/model.height).toFixed(3)
	}

	//默认移动盒子

	s.tempPage={
		x:0,
		y:0
	};

	//是否移动开关
	s.isMove=false
	//获取移动model
	s.getItem=function(e,model){
		var cvsWrap=$('#cvs-wrap')
		var ct=cvsWrap.offset().top,cl=cvsWrap.offset().left
		var pageX=e.pageX-cl
		var pageY=e.pageY-ct
		let current=e.currentTarget
		s.tempPage.x=pageX-current.offsetLeft
		s.tempPage.y=pageY-current.offsetTop
		s.currentItem=model
		s.isMove=true
	}

	//移动model
	s.moveItem=function(e,model){
		if( !s.isMove ) return
		var cvsWrap=$('#cvs-wrap')
		var ct=cvsWrap.offset().top,cl=cvsWrap.offset().left
		var pageX=e.pageX-cl
		var pageY=e.pageY-ct
		var cvsWrap=$('#cvs-wrap')
		var cur=e.currentTarget
		var fanliyY=pageY-s.tempPage.y
		var fanliyX=pageX-s.tempPage.x
		model.left=fanliyX
		model.top=fanliyY
		// return;
		// if(  fanliyX>0 &&  pageX-s.tempPage.x<cvsWrap.outerWidth()-cur.clientWidth ){
		// 	model.left=fanliyX
		// }else if( cur.offsetLeft+cur.clientWidth >= cvsWrap.outerWidth() ){
		// 	model.left=cvsWrap.outerWidth()-cur.clientWidth
		// }else if(  fanliyX<=0 ){
		// 	model.left=0
		// }
		// if( fanliyY>0 && fanliyY< cvsWrap.outerHeight()-cur.clientHeight){
		// 	model.top=fanliyY
		// }else if( cur.offsetTop+cur.clientHeight >= cvsWrap.outerHeight() ){
		// 	model.top=cvsWrap.outerHeight()-cur.clientHeight
		// }else if( fanliyY<=0 ){
		// 	model.top=0
		// }
	}

	//关闭移动开关
	s.removeMoveItem=function(){
		s.isMove=false
	}

	s.changeRotate=function(name,value){
		if(!s.currentItem) return
		s.currentItem[name]+=value
		s.currentItem['transform']='rotate('+s.currentItem[name]+'deg)'
	}

	//modal数据

	s.getListItem=[]

	//缓存上传图片名字
	s.UPLOADNAME=''
	//loading
	s.isloading=false

	//上传背景图片
	s.uploadAdmin=function(){
		var file=$('#upload-background')[0].files
		if(file.length<1) return
		if( file.name==s.UPLOADNAME ) {
			alert('这张图片已上传')
			return;
		};

		let uploadFile=new FormData()
		uploadFile.append('file',file[0])
		uploadFile.append('ref','admin')
		uploadFile.append('title','相册1')
		s.isloading=true
		$.ajax({
		  url: "http://tp.taodama.net/mobile/photo/upload",
		  type: "POST",
		  data: uploadFile,
		  processData: false,  // 不处理数据
		  contentType: false   // 不设置内容类型
		}).done(function(res){
			s.isloading=false
			s.UPLOADNAME=file.name
			s.$apply()
		});
	}
	
	s.typeList=[]
	//获取类型列表
	s.getImgBgList=function(){
		s.isloading=true
		$http.get('http://tp.taodama.net/mobile/photo/typelist').then(function(res){
			s.isloading=false
			s.typeList=res.data
			$('#getImgList').modal()
		})		
	}

	s.listActive=null
	s.getListItem=function(model,index){
		console.log(model,index)
		s.listActive=index
	}
}])