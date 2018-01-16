app.controller('generate', ['$scope', '$rootScope', '$http', '$state', function(s, rs, $http, state) {
    rs.$emit('getStateName', state.current.name)
    rs.loading.show = true

    $http.get('http://tp.taodama.net/mobile/photo/getusalbum?id=2').then(function(res) {
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
            alert(res.data.msg)
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

    s.drawImageList = []

    s.startGenerate = function() {

        if (!s.getData || s.getData.data.length < 1) {
            alert('没有数据可以生产')
            return
        }
        rs.loading.show = true
        rs.loading.text = '正在生产图片'
        var canvas = $('#canvas')[0];
        var context = canvas.getContext('2d')
        var data = s.getData.data
        var picWrap = $('#pic-wrap')
        var eachPic = picWrap.find('[data-id]')
        eachPic.each(function(index) {
            rs.loading.text = '正在生产图片ID：' + $(this).attr('[data-id]')
            var id = $(this).attr('data-id')
            var drawData = null;
            data.forEach(function(item) {
                if (item.id === id) {
                    drawData = item
                    return;
                }
            })
            var bgImg = $(this).find('.bg-img')[0]
            var avartList = []
            var drawImg = $(this).find('.imgs-pic')
            drawImg.each(function(index) {
                avartList.push($(this)[0])
            })
            var width = bgImg.naturalWidth
            var height = bgImg.naturalHeight
            canvas.width = width
            canvas.height = height
            rs.drawImage.init(canvas, avartList, bgImg, drawData)
            let url = canvas.toDataURL()
            let drawedImg = new Image()
            drawedImg.src = url
            s.drawImageList.push(1)
            $('.draw-img-list').append(drawedImg)
            if (s.drawImageList.length == eachPic.length) {
                rs.loading.text = '生产完成'
                rs.loading.show = false
            }
        })


        // rs.loading.show = true;
        // rs.loading.text = '正在加载图片。。。';

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
            console.log((this.cvs.width * 0.06))
            this.ctx.beginPath()
            this.ctx.save()
            this.ctx.translate(0, 0)
            this.ctx.textBaseline = 'hanging'
            this.ctx.fillStyle = item.style.color
            this.ctx.font = item.style.fontWeight + ' ' + (item.style.relFontSize * this.cvs.width) + 'px' + ' ' + '微软雅黑'
            let x = parseInt(item.style.left.replace('%', '') * this.cvs.width / 100)
            let y = parseInt(item.style.top.replace('%', '') * this.cvs.height / 100)
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