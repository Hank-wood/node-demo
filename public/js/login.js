define([],function(){
    $('#register').on('click',function(event){
        var event = event || window.event;
        var oForm = $('#form')[0];

        $.queryData({
            url: 'register',
            data: {
                username: oForm.username.value,
                password: oForm.password.value
            }
        },function(res){

        })
        event.preventDefault();
    })
    $('#login').on('click',function(event){
        var event = event || window.event;
        var oForm = $('#form')[0];
        $.queryData({
            url: 'signin',
            data: {
                username: oForm.username.value,
                password: oForm.password.value
            }
        },function(res){
            if(res.code == 1){
                location.href = "/"
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