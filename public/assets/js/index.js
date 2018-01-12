var app = angular.module('app', [])

app.controller('xcCtrl', ['$scope', '$http', function(s, $http) {
    s.uploadBaseUrl = "http://tp.taodama.net/mobile/photo/"
    s.baseUrl = 'http://tp.taodama.net/'
        //储存类型数据
    s.tempData = {
        //背景
        bgImg: "",
        //列表单个ID
        id: "img_list_0",
        //主视图比例
        cvsRatio: 10 / 7,
        //文字数据
        textList: [],
        //相片元素数据
        //除了opcity,rotate为实数，其他都为百分比
        list: [{
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            rotate: 0,
            id: '222',
            opcity: 1,
            pic: "",
            aspectRatio: 1.777,
        }]
    }

    //当前加号集合
    s.itemList = []

    //当前加号
    s.currentItem = {}

    //增加新的元素+号
    s.addItems = function() {
        let box = {}
        box.width = 200
        box.height = 200
        box.left = 0
        box.top = 0
        box.transform = 'rotate(0deg)'
        box.rotate = 0
        box.aspectRatio = 1
        box.opcity = 1
        box.id = new Date().getTime().toString(36)
        box.aspectRatio = box.width / box.height
        s.itemList.push(box)
        for (var i = 0; i < s.itemList.length; i++) {
            if (s.itemList[i].id == box.id) {
                s.currentItem = s.itemList[i]
                s.currentItem.border = "3px dashed #f00"
            } else {
                s.itemList[i].border = "none"
            }
        }

    }

    //deleteItems
    //删除元素
    s.deleteItems = function() {
        if (s.itemList.length < 1) return
        if (!s.currentItem.id) return
        var index = null;
        for (var i = 0; i < s.itemList.length; i++) {
            if (s.currentItem.id === s.itemList[i].id) {
                index = i;
            }
        }
        s.itemList.splice(index, 1)
    }


    //背景图片默认大小
    s.canvasComputed = {
        width: 960,
        height: 540,
    }

    //背景图片比例
    s.cvsRatio = {
        rotate: (s.canvasComputed.width / s.canvasComputed.height).toFixed(3)
    }

    //改变背景图片大小
    s.changeSize = function(model, tpl, name) {

        if (parseInt(model.width) < 1) {
            model.width = 100
        }
        if (parseInt(model.width) >= 960) {
            model.width = 960
        }
        if (parseInt(model.height) < 0) {
            model.height = 0
        }
        if (parseInt(model.height) > 2000) {
            model.height = 2000
        }
        if (name)
            tpl[name] = (parseInt(model.width) / parseInt(model.height)).toFixed(3)
    }
    s.resetBack = function() {
        // s.canvasComputed

        var temImg = new Image()
        temImg.src = s.backgroundImg
        if (temImg.complete) {
            s.canvasComputed.width = temImg.width
            s.canvasComputed.height = temImg.height
            return;
        }
        temImg.onload = function() {
            s.canvasComputed.width = temImg.width
            s.canvasComputed.height = temImg.height
            s.$apply()
        }
    }

    //默认移动盒子

    s.tempPage = {
        x: 0,
        y: 0
    };

    //是否移动开关
    s.isMove = false
        //获取移动model
    s.getItem = function(e, model) {
        var cvsWrap = $('#cvs-wrap')
        var ct = cvsWrap.offset().top,
            cl = cvsWrap.offset().left
        var pageX = e.pageX - cl
        var pageY = e.pageY - ct
        let current = e.currentTarget
        s.tempPage.x = pageX - current.offsetLeft
        s.tempPage.y = pageY - current.offsetTop
        for (var i = 0; i < s.itemList.length; i++) {
            if (s.itemList[i].id == model.id) {
                s.currentItem = model
                s.currentItem.border = "3px dashed #f00"
            } else {
                s.itemList[i].border = "none"
            }
        }
        s.isMove = true
    }

    //移动model
    s.moveItem = function(e, model) {
        if (!s.isMove) return
        var cvsWrap = $('#cvs-wrap')
        var ct = cvsWrap.offset().top,
            cl = cvsWrap.offset().left
        var pageX = e.pageX - cl
        var pageY = e.pageY - ct
        var cvsWrap = $('#cvs-wrap')
        var cur = e.currentTarget
        var fanliyY = pageY - s.tempPage.y
        var fanliyX = pageX - s.tempPage.x
        model.left = fanliyX
        model.top = fanliyY
    }

    //关闭移动开关
    s.removeMoveItem = function() {
        s.isMove = false
    }

    s.changeRotate = function(name, value) {
        if (!s.currentItem) return
        s.currentItem[name] += value
        s.currentItem['transform'] = 'rotate(' + s.currentItem[name] + 'deg)'
    }

    //modal数据

    s.getListItem = []

    //缓存上传图片名字
    s.UPLOADNAME = ''
        //loading
    s.isloading = false

    //previewimage
    //修改图片路径后预览
    $('#upload-background').on('change', function() {
        var file = $(this)[0].files
        var preview = $('#preview-bg')
        var reader = new FileReader();
        reader.addEventListener("load", function() {
            preview.attr('src', reader.result)
        }, false);

        if (file[0]) {
            reader.readAsDataURL(file[0]);
        }
    })

    //打开上传选择主题模态
    s.listTypeName = ''
    s.uploadPreviewModal = function() {
        var file = $('#upload-background')[0].files

        if (file.length < 1) return

        if (!(/\.(jpe?g|png)$/i.test(file[0].name))) return

        if (file[0].name == s.UPLOADNAME) {
            alert('这张图片已上传')
            return;
        };
        var uploadPreview = $('#upload-preview');
        var file = $('#upload-background')[0];

        var imgBg = getFileUrl(file)
        uploadPreview.attr('src', imgBg)
        s.isloading = true
        $http.get(s.uploadBaseUrl + 'typelist').then(function(res) {
            s.isloading = false
            s.typeList = res.data
            $('#chioseType').modal()
        })
    }


    //获取input files 对象的bolob路径
    function getFileUrl(sourceId) {
        var url;
        if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE 
            url = sourceId.value;
        } else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox 
            url = window.URL.createObjectURL(sourceId.files[0]);
        } else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome 
            url = window.URL.createObjectURL(sourceId.files[0]);
        }
        return url;
    }

    //主题名称
    s.diyType = ""
        //背景图片名称
    s.bgItemName = ""

    //上传背景图片
    s.uploadAdmin = function() {
        var file = $('#upload-background')[0].files

        if (file.length < 1) return

        if (!(/\.(jpe?g|png)$/i.test(file[0].name))) return

        if (file[0].name == s.UPLOADNAME) {
            alert('这张图片已上传')
            return;
        };

        let uploadFile = new FormData()
        uploadFile.append('file', file[0])
        uploadFile.append('ref', 'admin')
        uploadFile.append('title', s.bgItemName)
        uploadFile.append('theme', s.diyType)

        s.isloading = true
        $.ajax({
            url: s.uploadBaseUrl + "upload",
            type: "POST",
            data: uploadFile,
            processData: false, // 不处理数据
            contentType: false // 不设置内容类型
        }).done(function(res) {
            s.isloading = false
            s.UPLOADNAME = file[0].name
            s.$apply()
            $('#chioseType').modal('hide')
        });
    }

    s.typeList = []
        //获取类型列表
    s.getImgBgList = function() {
        s.isloading = true
        $http.get(s.uploadBaseUrl + 'typelist').then(function(res) {
            s.isloading = false
            s.typeList = res.data
            $('#getImgList').modal()
        })
    }

    s.listActive = null
    s.bgGroundList = []
    s.getListItem = function(model, index) {
        s.listActive = index
        s.diyType = model.theme
        url = s.uploadBaseUrl + 'photolist?theme=' + s.diyType
        $http.get(url).then(function(res) {
            if (res.status == 200) {
                s.bgGroundList = res.data
            }
        })
    }
    s.backgroundImg = null
    s.getBGitems = function(item) {
        s.backgroundImg = s.baseUrl + item.pic
        var bgimage = new Image()
        bgimage.src = s.backgroundImg
        bgimage.onload = function() {
            if (bgimage.width >= 960) {
                var cw = bgimage.width / 960
                s.canvasComputed.width = bgimage.width / cw
                s.canvasComputed.height = parseInt(bgimage.height / cw)
            } else {
                s.canvasComputed.width = bgimage.width
                s.canvasComputed.height = bgimage.height
            }
            s.cvsRatio.rotate = (s.canvasComputed.width / s.canvasComputed.height).toFixed(3)
            s.$apply('canvasComputed')
            $('#getImgList').modal('hide')
        }
    }

    var bgimage = new Image()
    bgimage.src = 'assets/imgs/items.png'
    s.backgroundImg = 'assets/imgs/items.png'
    bgimage.onload = function() {
        s.canvasComputed.width = bgimage.width
        s.canvasComputed.height = bgimage.height
        s.cvsRatio.rotate = (s.canvasComputed.width / s.canvasComputed.height).toFixed(3)
        s.$apply()
    }

    //预览已做好的一张主题
    //preview-modal
    // //储存类型数据
    // s.tempData={
    // 	//背景
    // 	bgImg:"",
    // 	//列表单个ID
    // 	id:"img_list_0",
    // 	//主视图比例
    // 	cvsRatio:10/7,
    // 	//文字数据
    // 	textList:[],
    // 	//相片元素数据
    // 	//除了opcity,rotate为实数，其他都为百分比
    // 	list:[{
    // 		width:0,
    // 		height:0,
    // 		top:0,
    // 		left:0,
    // 		rotate:0,
    // 		id:'222',
    // 		opcity:1,
    // 		pic:"",
    // 		aspectRatio:1.777,
    // 	}]
    // }

    s.toPreviewModal = function() {
        $('#preview-modal').modal()
    }

    //当前加号集合
    // s.itemList=[]

    //计算list矩阵百分比数据

    function computedPercentData(list) {
        var pw = s.canvasComputed.width
        var ph = s.canvasComputed.height
        for (var i = 0; i < list.length; i++) {
            list[i].width = (list[i].width / pw * 100).toFixed(2)
            list[i].height = (list[i].height / ph * 100).toFixed(2)
            list[i].top = (list[i].top / ph * 100).toFixed(2)
            list[i].left = (list[i].left / pw * 100).toFixed(2)
        }

        return list
    }

    //设置最主题终数据
    s.finallyData = []
    s.setFinallyData = function() {
            var id = new Date().getTime().toString(16)
            var list = angular.copy(s.itemList)
            var bgImg = s.backgroundImg
            var cvsRatio = s.cvsRatio.rotate
            var textList = []
            let tempData = {}
            var clist = computedPercentData(list)
            if (list.length < 1) {
                var rstate = confirm("还未插入任何元素,确定生成相册主题？")
                if (!rstate) {
                    return
                }
            }
            tempData.id = id
            tempData.list = clist
            tempData.bgImg = bgImg
            tempData.cvsRatio = cvsRatio
            tempData.textList = textList
            for (var i = 0; i < s.finallyData.length; i++) {
                if (tempData.id === s.finallyData[i].id) {
                    s.finallyData.splice(i, 1, tempData)
                    return;
                }
            }
            s.finallyData.push(tempData)
        }
        //生成主题

    s.delList = function(index, col) {
        col.splice(index, 1)
    }
    s.tonext = function(index, col) {
        let model = col[index]
        if (index == col.length - 1) return
        let tempModel = angular.copy(model)

        col.splice(index, 1)
        col.splice(index + 1, 0, tempModel)
    }
    s.toprev = function(index, col) {
        let model = col[index]
        if (index < 1) return
        let tempModel = angular.copy(model)

        col.splice(index, 1)
        col.splice(index - 1, 0, tempModel)
    }
    s.isFinallyData = {
        id: null,
        jsondata: {}
    }
    s.codeId = 1
    s.sendXiangCeData = function() {
        var querySend = confirm('确定要上传已完成的相册组吗？')
        if (!querySend) return
        if (s.finallyData.length < 1) {
            alert('没有生成任何相片组')
            return;
        }
        s.isFinallyData.id = s.codeId
        var sendData = JSON.stringify({
            tmeme: angular.copy(s.diyType),
            list: angular.copy(s.finallyData)
        })
        s.isFinallyData.jsondata = sendData
        var url = s.uploadBaseUrl + "upalbum"
        s.isloading = true
        $.ajax({
            type: 'POST',
            url: url,
            data: s.isFinallyData,
            dataType: 'json'
        }).done(function(res) {
            if (res.code) {
                alert('上传成功')
                s.isloading = false;
                s.$apply()
            } else {
                alert('上传失败，请联系管理员')
                s.isloading = false;
                s.$apply()
            }
        });
    }
}])