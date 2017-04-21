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
	if (typeof(returnUrl) == "undefined") {
		returnUrl = "http://www.binggou.com/mobileindex/homePage";
		window.location.href = returnUrl;
	}else{
		history.go(-1);
	}
	//window.location.href = returnUrl;
}

function setCookURL(){
	jQuery.cookie("returnUrl","/mobileproject/searchProjectList",{path:"/"});
}