define([], function() {
    var adress = $(".adress"),
        formAdress = $("#adress");

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
                    adress: adress
                },
                success: function(res) {
                    if (res.code === 1) {
                        localtion.reload();
                    }
                }
            })
        }
    })
    $("#location").change(function(event) {
        var status = event.target.checked;
        if(status){
            getLocation();
        }else{
            adress.html('');
            formAdress.val('');
        }
    })
})