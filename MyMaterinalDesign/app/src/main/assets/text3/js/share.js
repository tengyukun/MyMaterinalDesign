//分享JS
/* 微信分享 start */
	/* url一定要动态获取  */
var url = window.location.href;
//alert("url = " + url)
var articleId = $('#detail_projectId').val();//'${projectId}';	//项目id
var shareTitle = $('#detail_projectName').val();//'${projectName}';	//标题
var shareDesc = $('#detail_point').val();//'${point}';		//描述
var shareImgUrl = $('#detail_projectCover').val();//'${projectCover}';	//图片
console.log("===============================")
console.log("articleId = " + articleId)
console.log("shareTitle = " + shareTitle)
console.log("shareDesc = " + shareDesc)
console.log("shareImgUrl = " + shareImgUrl)
console.log("===============================")
/*
	分享的时候会自动获取页面的title属性并作为标题，项目详情页的标题用的是项目的名称
*/
if(shareTitle == null || shareTitle == '' || shareTitle == undefined){
	shareTitle = '【云并购】优质项目推荐'
	$(document).attr("title","【云并购】优质项目推荐");
}else{

	$(document).attr("title", shareTitle);
}
if(shareImgUrl == null || shareImgUrl == '' || shareImgUrl == undefined){
	//shareImgUrl = "${projectVo.project.centerpicurl}";
	shareImgUrl = systemPicUrl + "/mobile/images/mobile_logo.png";
}
if(shareDesc == null || shareDesc == '' || shareDesc == undefined){
	shareDesc = '专业的投资并购服务，更多投资机会，更多精彩项目，尽在云并购。';
}

var timestamp;
var noncestr;
var signature;
//获取签名
jQuery.ajax({
	type : "GET", 
	url : "/WeixinshareController/Api/Inteface/getSignature",
	//data:{timestamp:timestamp,noncestr:noncestr,url:url},
	data : {
		url : url
	},
	success : function(data) {
		var objData = JSON.parse(data);
		timestamp = objData.timestamp;
		noncestr = objData.noncestr;
		signature = objData.signature;
		console.log(objData);
		wxShare();
	}
});
function wxShare() {
	
	console.log("===============================")
	console.log("shareTitle = " + shareTitle)
	console.log("shareDesc = " + shareDesc)
	console.log("url = " + url)
	//alert("shareImgUrl = " + shareImgUrl)
	console.log("===============================")
	
	
	wx.config({
		debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId : 'wxb46e04627c4d5bd5', // 和获取Ticket的必须一样------必填，公众号的唯一标识
		timestamp : timestamp, // 必填，生成签名的时间戳
		nonceStr : noncestr, // 必填，生成签名的随机串
		signature : signature,// 必填，签名，见附录1
		jsApiList : [     
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
        ]
	// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	}
	wx.ready(function() {
		//config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
		//config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关
		//接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	
		//----------“分享给朋友”
		wx.onMenuShareAppMessage({
			title : shareTitle, // 分享标题
			desc : shareDesc, // 分享描述
			link : url, // 分享链接
			imgUrl : shareImgUrl, // 分享图标
			type : 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl : '', // 如果type是music或video，则要提供数据链接，默认为空
			success : function() {
				// 用户确认分享后执行的回调函数、
				recordLog(1);
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});
		//------------"分享到朋友圈"
		wx.onMenuShareTimeline({
			title : shareTitle, // 分享标题
			desc : shareDesc, // 分享描述
			link : url, // 分享链接
			imgUrl : shareImgUrl, // 分享图标
			success : function() {
				// 用户确认分享后执行的回调函数
				recordLog(2);
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});
		//-------------分享到QQ
		wx.onMenuShareQQ({
			title : shareTitle, // 分享标题
			desc : shareDesc, // 分享描述
			link : url, // 分享链接
			imgUrl : shareImgUrl, // 分享图标
			success : function() {
				// 用户确认分享后执行的回调函数
				recordLog(3);
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});
		//-------------分享到QQ空间
		wx.onMenuShareQZone({
			title : shareTitle, // 分享标题
			desc : shareDesc, // 分享描述
			link : url, // 分享链接
			imgUrl : shareImgUrl, // 分享图标
			success : function() {
				// 用户确认分享后执行的回调函数
				recordLog(4);
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});
		//分享到腾讯微博
	   wx.onMenuShareWeibo({
		    title: shareTitle, // 分享标题
		    desc: shareDesc, // 分享描述
		    link: url, // 分享链接
		    imgUrl: shareImgUrl, // 分享图标
		    success: function () { 
		       // 用户确认分享后执行的回调函数
		    	recordLog(5);
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
	});
/* 微信分享 end */

//分享的时候记录日志的方法
function recordLog(shareType){
	if(!articleId) return false;
	$.ajax({
		type : "GET",
		url : "/mobileproject/goProjectDetail",
		data : {
			shareType : shareType,
			projectId : articleId
		},
		success : function(data) {
		  console.log("分享成功");
		}
	});
}