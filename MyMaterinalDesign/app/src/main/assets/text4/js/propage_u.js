// JavaScript Document
$(function(){
		/*点击基本信息展示*/
		var shala=true;
		$('.bainfo').click(function(e){
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
			var pa_fva=$('.indis h2[title='+na_fva+']').offset().top-90;			//基本信息么有固定定位
			var psi_fva=$('.indis h2[title='+na_fva+']').offset().top-50;			//基本信息固定定位之后
			$('.hidlay').find('a').removeClass('curr');
			$(this).addClass('curr');
			
			$('.bainfo >a').html($(this).html());
			
			if($('.bainfo').hasClass('hefixed')){
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
	var boci=true;
	$(window).scroll(function(){
		if($(window).scrollTop()>45){
			$('.bainfo').addClass('hefixed');
		}	
		else{
			$('.bainfo').removeClass('hefixed');	
		}
		
		
		for(var i=1;i<=6;i++){
			var one_v=$('.indis h2[title='+i+']').offset().top-$(window).scrollTop();	//判断元素到顶部的距离
			var new_v=$('.hidlay').find('a[title='+i+']');
			
			var tel_re=$('.teask').offset().top;
			var winhe=$(document).scrollTop()-130;
			var new_T=$('.telask').offset().top-window.screen.height;
			
			if(one_v<80){
				$('.hidlay').find('a').removeClass('curr');
				new_v.addClass('curr');
				$('.bainfo >a').html(new_v.html());	
				
				
			}
			
			//alert(new_T);
			//alert(new_T);
			//电话条显示居中1690
			if(winhe>new_T){
				$('.proje_01').removeClass('disn').addClass('teslide');
				$('.proje_01h,.balc').removeClass('shay').addClass('disn');
			}	
			else{
				$('.proje_01').removeClass('teslide').addClass('disn');
				$('.proje_01h,.balc').removeClass('disn').addClass('shay');	
			}
			
			
			
		}
		
	});