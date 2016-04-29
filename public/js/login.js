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
})