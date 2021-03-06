define([],function(){
    $('#register').on('click',function(event){
        var event = event || window.event;
        var oForm = $('#form')[0];

        $.queryData({
            url: 'user/register',
            data: {
                name: oForm.name.value,
                password: oForm.password.value
            }
        },function(res){
            if(res.code === 0){
                $("#error").html(res.msg);
            }else{
                $('#login').click();
            }
        })
        event.preventDefault();
    })
    $('#login').on('click',function(event){
        var event = event || window.event;
        var oForm = $('#form')[0];
        $.queryData({
            url: 'user/login',
            data: {
                name: oForm.name.value,
                password: oForm.password.value
            }
        },function(res){
            if(res.code == 1){
                location.href = "/"
            }else{
                $("#error").html('账号或密码错误');
            }
        })
        event.preventDefault();
        return false;
    })
    $('.register').on('click',function(){
        $('.just-register').show();
        $('.just-login').hide();
    })
    $('.sigin').on('click',function(){
        $('.just-register').hide();
        $('.just-login').show();
    })
})