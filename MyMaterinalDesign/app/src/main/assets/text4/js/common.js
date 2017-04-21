var pathUrl = "http://web.binggou.com/";
//信息提示方法
function showMessageTime(errText,time){
	$(".message p").text(errText);
	$(".message").removeClass("disn").addClass("shay");
	setTimeout(function () {
		$(".message").removeClass("shay").addClass("disn");
	}, time);
}

function closeWindow(){
	var returnUrl = jQuery.cookie("returnUrl");
	if (typeof(returnUrl) != "undefined") {
		//returnUrl = "http://www.binggou.com/mobileindex/homePage";
		window.location.href = returnUrl;
	}else{
		history.go(-1);
	}
	//window.location.href = returnUrl;
}

function setCookURL(){
	jQuery.cookie("returnUrl","/mobileproject/searchProjectList",{path:"/"});
}

//判断用户是否登录
function isLogin(){
	$.ajax({
		url: "/mobileuser/isLogin",
		type: "post",
		cache: false,
		async:false,
		data: {
		},
		success: function (data) {
			if (data.successStatus) {
				console.log('登录状态');
			}else{
				console.log('未登录状态'); 
				autoLogin();
			}
		}
	});
}

//自动登录
function autoLogin(){
	var mobileValue = $.cookie("mobile_mobile_value");
	var pwdValue = $.cookie("mobile_pwd_value");
	if(mobileValue && pwdValue){
		$.ajax({
			url: "/mobileuser/userLogin",
			type: "post",
			cache: false,
			async:false,
			data: {
				mobile: mobileValue,
				password: pwdValue,
				type: 1,
				code: pwdValue
			},
			success: function (data) {
				if (data.successStatus) {
					console.log('自动登录成功');
				}else{
					console.log('自动登录失败'); 
				}
			}
		});
	}
}
jQuery(function() {
	isLogin();
});