//重置搜索项目的条件
function resetFunc(){
	$('div .spew.disn').eq(0).children('a').removeClass('curr');
	$('div .spew.disn').eq(1).children('a').removeClass('curr');
	$('div .spew.disn').eq(0).children('a').first().addClass('curr');
	$('div .spew.disn').eq(1).children('a').first().addClass('curr');
	$('.choreg').find('a').eq(0).find('p').text('任何行业');
	$('.choreg').find('a').eq(1).find('p').text('任何价位');
}
//搜索项目
function searchFunc(){
	//var searchName = $('#searchName').val();
	var categroyName = $('div .spew.disn').eq(0).children('a').filter('.curr').text();
	var priceName = $('div .spew.disn').eq(1).children('a').filter('.curr').text();
	if(categroyName != '任何行业')$('#categroyName').val(categroyName);
	if(priceName != '任何价位')$('#priceName').val(priceName);
}
//添加或取消收藏
function addOrCancelCollection(businessId,obj){
	var type = $(obj).attr('data_c')==0?1:0;
	jQuery.ajax({
		url: "/mobileproject/addOrCancelCollection",
		type: "POST",
		cache: false,
		async : true,
		data: {
			type: type,
			businessType: 0,
			businessId: businessId
		},
		success: function (data) {
			if (data.successStatus) {
				if(type=='1'){
					$(obj).addClass('curr')
					$(obj).attr('data_c',1);
					if($(obj).parents().is('.recme')){
						$(obj).html('已收藏');	
					}
					if($(obj).parents().is('.proje_01h')){
						$('article .proje_01').children('a').eq(1).attr('data_c','1');	
						$('article .proje_01').children('a').eq(1).attr('class','agree curr');	
					}else if($(obj).parents().is('.proje_01')){
						$('article .proje_01h').children('a').eq(1).attr('data_c','1');	
						$('article .proje_01h').children('a').eq(1).attr('class','agree curr');	
					}
				}else{
					$(obj).attr('data_c',0);
					$(obj).removeClass('curr');
					if($(obj).parents().is('.recme')){
						$(obj).html('未收藏');	
					}
					if($(obj).parents().is('.proje_01h')){
						$('article .proje_01').children('a').eq(1).attr('data_c','0');	
						$('article .proje_01').children('a').eq(1).attr('class','agree');	
					}else if($(obj).parents().is('.proje_01')){
						$('article .proje_01h').children('a').eq(1).attr('data_c','0');	
						$('article .proje_01h').children('a').eq(1).attr('class','agree');	
					}
				}
			}else{
				showMessageTime(data.showError, 5000); 
			}
			/* var val=$(obj).attr('data_c');
			if(val=='1'){
				$(obj).attr('data_c',0);
				$(obj).removeClass('curr');
				if($(obj).parents().is('.recme')){
					$(obj).html('未收藏');	
				}	
			}else{
				$(obj).addClass('curr')
				$(obj).attr('data_c',1);
				if($(obj).parents().is('.recme')){
					$(obj).html('已收藏');	
				}
			} */
		}
	});
	
}
//保存我有需求
function submitDemand(saveType){
	var userName = $('#userName').val();
	if(!userName){
		showMessageTime("请输入姓名", 5000); 
		return false;
	}
	var contactWay = $('#contactWay').val();
	if(!contactWay){
		showMessageTime("请输入电话", 5000); 
		return false;
	}
	var content = $('#content').val();
	if(!content){
		showMessageTime("请输入您的需求", 5000); 
		return false;
	}else if(content=='请简要概述您的需求'){
		showMessageTime("请输入您的需求", 5000); 
		return false;
	}else if(content=='请简要概述您的项目'){
		showMessageTime("请简要概述您的项目", 5000); 
		return false;
	}
	if(saveType == 1){
		$.ajax({
			url: "/mobileproject/saveDemand",
			type: "post",
			cache: false,
			data: {
				userName: userName,
				contactWay: contactWay,
				content: content
			},
			success: function (data) {
				if(data.successStatus){
					showMessageTime("保存成功", 3000);
					setTimeout(function () {
						history.go(-1);
					}, 3000);
					
				}else{
					 showMessageTime('保存失败', 5000);
				}
			}
		});
	}else if(saveType == 2){
		$.ajax({
			url: "/mobileproject/saveContactMe",
			type: "post",
			cache: false,
			data: {
				userName: userName,
				contactWay: contactWay,
				content: content
			},
			success: function (data) {
				if(data.successStatus){
					showMessageTime("保存成功", 3000);
					setTimeout(function () {
						history.go(-2);
					}, 3000);
					
				}else{
					 showMessageTime('保存失败', 5000);
				}
			}
		});
	}
	
}
var timeout;
//删除收藏
function delCollProject(projectId){
	$('#li_'+projectId).hide();
	$('.message').fadeIn();
	timeout = setTimeout(function () {
		$('.message').fadeOut();
		jQuery.ajax({
			url: "/mobileproject/addOrCancelCollection",
			type: "POST",
			cache: false,
			data: {
				type: 0,
				businessType: 0,
				businessId: projectId
			},
			success: function (data) {
				if (data.successStatus) {
					$(obj).attr('data_c',0);
					$(obj).removeClass('curr');
					if($(obj).parents().is('.recme')){
						$(obj).html('未收藏');	
					}
				}else{
					showMessageTime(data.showError, 5000); 
				}
			}
		});
	}, 5000);
	
	$(".message a").attr('onclick','cancelDel('+projectId+')')
}
//取消删除收藏
function cancelDel(projectId){
	$('#li_'+projectId).show();
	clearTimeout(timeout);
	$(".message").attr('style','display: none;');
}

