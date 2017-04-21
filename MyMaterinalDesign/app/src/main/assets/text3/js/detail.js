// JavaScript Document



//算剩余天数滚动条

function remaindayStyle(){

	$('.marks span').each(function(){

		var perce=$(this).children('em').first().attr('remaindays')/$(this).attr('sumdays');

		var per_onh=Math.round(perce*100)+'%';

		var coval=Math.round((perce-0.50)*100)+'%';

		if(perce>0.50){

			$(this).children('em').first().css({'background':'-webkit-linear-gradient(left, #4d97f8 '+coval+',#4fdfd6 50%)','width':per_onh});

		}

		else if(perce<=0.50){

			$(this).children('em').first().css({'background':'#4fdfd6','width':per_onh});	

		}

	}); 

}



$(function(){

	//算剩余天数滚动条

    remaindayStyle();

	//搜索页领域+价位

	$('.choreg a').click(function(){

		var ind=$(this).index();

		$('.choreg a').removeClass('curr');

		$(this).addClass('curr');

		$('.elpri').find('.spew').removeClass('shay').addClass('disn');

		$('.elpri').find('.spew').eq(ind).removeClass('disn').addClass('shay');

	});

	$('.spew a').click(function(){

		var ind=$(this).parent().index();

		var pava=$('.choreg').find('a').eq(ind);

		$(this).parent().removeClass('shay').addClass('disn');	

		$(this).parent().find('a').removeClass('curr');

		$(this).addClass('curr');

		pava.removeClass('curr');	

		pava.find('p').html($(this).html());

	});

	//点赞之后

	/* var bo=true;

	$('.foona a.agree').click(function(){

		if(bo){

			$('.foona a.agree').addClass('curr');	

			bo=false;

		}

		else{

			$('.foona a.agree').removeClass('curr');	

			bo=true;

		}

	}); */

	//设置密码显示

	var bo=true;

	$('.enro >p.npas a').click(function(){

		var paslay=$('.enro >p.npas').find('input');

		var valu=paslay.val();

		

		if(bo){

			$(this).addClass('curr');	

			paslay.attr('type','text');

			bo=false;

		}

		else{

			$(this).removeClass('curr');	

			paslay.attr('type','password');

			

			bo=true;

		}

		paslay.val(valu);

	});

	

	/*导航*/

	$('.nalo').height($(window).height());

	

	/*切换性别*/

	$('.sexcla a').click(function(){

		var ind=$(this).index()+1;

		if(ind==1){

			$('.sexcla a').removeClass('curr fem_01 fem_01h fem_02h');

			$(this).addClass("fem_01h curr");	

			$('.sexcla a:eq(1)').addClass('fem_02');

		}

		else{

			$('.sexcla a').removeClass('curr fem_01h fem_02h');

			$(this).addClass("fem_02h curr");

			$('.sexcla a:eq(0)').addClass('fem_01');

		}	

	});

	//项目详情——财务详情

	$('.report a').click(function(){

		var ind=$(this).index();

		

		$('.shinf').find('table').css('width','100%');

		$('.report a').removeClass('curr');

		$('.report').find('a').eq(ind).addClass('curr');

		$('.shinf .lay_01').removeClass('shay').addClass('disn');

		$('.shinf').find('.lay_01').eq(ind).removeClass('disn').addClass('shay');

		

	});

	//判断是否超过45固定定位

	 /*$(window).scroll(function(){

		if($(window).scrollTop()>45){

			$('.bainfo').addClass('hefixed');

		}	

		else{

			$('.bainfo').removeClass('hefixed');	

		}

	});*/

	/*点击删除提示*/

	$('a.del').click(function(){

		$('.message').fadeIn().delay(5000).fadeOut();

	});

	/*点击勾选*/

	var boc=true;

	$('.choice >a').click(function(){

		if(boc){

			$(this).addClass('curr');

			boc=false;	

		}	

		else{

			$(this).removeClass('curr');

			boc=true;	

		}

	});

	

	

	/* var perce=$('.marks span em').attr('remaindays')/$('.marks span').attr('sumdays');

	var coval=Math.round((perce-0.50)*100)+'%';

	if(perce>0.50){

		$('.marks span em').css("background",'-webkit-linear-gradient(left, #4d97f8 '+coval+',#4fdfd6 50%)');

	}

	else if(perce<=0.50){

		$('.marks span em').css("background","#4fdfd6");	

	} */

	//input点击的时候，给外层p加光标

	$('input').focus(function(){

		$(this).parents('p').css('border','1px solid #4f9bfd');	

	});

	$('input').blur(function(){

		$('form> p').css('border','1px solid #ccc');

	});

	//点击时候 高亮显示

	$('h3.basic a').click(function(){

		$('h3.basic a').removeClass('curr');

		$(this).addClass('curr');	

	});

	//搜索页focus高亮

	$('.indust input[type="text"]').focus(function(){

		$(this).attr('placeholder','您可以输入如“券商”“青岛”');

		$(this).addClass('curr');	

	});

	$('.indust input[type="text"]').blur(function(){

		$(this).attr('placeholder','您在寻找什么？');

		$(this).removeClass('curr');	

	});

	//设置查看更多浮层

	 $('.discov').height($(window).height()); 

	  $('.fiall').click(function(){

		 $('.discov').removeClass('disn').addClass('shay'); 

		 $('body').css('overflow','hidden'); 

	  });

	  $('a.closewi').click(function(){

		$('.discov').removeClass('shay').addClass('disn');

		$('body').css('overflow','visible'); 	  

	  });

	  //项目详情的高度

	  if($('.shopag p.mart').height()>189){

		 	$('a.fiall').removeClass('disn').addClass('shay'); 

		};

});