// JavaScript Document
$(function(){
		/*点击基本信息展示*/
		var shala=true;
		$('.regis').click(function(e){
			if(shala){
				$('.hidlay').removeClass('disn').addClass('shay');	
				$(this).find('span').addClass('curr');
				shala=false;	
			}
			else{
				$('.hidlay').removeClass('shay').addClass('disn');	
				$(this).find('span').removeClass('curr');
				shala=true;	
			}
			e.stopPropagation();
			
		});
		//基本信息隐藏选项卡点击
		var boci=true;
		$('.hidlay a').click(function(){
			var na_fva=$(this).attr('title');
			var pa_fva=$('.proctye h6[title='+na_fva+']').offset().top-90;			//基本信息么有固定定位
			var psi_fva=$('.proctye h6[title='+na_fva+']').offset().top-50;			//基本信息固定定位之后
			$('.hidlay').find('a').removeClass('curr');
			$(this).addClass('curr');
			
			$('.regis >a').html($(this).html());
			
			if($('.regis').hasClass('hefixed')){
				$('body,html').animate({scrollTop:psi_fva},1);
			}
			else{
				$('body,html').animate({scrollTop:pa_fva},1);		
			}
		});
		 $(document).bind('click', function(e) {  
			   $('.hidlay').removeClass('shay').addClass('disn');	
				shala=true;	  
		   });  
	});

$(window).scroll(function(){
		//判断是否超过45固定定位
		if($(window).scrollTop()>45){
			$('.bainfo').addClass('hefixed');
		}	
		else{
			$('.bainfo').removeClass('hefixed');	
		}
		//滚动条滑动的时候，根据滑到哪里定位当前元素
		for(var i=1;i<=8;i++){
			var one_v=$('.proctye h6[title='+i+']').offset().top-$(window).scrollTop();	//判断元素到顶部的距离
			var new_v=$('.hidlay').find('a[title='+i+']');
			if(one_v<60){
				$('.hidlay').find('a').removeClass('curr');
				new_v.addClass('curr');
				$('.bainfo >a').html(new_v.html());	
			}
		}	
});