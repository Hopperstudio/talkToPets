utils.display._loadingAnimation({
   animationSpeed: 1000, 
});


$(function() {
    
    var navLink = $('.links li');
    var mobileLink = $('.mm-listview li');
    var burger = $('#burger');
	var topbar = $('.topbar');
    var url= window.location.toString(); //取得當前網址   
    var str=""; //參數中等號左邊的值   
    var str_value=""; //參數中等號右邊的值 
    
    
    modal.getNewCaseData();
    
    if (url.indexOf("?")!=-1) {  
        //如果網址有"?"符號  
        var ary=url.split("?")[1].split("&"); 
        console.debug(ary);
        //取得"?"右邊網址後利用"&"分割字串存入ary陣列 ["a=1","b=2","c=3"]   
        for(var i in ary){   
            //取得陣列長度去跑迴圈，如:網址有三個參數，則會跑三次   
            str=ary[i].split("=")[0];   
            console.debug(str);
            //取得參數"="左邊的值存入str變數中   
            if (str == "id") {   
            //若str等於想要抓取參數   
              str_value = ary[i].split("=")[1]; 
              console.debug(str_value);
              var targetDiv = $('#' + str_value + 'Div');
              console.debug(targetDiv.prop('id'));
              utils.plugin._moveToTarget({
                    target: targetDiv,
                    speed: 1000
               });
            }   
        }   
    } 
    
    $('video').get(0).play(); 
    
	utils.display._popUp({
		btnId: 'more',
		modalTitle : "預約說明",
        modalBody : "<p id=\"pop\">預約前看這裡:<br>動物溝通是什麼？符合你的期待嗎？希望大家看看以下幾點再考慮要不要預約喔！謝謝: )<br><br>1.此為直覺式動物溝通，請不要刻意誤導或欺騙溝通師。對於動物溝通，目前個人覺得最科學的說法就是將其解釋成一種「頻率」，有些人為了測試溝通師，可能給出錯誤的訊息，誤導直覺，對頻率造成干擾，「信任」才能使頻率維持平穩的狀況；另外，也有人「短期」找了很多個溝通師想印證....哈囉~如果沒隔幾天就有不同的陌生人來問你早餐吃什麼，人都不一定有心情回答了，怎麼能要毛小孩每次都不發脾氣好好回答呢？ 所以，信任溝通師是很重要的，當然不是溝通師說什麼都對，遇到跟想像中不一樣的可以向溝通師發問，再向毛孩們問得更深入、或換個方式問，都不失為一種辦法。<br><br>2.毛小孩的智商可以達到5~8歲，小朋友會說謊，「毛小孩也會說謊」。這裡的說謊不是什麼嚴重的事情，可能是「才不想跟你這陌生人說呢！」、「好像很丟臉欸....跟他說我敢吃好了」、「好煩啊這個問題問了幾遍了！亂答好了！」等等，基於種種理由，給出錯誤的答案。<br><br>3.毛小孩看到的顏色、視角跟我們不同，對於物品名稱的認知有時也會不同，聽到不是想像中的答案時，先不要否定，我們可以一起抽絲剝繭「找線索」。<br><br>******目前尚未提供離世個案，提供時會告訴大家，謝謝！******</p>",
        modalFooter : ''
	});
	
    
    utils.display._popUp({
		btnId: 'more2',
		modalTitle : "聯絡我們",
        modalBody : "<p id=\"pop\">聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡聯絡</p>",
        modalFooter : ''
	});
	
		
	utils.display._scrollBar({
		targetID: 'pop',
		height: "300",
		type: 'scrollbar-macosx'
	});
    
    
    $('#mm-blocker').on('mousedown', function() {
        burger.removeClass('mobile-menu-open');
		topbar.slideDown('slow');
		$('video').css({
			width: '100%'
		});
    });
    
    $('.mm-close').click(function() {
        burger.removeClass('mobile-menu-open');
		topbar.slideDown('slow');
		$('video').css({
			width: '100%'
		});
    });
    
    burger.click(function() {
        $(this).addClass('mobile-menu-open');
		topbar.slideUp('slow');
		$('video').css({
			width: 'auto'
		});
    });
	
    mobileLink.off('click').on('click', function(ev) {
        ev.preventDefault();
        $('.mm-close').trigger('click');
        var clickID = $(this).prop('id'); //cache ID
		var targetID = $('#' + clickID + 'Div'); //設定目標位置
		//將目標位置及動畫時間傳入utils
		utils.plugin._moveToTarget({ 
			target: targetID,
			speed: 1000
		});
    });
    
    
	
	//綁nav click事件(定錨)
	navLink.off('click').on('click', function(ev) {
		ev.preventDefault(); //取消預設
		var clickID = $(this).prop('id'); //cache ID
		var targetID = $('#' + clickID + 'Div'); //設定目標位置
        console.debug(targetID.prop('id'));
		//將目標位置及動畫時間傳入utils
		utils.plugin._moveToTarget({ 
			target: targetID,
			speed: 1000
		});
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
    },{
        "tagClass": "flipY",
        "offset": 0,
        "animationClass": "after_flipInY"
    },{
        "tagClass": "before_enterFromTop",
        "offset": 0,
        "animationClass": "after_enterFromTop"
    }];

    //偵測滾輪事件
    $(window).scroll(function() {
        utils.roller._animationOfRoller($animationEle);
    });
    /**** 滾輪後產生動畫(end) *****/
    
            utils.plugin._textSlider({
            targetID: 'introduction-content',
            mobileWidth: 480,
            animationSpeed: 300,
            prev: {
                    width: '20px',
                    height: '20px',
                    color: '#fff',
                    topOffset: '40%',
                    leftOffset: '20px',
                    borderWidth: '3px'
                },
            next: {
                    width: '20px',
                    height: '20px',
                    color: '#fff',
                    topOffset: '40%',
                    rightOffset: '20px',
                    borderWidth: '3px'
            },
            mobileContent: [{
                title: '<h2>About</h2>',
                text: '<p>取名字總是一件令人困擾的事。無賴如我，決定把這難纏事丟給「別人」。</p><p>隨手拿起大天使神諭卡，心中想著：「請給我一點取名字的靈感吧！」結果抽到了大天使亞列爾的「富足」，卡片中亞列爾抱著「羊之角」，裡面裝滿了豐盛、富饒；另外，羊角也會被用來做號角，成為傳訊工具。</p><p>亞列爾堅毅又溫暖，是大自然動物的療癒天使，也可說是專門照護動物的天使。天使夫人朵琳曾在書中介紹：「大天使亞列爾是顯化奇蹟的大天使，與春天充滿希望的牡羊座同在。」</p>',
            },{
                title: '<h2>About</h2>',
                text: '<p>身為牡羊座又想做動物溝通服務的我，決定把這張牌當作天使的禮物──期許用動物溝通為橋梁，達到照護人與動物心靈的富足。<br>如果有什麼想告訴動物夥伴的話、想知道的事，就讓羊角傳聲筒幫你/妳一把，更了解我們的心頭肉吧。<br>謝謝你/妳願意點進來看看我與每個動物朋友的小故事，也歡迎你/妳來信預約，讓你的動物夥伴/家人，成為我成長之路的老師。</p>',
            }],
            content: [{
                title: '<h2>About</h2>',
                text: ' <p>取名字總是一件令人困擾的事。無賴如我，決定把這難纏事丟給「別人」。</p><p>隨手拿起大天使神諭卡，心中想著：「請給我一點取名字的靈感吧！」結果抽到了大天使亞列爾的「富足」，卡片中亞列爾抱著「羊之角」，裡面裝滿了豐盛、富饒；另外，羊角也會被用來做號角，成為傳訊工具。</p><p>亞列爾堅毅又溫暖，是大自然動物的療癒天使，也可說是專門照護動物的天使。</p><p>天使夫人朵琳曾在書中介紹：「大天使亞列爾是顯化奇蹟的大天使，與春天充滿希望的牡羊座同在。」</p><p>身為牡羊座又想做動物溝通服務的我，決定把這張牌當作天使的禮物──期許用動物溝通為橋梁，達到照護人與動物心靈的富足。</p><p>如果有什麼想告訴動物夥伴的話、想知道的事，就讓羊角傳聲筒幫你/妳一把，更了解我們的心頭肉吧。</p><p>謝謝你/妳願意點進來看看我與每個動物朋友的小故事，也歡迎你/妳來信預約，讓你的動物夥伴/家人，成為我成長之路的老師。</p>'
            }]
        }); 
    
        $(window).trigger('scroll');
    });