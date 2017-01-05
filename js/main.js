$(function() {
    //
    //animation loading
    utils.display._loadingAnimation({
        imgURL: 'img/loading3.png',
		animationSpeed:2000    
    });
    //
    //jquery Mobile Meun
    utils.plugin._jqueryMobileMeun({
        menuTitle: '羊角傳聲筒', //menuTitle
        menuId: 'my-meun', //menuID
        burgerId: 'burger', //收合按鈕ID
        transitionDuration: 5000, //css轉場時間(毫秒)
        //        position:"right",                           //選單位置
        slidingSubmenus: true, //子選單展開方式(false的話會往下長)
        add: false, //是否顯示menuTitle
        borderStyle: "border-none", //選單邊框樣式
        effectMenu: "effect-menu-zoom", //選單轉場效果
        effectPanels: "effect-panels-zoom", //子層選單轉場效果(要兩層以上
        effectListItems: "effect-listitems-slide", //選單選項效果
//		zposition: 'front',
        //        screen:"fullscreen",                        //是否全螢幕展開
        overflowText: "multiline", //是否允許多行文字(預設為單行 + ...)
        navbarsContent: ['prev', 'title', 'close'], //選單功能(上一層、下一層、關閉)
        maxLevel: ['level_1'], //紀錄有幾層(值:對照每一層的矩陣名稱)
        //以下各個矩陣代表每一層的內容, 其物件內容: 1.parentTitle代表此物件要塞進上一層的哪一個選項之title(第一層不用, 其餘層都要有) 2.此選項的title 3.此選項的url,選填 
        level_1: [{
            title: '首頁',
			url: '#',
			itemID: 'top'
        }, {
            title: '介紹',
			url: '#',
			itemID: 'introduction'
        }, {
            title: '個案分享',
            url: '#',
			itemID: 'case-sharing'
        }, {
            title: '預約須知',
            url: '#',
			itemID: 'contact'
        }]
    });
    
});