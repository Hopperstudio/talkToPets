$(function() {
    
    modal.getAllCaseData();
    
    var burger = $('#burger');
	var topbar = $('.topbar');
    var target = $('.links li, .mm-listview li');
    var content = $('.content-box');
    
    /**** 滾輪後產生動畫(start) *****/
    //將要添加動畫的元素包成物件
    var $animationEle = [{
        "tagClass": "before_enterFromBottom",
        "offset": 0,
        "animationClass": "after_enterFromBottom"
    }];

    //偵測滾輪事件
    $(window).scroll(function() {
        utils.roller._animationOfRoller($animationEle);
    });
    /**** 滾輪後產生動畫(end) *****/
    
    content.off('click').on('click', function() {
        var targetID = $(this).attr('data-id');
        var url = 'http://122.147.176.133/talkToPets/case.html?id=' + targetID;
        window.location = url;
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
    
    $(window).trigger('scroll');
    
});