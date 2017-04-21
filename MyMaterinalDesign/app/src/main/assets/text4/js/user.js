$(function(){
	$("#imgFile").change(function () {
		 var formData = new FormData($( "#userInfoForm" )[0]); 
		 $.ajax({  
			  url: '/perCenter/uploadTemporaryPic', 
	          type: 'POST',  
	          data: formData,  
	          async: false,  
	          cache: false,  
	          contentType: false,  
	          processData: false,  
	          success: function (returndata) {
	        	  $("#headpic").val(returndata);
	        	  $(".imdes").find("img").eq(0).attr("src",pathUrl+returndata);
	          },  
	          error: function (returndata) {  
	          }  
	  });
   });
});

var commonSymbol = "[\\,\\`\\~\\!\\@\\#\\$\\%\\\\^\\&\\*\\(\\)\\-\\_\\=\\+\\[\\{\\]\\}\\\\|\\;\\:\\‘\\’\\“\\”\\<\\>\\/?]+";
var countdown = 60;
//注册时获取短信验证码
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
	/* if(checkMobileRegistered(mobileId)){
		showMessageTime("手机号已经注册过了", 5000);
		return false;
	} */
	showTime(obj);
	$.ajax({
		url: "/mobileuser/userSendCode",
		type: "POST",
		cache: false,
		data: {
			mobile: mobileValue,
		},
		success: function (data) {
			if(data.successStatus){
				showMessageTime("验证码已发出", 5000);
			}else{
				showMessageTime(data.showError, 5000);
			}
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
				url: "/mobileuser/validateMobile",
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


function showTime(o) {
	if (countdown == 1) {
		$(o).attr("onclick", "userSendCode(this,'registMobile')");
		countdown = 60;
		$(o).text("获取短信验证码");
		//$(o).css({"cursor":"pointer"});
	} else {
		$(o).attr("onclick", "null");
		//$(o).css({"cursor":"default"});
		countdown--;
		$(o).text(countdown+"s后重新获取"); 
		setTimeout(function () {
			showTime(o)
		}, 1000)
	}
}
//注册方法
function register(mobileId,vcodeid,pwdid) {
	var mobileValue = $("#"+mobileId).val();
	if(!mobileValue){
		showMessageTime("请输入手机号", 5000); 
		return false;
	}
	if(!checkMobileOnBlur(mobileId)){
		showMessageTime("手机号格式不正确", 5000);
		return false;
	}
	/* if(checkMobileRegistered(mobileId)){
		showMessageTime("手机号已经注册过了", 5000);
		return false;
	} */
	var codeValue = $('#' + vcodeid).val();
	if(!codeValue){
		showMessageTime("请输入验证码", 5000);
		return false;
	}else{
		var code = /^[0-9]{6}$/;
		if (!code.test(codeValue)) {
			showMessageTime("验证码格式不正确,请输入六位的验证码", 5000);
			return false;
		} 
	}
	var pwdValue = $("#"+pwdid).val();
	if(!pwdValue || pwdValue.trim().length == 0){
		showMessageTime("请输入密码", 5000);
		return false;
	}else{
		if(!checkPasswordOnBlur(pwdid)){
			return false;
		}
	}
	
	$.ajax({
		url: "/mobileuser/userRegist",
		type: "post",
		cache: false,
		data: {
			mobile: mobileValue,
			code: codeValue,
			password: pwdValue,
			type: "0"
		},
		success: function (data) {
			if(data.successStatus){
				var returnUrl = jQuery.cookie("returnUrl");
				if (typeof(returnUrl) == "undefined") {
					returnUrl = "http://www.binggou.com/mobileindex/homePage";
				}
				window.location.href = returnUrl;
			}else{
				 showMessageTime(data.showError, 5000);
			}
		}
	});
}
	
function checkPasswordOnBlur(pwdid) {
	var b = check_pwd(pwdid);
	if(b == 1 || b == 0){
		return true;
	}else if (b == 2 || b == 3) {
		showMessageTime("密码为6-20位字符", 5000);
		return false;
	}else if(b == 4) {
		showMessageTime("密码中不允许有空格", 5000);
		return false;
	}else if(b == 5) {
		showMessageTime("密码不能全为数字", 5000);
		return false;
	}else if(b == 6){
		showMessageTime("密码不能全为字母，请包含至少1个数字或符号", 5000);
		return false;
	}else if(b == 7){
		showMessageTime("密码不能全为符号", 5000);
	    return false;
	}else if(b == 8){
		showMessageTime("密码不能全为相同字符或数字", 5000);
	    return false;
	}
}

function check_pwd(id) {
	var p = $("#"+id).val();
	if (p == "") {
		return 1;
	}
	if (p.length > 20) {
		return 2;
	}
	if (p.length < 6) {
		return 3;
	}
	var m = /\s+/;
	if (m.test(p)) {
		return 4;
	}
	var k = /^[0-9]+$/;
	if (k.test(p)) {
		return 5;
	}
	var j = /^[a-zA-Z]+$/;
	if (j.test(p)) {
		return 6;
	}
	var o = /^[^0-9A-Za-z]+$/;
	if (o.test(p)) {
		return 7;
	}
	if (isSameWord(p)) {
		return 8;
	}
	var n = "d*" + commonSymbol + "";
	var i = "\\\d+[A-Za-z]|[A-Za-z]+[0-9]+|[A-Za-z]+" + commonSymbol
		+ "[0-9]+|[A-Za-z]+[0-9]+" + commonSymbol + "|" + n + "";
	var l = new RegExp(i);
	if (!l.test(p)) {
		return 10;
	}
	return 0;
}

function isSameWord(g) {
	var e;
	if (g != null && g != "") {
		e = g.charCodeAt(0);
		e = "\\" + e.toString(8);
		var f = "[" + e + "]{" + (g.length) + "}";
		var h = new RegExp(f);
		return h.test(g);
	}
	return true;
}
//登录方法
function userPwdLogin(mobileId,pwdid,type){
	
	var mobileValue = $("#"+mobileId).val();
	var pwdValue = $("#"+pwdid).val();
	if(!mobileValue){
		showMessageTime("请输入手机号", 5000); 
		return false;
	}
	if(!checkMobileOnBlur(mobileId)){
		showMessageTime("手机号格式不正确", 5000);
		return false;
	}	

	if(!pwdValue){
		if(type == 0){
			showMessageTime("请输入验证码", 5000); 
		}else{
			showMessageTime("请输入密码", 5000); 
		}
		return false;
	}
	
	$.ajax({
		url: "/mobileuser/userLogin",
		type: "post",
		cache: false,
		data: {
			mobile: mobileValue,
			password: pwdValue,
			type: type,
			code: pwdValue
		},
		success: function (data) {
			if (data.successStatus) {
				var returnUrl = jQuery.cookie("returnUrl");
				if (typeof(returnUrl) != "undefined") {
					//returnUrl = "http://www.binggou.com/mobileindex/homePage";
					window.location.href = returnUrl;
				}else{
					history.go(-2);
				}
				if($('.choice a').attr('class')=='curr'){
					$.cookie("mobile_mobile_value", mobileValue, {path: '/', expires: 30});
					$.cookie("mobile_pwd_value", pwdValue, {path: '/', expires: 30});
				}
			}else{
				showMessageTime(data.showError, 5000); 
			}
		}
	});
}
//重置密码
function restPassword(mobileId,vcode,pwdid) {
	var mobileValue = $("#"+mobileId).val();
	if(!mobileValue){
		showMessageTime("请输入手机号", 5000); 
		return false;
	}
	if(!checkMobileOnBlur(mobileId)){
		showMessageTime("手机号格式不正确", 5000);
		return false;
	}
	
	var codeValue = jQuery('#' + vcode).val();
	if(!codeValue){
		showMessageTime("请输入验证码", 5000); 
		return false;
	}else{
		var code = /^[0-9]{6}$/;
		if (!code.test(codeValue)) {
			showMessageTime("验证码格式不正确,请输入六位的验证码", 5000);
			return false;
		} 
	}
	
	var pwdValue = $("#"+pwdid).val();
	if(!pwdValue || pwdValue.trim().length == 0){
		showMessageTime("请输入密码", 5000);
		return false;
	}else{
		if(!checkPasswordOnBlur(pwdid)){
			return false;
		}
	}
	
	jQuery.ajax({
		url: "/mobileuser/userRestPwd",
		type: "POST",
		cache: false,
		data: {
			mobile: mobileValue,
			code: codeValue,
			password: pwdValue
		},
		success: function (data) {
			if (data.successStatus) {
				$.cookie("mobile_pwd_value", pwdValue, {path: '/', expires: 30});
				var returnUrl = jQuery.cookie("returnUrl");
				if (typeof(returnUrl) == "undefined") {
					//returnUrl = "http://www.binggou.com/mobileindex/homePage";
					history.go(-2);
				}
				window.location.href = returnUrl;
			}else{
				showMessageTime(data.showError, 5000); 
			}
		}
	});
}

function updateUser(){
	var userName = $('#userName').val();
	if(!userName){
		showMessageTime("请输入姓名", 5000); 
		return false;
	}
	var company = $('#company').val();
	if(!company){
		showMessageTime("请输入公司名称", 5000); 
		return false;
	}
	var position = $('#position').val();
	if(!position){
		showMessageTime("请输入职位", 5000); 
		return false;
	}
	var sex = 0;
	if($('.sexcla a[class *= curr]').text() =='女士') sex= 1;
	
	jQuery.ajax({
		url: "/mobileuser/updateUser",
		type: "POST",
		cache: false,
		data: {
			userName: userName,
			sex: sex,
			company: company,
			position: position,
			headerPic: $("#headpic").val()
		},
		success: function (data) {
			if (data.successStatus) {
				showMessageTime("修改成功", 5000); 
			}else{
				showMessageTime(data.showError, 5000); 
			}
		}
	});
}

function logout(){
	jQuery.ajax({
		url: "/mobileuser/logout",
		type: "GET",
		cache: false,
		success: function (data) {
			if (data.successStatus) {
				$.cookie("mobile_mobile_value",'',{path: '/'});
				$.cookie("mobile_pwd_value",'',{path: '/'});
				history.go(-2);
			}
		}
	});
}
