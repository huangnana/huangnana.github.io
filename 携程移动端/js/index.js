(function(){
	//组织默认行为
	document.addEventListener("touchstart",function(ev){
		ev.preventDefault();
	})
	document.addEventListener("touchmove",function(ev){
		ev.preventDefault();
	})
	// iscroll滚动条
	var xqScroll = new IScroll("#content",{
			scrollY: true,
			interactiveScrollbars:true,
			indicators:{
				el:wrap
			}
	})
	$(document).on("touchmove",function(){
		if($("#wrap").offset().top<-30){
			$("#head").css("background-color","#f3f8fe")
		}else{
			$("#head").css("background-color",null)
		}
		if($("#wrap").offset().top>5){
			$("#head").css("display","none")
		}else{
			$("#head").css("display","block")
		}
	})
	xqScroll.on("scrollEnd",function(){
		if($("#wrap").offset().top<-30){
			$("#head").css("background-color","#f3f8fe")
		}else{
			$("#head").css("background-color",null)
		}
			$("#head").css("display","block")
	})
	//图片自动切换
	var num = 0;
	var w = $(".con_ad li").width();
	var lis = $(".con_ad").find("li");
	lis.clone().appendTo($(".con_ad ul"));
	var lisLen = lis.length;
	var len = $(".con_ad img").length;
	var timer = null;
	var oriX = 0;
	autoMove();
	function autoMove(){
	timer =	setInterval(function(){
			num++;
			$(".con_ad ul").css("transition","1s")
			$(".con_ad ul").css("left",-w*num)
			if(num===(len-1)){
				setTimeout(function(){
					$(".con_ad ul").css("transition",null)
					num = lisLen-1;
					$(".con_ad ul").css("left",-w*num)
				},1000)
			}
			setTimeout(function(){
				if(num===len-1){
					num = lisLen-1;
				}
				$(".turn").removeClass("active").eq(num%lisLen).addClass("active");
			},500)
		},2500)
	}
	//滑屏换图片
	$(".con_ad ul").on("touchstart",function(ev){
		clearInterval(timer);
		oriX = ev.changedTouches[0].clientX;
		$(".con_ad ul").css("transition",null);
		if(num===0){
			num = lisLen;
			$(".con_ad ul").css("left",-w*num)
		}
		if(num===len-1){
			num = lisLen-1;
			$(".con_ad ul").css("left",-w*num);
		}
		var ulL = parseFloat($(".con_ad ul").css("left"))
		$(".con_ad ul").on("touchmove",function(ev){
			var nowX = ev.changedTouches[0].clientX;
			$(".con_ad ul").css("left",nowX-oriX+ulL)
		})
	})
	$(".con_ad ul").on("touchend",function(ev){
		var endX = ev.changedTouches[0].clientX;
		if(endX>oriX+w/3){
			num--
		}
		if(endX<oriX-w/3){
			num++
		}
		$(".con_ad ul").css("transition",".5s");
		$(".con_ad ul").css("left",-w*num);
		$(".turn").removeClass("active").eq(num%lisLen).addClass("active");
		$(".con_ad ul").off("touchmove")
		autoMove();
	})
})()
