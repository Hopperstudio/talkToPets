$(function() {
    var burger = $('#burger');
	var topbar = $('.topbar');
    var target = $('.links li, .mm-listview li');
    var url= window.location.toString(); //取得當前網址   
    var str=""; //參數中等號左邊的值   
    var str_value=""; //參數中等號右邊的值 
    var mobileWidth = 480;
    
    modal.getPickedCaseData();
    
    if (url.indexOf("?")!=-1) {  
        //如果網址有"?"符號  
        var ary=url.split("?")[1].split("&");
        //取得"?"右邊網址後利用"&"分割字串存入ary陣列 ["a=1","b=2","c=3"]   
        for(var i in ary){   
            //取得陣列長度去跑迴圈，如:網址有三個參數，則會跑三次   
            str=ary[i].split("=")[0];   
            //取得參數"="左邊的值存入str變數中   
            if (str == "id") {   
            //若str等於想要抓取參數   
              str_value = ary[i].split("=")[1]; 
            }   
        }   
    } 
    
    $(window).resize(function() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var caseWrapper = $('.case-wrapper');
        var bgfff = $('.bgfff');
        var bg000 = $('.bg000');
        caseWrapper.css({
            height: windowHeight,
            width: windowWidth
        });
        if (windowWidth > mobileWidth) {
            bg000.css({
                width: windowWidth * 0.4 + 'px',
                height: windowHeight
            });
            bgfff.css({
                width: windowWidth * 0.6 + 'px',
                height: windowHeight
            });
            utils.display._scrollBar({
                targetID: 'my-scroll',
                type: 'scrollbar-macosx',
                height: windowHeight * 0.5
            });
            
        } else {
            bg000.css({
                width: windowWidth,
                height: windowHeight * 0.4 + 'px'
            });
            bgfff.css({
                width: windowWidth,
                height: windowHeight * 0.6 + 'px'
            });
            utils.display._scrollBar({
                targetID: 'my-scroll',
                type: 'scrollbar-macosx',
                height: windowHeight * 0.3
            });
        }
        
    });
    
    $('#mm-blocker').on('mousedown', function() {
        burger.removeClass('mobile-menu-open');
		topbar.slideDown('slow');
    });
    
    $('.mm-close').click(function() {
        burger.removeClass('mobile-menu-open');
		topbar.slideDown('slow');
    });
    
    burger.click(function() {
        $(this).addClass('mobile-menu-open');
		topbar.slideUp('slow');
    });
    
    //綁nav click事件(定錨)
	target.off('click').on('click', function(ev) {
		ev.preventDefault(); //取消預設
		var clickID = $(this).prop('id'); //cache ID
		var url = 'http://122.147.176.133/talkToPets/?id=' + clickID;
        window.location = url;
        
	});
    
    /**** 滾輪後產生動畫(start) *****/
    //將要添加動畫的元素包成物件
    var $animationEle = [{
        "tagClass": "before_zoomIn",
        "offset": 20,
        "animationClass": "after_zoomIn"
    },{
        "tagClass": "before_enterFromBottom",
        "offset": 0,
        "animationClass": "after_enterFromBottom"
    }];
    
    //偵測滾輪事件
    $(window).scroll(function() {
        utils.roller._animationOfRoller($animationEle);
    });
    
    $(window).trigger('resize');
    
});