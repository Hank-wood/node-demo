define([],function(){
    var comments = $("#comments-content"),
        addComment = $("#add-comments"),
        tips = $("#tips");
    comments.on('keyup',function(){
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
        if(/^\s*$/.test(comments.val())){
            tips.attr({
                class: 'error'
            }).html('评论不能为空！');
            return false;
        }
        $.queryData({
            url: 'addComments',
            data: {
                car_id: comments.attr("data-id"),
                comments: comments.val()
            }
        },function(res){
            if(res.code == 1){
                tips.attr({
                    class: 'success'
                }).html('发布成功！')
                comments.val('');
                addComment.attr('disabled',true);
            }else{
                tips.attr({
                    class: 'error'
                }).html('发布失败！')
            }
            setTimeout(function(){
                tips.addClass('hidden');
            },3000)
        })
    })
})