var countdown = 60;

function userSendCode(obj,mobileId){
	var mobileValue = $("#"+mobileId).val();
	if(!mobileValue){
		showMessageTime("请输入手机号", 5000); 
		return false;
	}
	if(!checkMobileOnBlur(mobileId)){
		showMessageTime("手机号格式不正确", 5000);
		return false;
	}
	if(checkMobileRegistered(mobileId)){
		showMessageTime("手机号已经注册过了", 5000);
		return false;
	}
	$.ajax({
		url: "/appwebuser/userSendCode",
		type: "POST",
		cache: false,
		data: {
			mobile: mobileValue,
		},
		success: function (data) {
			showTime(obj);
		}
	});
}

//验证文本框的手机号格式
function checkMobileOnBlur(mobileId) {
	var mobileValue = $("#" + mobileId).val();
	if(mobileValue){
		if (mobile(mobileValue)) {
			return true;
		}
	}
	return false;
}
	
//检查手机号是否已经注册过了
function checkMobileRegistered(mobileId){
	var mobileValue = $("#" + mobileId).val();
	if(mobileValue){
		if (mobile(mobileValue)) {
			$.ajax({
				url: "/appwebuser/validateMobile",
				type: "GET",
				data: {
					mobile: mobileValue
				},
				success: function (data) {
					if (data.success) {
						return true;
					} else {
						return false;
					}
				}
			});
		}
	}
	return false;
}
	
function mobile(value) {
	var regMobile = /^(13[0-9]||15[012356789]||18[0123456789]||147||145||17[0-9])\d{8}$/;
	if (!regMobile.test(value)) {
		return false;
	}
	return true;
}

function showMessageTime(errText,time){
	$(".message p").text(errText);
	$(".message").removeClass("disn").addClass("shay");
	setTimeout(function () {
		$(".message").removeClass("shay").addClass("disn");
	}, time);
}

function showTime(o) {
	if (countdown == 1) {
		$(o).attr("onclick", "userSendCode(this,'registMobile','regist_desc')");
		countdown = 60;
		$(o).text("获取验证码");
		$(o).css({"cursor":"pointer"});
	} else {
		$(o).attr("onclick", "null");
		$(o).css({"cursor":"default"});
		countdown--;
		$(o).text(countdown+"s后重新获取"); 
		setTimeout(function () {
			showTime(o)
		}, 1000)
	}
}

