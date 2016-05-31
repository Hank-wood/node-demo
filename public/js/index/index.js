define([
    'common/webuploader/webuploader.min',
    'js/common/template'
], function(webuploader, template) {
    var START = 0,
        LIMIT = 10,
        adress = $(".adress"),
        formAdress = $("#adress"),
        imgGroup = $('.wb-img'),
        wbGroup = $('.wb-list');

    var uploader = webuploader.create({

        // 文件接收服务端。
        server: '/file/upload',
        auto: true,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
            id: '.add-img',
            multiple: true
        }
    });
    // 微博添加的图片
    uploader.img = [];
    uploader.on('fileQueued', function(file) {
        uploader.makeThumb(file, function(err, ret) {
                if (err) {
                    imgGroup.append('<a class="inline-block">预览错误</a>');
                } else {
                    imgGroup.append('<a class="inline-block"><img src=' + ret + ' /></a>');
                }
            })
            // imgGroup.append('<img src='+file.src+'/>')
    }).on('uploadSuccess', function(file, res) {
        if (res.code === 1) {
            uploader.img.length > 0 ? uploader.img.push(res.msg.img[0]) : uploader.img = [res.msg.img[0]];
        }
    })

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            adress.html("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        AMap.service('AMap.Geocoder', function() {
            //- 经纬度坐标
            var lnglatXY = [position.coords.longitude, position.coords.latitude],
                geocoder = new AMap.Geocoder();
            geocoder.getAddress(lnglatXY, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    adress.html(result.regeocode.formattedAddress);
                    formAdress.val(result.regeocode.formattedAddress);
                } else {
                    adress.html('获取地址失败');
                }
            })
        })
    }
    $(".send-btn").on('click', function() {
        var wbContent = $('#wb-con').val(),
            adress = $('#adress').val(),
            addImgBtn = $('.add-img'),
            wbGroup = $('.wb-list'),
            reg = /^\s*$/;
        if (reg.test(wbContent)) {
            alert('说点什么吧')
            return false;
        } else if (wbContent.length > 140) {
            alert('140字符以内亲');
            return false;
        } else {
            $.ajax({
                url: '/wb/add',
                type: 'post',
                data: {
                    content: wbContent,
                    adress: adress,
                    img_path: uploader.img.join(',')
                },
                success: function(res) {
                    if (res.code === 1) {
                        if(wbGroup.find('.wb-item').length > 0){
                            $(template('wb-tpl', res.data)).insertBefore( wbGroup.find('.wb-item').eq(0) );
                        }else{
                            wbGroup.append( template('wb-tpl', res.data) );
                        }
                        $('#adress,#wb-con').val('');
                        imgGroup.html('');
                        uploader.reset();

                    } else {
                        console.error(res.data.code);
                    }
                }
            })
        }
    })
    $("#location").change(function(event) {
        var status = event.target.checked;
        if (status) {
            getLocation();
        } else {
            adress.html('');
            formAdress.val('');
        }
    })
    $(".delete").click(function() {
        if (confirm('确认删除？')) {
            $.ajax({
                url: '/wb/delete',
                type: 'post',
                data: {
                    id: $(this).attr('wb_id')
                },
                success: function(res) {
                    if (res.code === 1) {
                        window.location.reload();
                    } else {
                        console.error(res);
                    }
                }
            })
        }
    })

    function getList(data){
        $.ajax({
            url: '/wb/list',
            type: 'post',
            data: data,
            success: function(res) {
                if (res.code === 1) {
                    wbGroup.html( template('wb-tpl', res) );
                } else {
                    console.error(res);
                }
            }
        })
    }
    getList({
        start: START,
        limit: LIMIT
    })
})