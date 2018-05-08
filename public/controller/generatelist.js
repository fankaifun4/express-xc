app.controller('generate', ['$scope', '$rootScope', '$http', '$state', '$timeout', function(s, rs, $http, state, $timeout) {
    // rs.$emit('getStateName', state.current.name)
    rs.loading.show = true

    //相册接口ID
    s.ID = state.params.id

    $http.get(rs.baseUrl + '/getusalbum?id=' + s.ID).then(function(res) {
        rs.loading.text = '正在加载数据';
        if (res.data.code) {
            rs.loading.text = '加载数据成功';
            s.getData = res.data
            rs.loading.text = '加载数据失败'
            rs.loading.show = false
            s.getData.data.forEach(function(item, index, arr) {
                var id = item.id
            })
        } else {
            rs.loading.text = '加载数据失败'
            rs.loading.show = false
            alert(res.data.msg)
        }
    })
    s.templateImgaeArray = []
    s.getIsImg = function(e) {
        if (e.target.tagName == 'IMG') {
            var cur = e.target
            var src = cur.src
                // if (s.templateImgaeArray.indexOf(src) >= 0) {
                //     cur.style.border = "5px solid #096"
                //     s.templateImgaeArray.forEach(function(item, index) {
                //         if (item == src) {
                //             s.templateImgaeArray.splice(index, 1)
                //         }
                //     })
                // } else {
                //     s.templateImgaeArray.push(src)
                //     cur.style.border = "5px solid #900"
                // }
        }
    }
    s.isDownload = ""
    s.getImageList = function() {
            if (s.templateImgaeArray.length < 1) {
                alert("还没有选择一张图片进行打包！")
                return
            } else {
                rs.loading.text = '';
                rs.loading.show = true
                var imgList = s.templateImgaeArray.join('|')
                $http({
                    method: 'get',
                    url: rs.baseUrl + '/tarfile?getFiles=' + imgList
                }).then(function(res) {
                    rs.loading.show = false
                    if (res.data.code == 1) {
                        s.isDownload = "/" + res.data.file
                    } else {
                        alert('打包失败')
                    }

                })
            }
        }
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
    var imgIndex = 0
    s.startGenerate = function() {
        rs.loading.show = true
        rs.loading.text = '正在生产图片'
        if (!s.getData || s.getData.data.length < 1) {
            alert('没有数据可以生产')
            rs.loading.show = false
            return
        }
        var canvas = $('#canvas')[0];
        var context = canvas.getContext('2d')
        var data = s.getData.data
        var picWrap = $('#pic-wrap')
        var eachPic = picWrap.find('[data-id]')
        var DomIndex = 0

        s.DRAWIMGLIST = function(index) {
            if (index < eachPic.length) {
                var imgIem = eachPic.eq(index)
                rs.loading.text = '正在生产图片第：' + (index + 1) + "张"
                var id = imgIem.attr('data-id')
                var drawData = null;
                data.forEach(function(item) {
                    if (item.id === id) {
                        drawData = item
                        return;
                    }
                })
                var bgImg = imgIem.find('.bg-img')[0]
                var avartList = []
                var drawImg = imgIem.find('.imgs-pic')
                drawImg.each(function(index) {
                    avartList.push(this)
                })
                var width = bgImg.naturalWidth * 2
                var height = bgImg.naturalHeight * 2
                canvas.width = width
                canvas.height = height
                rs.drawImage.init(canvas, avartList, bgImg, drawData)
                canvas.toBlob(function(blob) {
                    var url = URL.createObjectURL(blob);
                    s.uploadFile(blob, index)
                })
            } else {
                rs.loading.text = '生产完成'
                rs.loading.show = false
            }
        }
        s.DRAWIMGLIST(DomIndex)
        s.uploadFile = function(blob, index) {
            rs.loading.text = '正在上传' + (index + 1) + "张"
            var format = new FormData()
            format.append('file', blob)

            $http({
                method: 'POST',
                url: rs.baseUrl + '/upload2turn',
                headers: {
                    'Content-Type': undefined
                },
                data: format,
            }).then(function(res) {
                var resData = res.data
                if (resData.code == 1) {
                    rs.loading.text = '上传' + (index + 1) + "张完成"
                    index += 1
                    let drawedImg = new Image()
                    drawedImg.src = "/" + resData.img
                    s.templateImgaeArray.push(resData.img)
                    $('.draw-img-list').append(drawedImg)
                    $timeout(function() {
                        s.DRAWIMGLIST(index)
                    }, 1000)
                }
            })
        }

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
                if (item.img.src.match(/.jpg|.png|.jpeg|.jgeg/)) {
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