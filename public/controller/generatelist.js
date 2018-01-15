app.controller('generate', ['$scope', '$rootScope','$http','$state', function(s,rs, $http,state) {
	rs.$emit('getStateName',state.current.name)
	s.getData={
	  "code": 1,
	  "data": [
	    {
	      "id": "160f79cef85",
	      "list": [
	        {
	          "width": "56.67",
	          "height": "24.39",
	          "left": "35.83",
	          "top": "10.73",
	          "transform": "rotate(0deg)",
	          "rotate": 0,
	          "aspectRatio": "1.700",
	          "opcity": 1,
	          "id": "jcfkxbjf",
	          "border": "none",
	          "pic": "http:\/\/tp.taodama.net\/public\/upload\/\/goods\/2018\/01-15\/5a5c3c3c357ed.png"
	        },
	        {
	          "width": "45.00",
	          "height": "25.61",
	          "left": "7.50",
	          "top": "39.76",
	          "transform": "rotate(0deg)",
	          "rotate": 0,
	          "aspectRatio": "1.286",
	          "opcity": 1,
	          "id": "jcfkxkpv",
	          "border": "none",
	          "pic": "http:\/\/tp.taodama.net\/public\/upload\/\/goods\/2018\/01-15\/5a5c3c515bc55.png"
	        },
	        {
	          "width": "40.00",
	          "height": "25.61",
	          "left": "54.00",
	          "top": "38.78",
	          "transform": "rotate(0deg)",
	          "rotate": 0,
	          "aspectRatio": "1.143",
	          "opcity": 1,
	          "id": "jcfkyjuz",
	          "border": "3px dashed #f00",
	          "pic": "http:\/\/tp.taodama.net\/public\/upload\/\/goods\/2018\/01-15\/5a5c3c5ebd156.png"
	        }
	      ],
	      "bgImg": "http:\/\/tp.taodama.net\/public\/upload\/\/goods\/2018\/01-13\/657a6a3e0ca30b2bbda0bcf03eda7161.png",
	      "cvsRatio": "0.732",
	      "textList": [
	        {
	          "style": {
	            "left": "7px",
	            "top": "60px",
	            "color": "#000000",
	            "fontSize": 24,
	            "fontWeight": 300
	          },
	          "text": "\u8bf7\u8428\u8fbe\u79d1\u6280\u8428\u8fbe\u79d1\u6280as\u6050\u9f99\u5f53\u5bb6",
	          "isDrap": false
	        },
	        {
	          "style": {
	            "left": "21px",
	            "top": "161px",
	            "color": "#660000",
	            "fontSize": 19,
	            "fontWeight": 700
	          },
	          "text": "\u8428\u8fbe\u901f\u5ea6\u5feb\u6377\u6309\u9053\u7406\u780d\u6b7b\u7684",
	          "isDrap": false
	        }
	      ]
	    },
	    {
	      "id": "160f79e4f0b",
	      "list": [
	        {
	          "width": "36.67",
	          "height": "18.29",
	          "left": "5.00",
	          "top": "2.32",
	          "transform": "rotate(-2deg)",
	          "rotate": -2,
	          "aspectRatio": "1.467",
	          "opcity": 1,
	          "id": "jcfkxbjf",
	          "border": "none",
	          "pic": "http:\/\/tp.taodama.net\/public\/upload\/\/goods\/2018\/01-15\/5a5c3c3c357ed.png"
	        },
	        {
	          "width": "58.33",
	          "height": "40.85",
	          "left": "25.00",
	          "top": "26.59",
	          "transform": "rotate(0deg)",
	          "rotate": 0,
	          "aspectRatio": "1.045",
	          "opcity": 1,
	          "id": "jcfkxkpv",
	          "border": "3px dashed #f00",
	          "pic": "http:\/\/tp.taodama.net\/public\/upload\/\/goods\/2018\/01-15\/5a5c3c5ebd156.png"
	        },
	        {
	          "width": "36.67",
	          "height": "19.51",
	          "left": "47.50",
	          "top": "2.07",
	          "transform": "rotate(-2deg)",
	          "rotate": -2,
	          "aspectRatio": "1.375",
	          "opcity": 1,
	          "id": "jcfl0d8z",
	          "border": "none",
	          "pic": "http:\/\/tp.taodama.net\/public\/upload\/\/goods\/2018\/01-15\/5a5c3c515bc55.png"
	        }
	      ],
	      "bgImg": "http:\/\/tp.taodama.net\/public\/upload\/\/goods\/2018\/01-13\/b571c716b816fb35d1eecb1a4b610ea5.png",
	      "cvsRatio": "0.732",
	      "textList": [
	        {
	          "style": {
	            "left": "16px",
	            "top": "41px",
	            "color": "#330000",
	            "fontSize": 25,
	            "fontWeight": 700
	          },
	          "text": "\u8428\u79d1\u6280\u963f\u8428\u5fb7\u62c9\u770b\u4f3c\u7b80\u5355",
	          "isDrap": false
	        },
	        {
	          "style": {
	            "left": "17px",
	            "top": "117px",
	            "color": "#cc0000",
	            "fontSize": 24,
	            "fontWeight": 700
	          },
	          "text": "asldmasdm\u6253",
	          "isDrap": false
	        }
	      ]
	    }
	  ]
	}

	//生成imge
	s.bgList=[]
	s.computedText=function(data){
		rs.loading.text='正在计算图文比例';
		for(var i=0;i<data.list.length;i++){
			if( !data.list[i].pic || data.list[i].pic=='' ) return

		}
		let tempImg=new Image()

	}
	
	
	s.startGenerate=function(){
		 var canvas=$('#canvas')[0];
		 var context=canvas.getContext('2d')
		 var data=s.getData.data
		 rs.loading.show=true;
		 rs.loading.text='正在加载图片。。。';
		 data.forEach(function(item,index,arr){
		 	if(!item.bgImg || item.bgImg==='' ) return
		 	 var tempImg=new Image()
		 	 tempImg.src=item.bgImg
		 	 tempImg.id=item.id
		 	 rs.loading.text='正在加载图片：'+item.bgImg;
		 	 tempImg.onload=function(){
				var temp={}
				temp.id=item.id
				temp.img=tempImg
				temp.width=tempImg.width
				temp.height=tempImg.height
				temp.src=tempImg.bgImg
				rs.loading.text='图片: '+item.bgImg+' 加载完成';
				s.computedText(item)
				s.bgList.push( temp )
				rs.$apply()
		 	 }
		 })
		
	}
	s.cache=function(){

	}

	//画图函数
 	var drawImage=	{
	    avadItem: [],
	    tempImg: [],
	    listImg: [],
	    textList: [],
	    cvs: null,
	    ctx: null,
	    bckground: null,
	    init(cvs, imglist, bg, data) {
	        //存入数据
	        //初始化需要画的图片元素列表
	        this.avadItem = []
	        this.tempImg = []
	        this.listImg = []
	        this.textList = []
	        this.cvs = cvs
	        this.bckground = bg
	        this.textList = data.textList
	        this.ctx = this.cvs.getContext('2d')
	        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
	        let cvsHeight = cvs.height
	        let cvsWidth = cvs.width
	        let templObj = {}
	        data.list.forEach(item => {
	                templObj = {}
	                for (let key in item) {
	                    templObj['width'] = cvsWidth * item.width / 100
	                    templObj['height'] = cvsHeight * item.height / 100
	                    templObj['top'] = cvsHeight * item.top / 100
	                    templObj['left'] = cvsWidth * item.left / 100
	                    templObj['rotate'] = Math.PI / 180 * item.rotate
	                    templObj['id'] = item.id
	                    templObj['opcity'] = item.opcity
	                    templObj['aspectRatio'] = item.aspectRatio
	                    templObj['pic'] = item.pic
	                    templObj['itemBlob'] = item.itemBlob
	                    if (!imglist) return
	                    for (let i = 0; i < imglist.length; i++) {
	                        if (templObj.id == imglist[i].id) {
	                            templObj['img'] = imglist[i]
	                        }
	                    }
	                }
	                this.listImg.push(templObj)
	            })
	            //开始画图
	        this.initDraw()
	    },
	    //画元素
	    drawAVAD(item) {
	        this.ctx.beginPath()
	        this.ctx.save()
	        this.ctx.translate(0, 0)
	        let addL = item.left + item.width / 2
	        let addT = item.top + item.height / 2
	        let rx = -addL + item.left
	        let ry = -addT + item.top
	        this.ctx.translate(addL, addT)
	        this.ctx.rotate(item.rotate)
	        this.ctx.drawImage(item.img, rx, ry, item.width, item.height)
	        this.ctx.restore();
	    },
	    //背景
	    drawBG() {
	        this.ctx.beginPath()
	        this.ctx.translate(0, 0)
	        this.ctx.drawImage(this.bckground, 0, 0, this.cvs.width, this.cvs.height)
	        return this;
	    },
	    //文字
	    drawText(item) {
	        this.ctx.beginPath()
	        this.ctx.save()
	        this.ctx.translate(0, 0)
	        this.ctx.textBaseline = 'hanging'
	        this.ctx.fillStyle = item.style.color
	        this.ctx.font = item.style.fontWeight + ' ' + item.style.fontSize + 'px' + ' ' + '微软雅黑'
	        let x = item.style.left.replace(/px/, '')
	        let y = item.style.top.replace(/px/, '')
	        this.ctx.fillText(item.text, x, y)
	        this.ctx.restore();
	        return this;
	    },
	    //开始画图
	    initDraw() {
	        let empty = []

	        function fileOrBlobToDataURL(obj, cb) {
	            var a = new FileReader();
	            a.readAsDataURL(obj);
	            a.onload = function(e) {
	                cb(e.target.result);
	            };
	        }

	        this.listImg.forEach(item => {
	            if (!item.img) return
	            if (item.img.src.match(/.jpg|.png|.jpeg/)) {
	                empty.push(item)
	            }
	        })
	        this.avadItem = empty
	        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
	        this.avadItem.forEach(item => {
	            this.drawAVAD(item)
	        })
	        this.drawBG()
	        this.textList.forEach(item => {
	            this.drawText(item)
	        })
	        return this;
	    }
	}
}])