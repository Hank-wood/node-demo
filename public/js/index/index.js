define([],function(){
    var x=document.getElementById("demo");
    function getLocation()
    {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else{x.innerHTML="Geolocation is not supported by this browser.";}
    }
    function showPosition(position)
    {        
        AMap.service('AMap.Geocoder', function(){
            //- 经纬度坐标
            var lnglatXY = [position.coords.longitude,position.coords.latitude],
                geocoder = new AMap.Geocoder();
            geocoder.getAddress(lnglatXY, function(status, result){
                if(status === 'complete' && result.info ==='OK'){
                    x.innerHTML = result.regeocode.formattedAddress;
                }else{
                    x.innerHTML = '获取地址失败';
                }
            })
        })
    }
})