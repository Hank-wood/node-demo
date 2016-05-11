define([],function(){
	$.queryData = function(data,callback){
		var config = {
			type: 'post',
			async: true,
			dataType: 'json',
			success: function(res){
				typeof callback == 'function' && callback(res);
			},
			error: function(res){
				console && console.error(res);
			}
		}
		config = $.extend(true,config,data);
		$.ajax(config);
	}
})
