define([],function(){
    var comments = $("#comments-content"),
        addComment = $("#add-comments");
    comments.on('keyup',function(){
        console.log($(this).val())
        if(/^\s*$/.test($(this).val())){
            addComment.attr({
                disabled: true
            })
        }else{
            addComment.attr({
                disabled: false
            })
        }
    })
    addComment.on('click',function(){
        
        $.queryData({
            url: 'add_comments',
            data: {
                id: comments.attr("data-id"),
                comments: comments.val()
            }
        },function(res){
            if(res.code == 1){
                $("#tips").attr({
                    class: 'success'
                }).html('发布成功！')
                comments.empty();
            }else{
                $("#tips").attr({
                    class: 'error'
                }).html('发布失败！')
            }
            setTimeout(function(){
                $("#tips").addClass('hidden');
            },3000)
        })
    })

    function getComments(data){
        $.ajax({
            url:"get_comments",
            type: "post",
            data: data,
            success: function(res){

            },
            error: function(res){

            }
        })
    }
})