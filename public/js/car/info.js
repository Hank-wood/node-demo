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
        $.ajax({
            url:"add_comments",
            type: "post",
            data: {
                id: comments.attr("data-id"),
                comments: comments.val()
            },
            success: function(res){

            },
            error: function(res){

            }
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