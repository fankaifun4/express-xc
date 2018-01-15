app.controller('generate', ['$scope', '$rootScope', '$http', '$state', function(s, rs, $http, state) {
    rs.$emit('getStateName', state.current.name)
    rs.loading.show = true

    $http.get('http://tp.taodama.net/mobile/photo/getusalbum?id=14').then(function(res) {
        rs.loading.text = '正在加载数据';
        if (res.data.code) {
            rs.loading.text = '加载数据成功';
            s.getData = res.data
            s.getData.data.forEach(function(item, index, arr) {
                var id = item.id
            })
        } else {
            rs.loading.text = '加载数据失败'
            rs.loading.show = false
            alert(res.data.data)
        }
    })

    //生成imge
    s.bgList = []
    s.computedText = function(data) {
        rs.loading.text = '正在计算图文比例';
        for (var i = 0; i < data.list.length; i++) {
            rs.loading.text = "正在绘画第" + i + "张"
            if (!data.list[i].pic || data.list[i].pic == '') return
        }
        let tempImg = new Image()
    }


    s.startGenerate = function() {
        var canvas = $('#canvas')[0];
        var context = canvas.getContext('2d')
        var data = s.getData.data
        rs.loading.show = true;
        rs.loading.text = '正在加载图片。。。';
        data.forEach(function(item, index, arr) {
            if (!item.bgImg || item.bgImg === '') return
            var tempImg = new Image()
            tempImg.src = item.bgImg
            tempImg.id = item.id
            rs.loading.text = '正在加载图片：' + item.bgImg;
            tempImg.onload = function() {
                var temp = {}
                temp.id = item.id
                temp.img = tempImg
                temp.width = tempImg.width
                temp.height = tempImg.height
                temp.src = tempImg.bgImg
                rs.loading.text = '图片: ' + item.bgImg + ' 加载完成';
                s.computedText(item)
                s.bgList.push(temp)
                rs.$apply()
            }
        })
    }

    //画图函数
    rs.drawImage = {
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