//包好的元件
var utils = {

    //功能方面的元件
    plugin: {

        //錨點(移動到目標位置)
        _moveToTarget: function (obj) {
            //    var obj = {
            //           target : tag,
            //           speed : 1400
            //    };

            var target = obj.target; //目標位置的tag
            console.debug(target.prop('id'));
            console.debug($('#contactDiv').offset().top);
            var speed = obj.speed; //速度(毫秒)
            $('html,body').animate({
                scrollTop: target.offset().top
            }, speed);
            console.debug(target.offset().top);
        },

        //slider.
        _slider: function (obj) {
            //    var obj = {
            //           idOfSliderArea : id,
            //           dots: true,
            //           autoPlay : true,
            //           sliderSpeed : 2000,
            //           numberOfShow : 3,
            //           numberOfUpdate : 1,
            //           isDisplay : true,
            //           sliderImg: sliderImgArr,
            //           sliderTextArr: sliderTextArr
            //    };

            var idOfSliderArea = obj.idOfSliderArea; //slider的位置之id
            var dots = obj.dots; //slider的點(true/false)
            var autoPlay = obj.autoPlay; //是否要自動播放(true/false)
            var sliderSpeed = (obj.sliderSpeed == undefined) ? 0 : obj.sliderSpeed; //每次輪播的時間間隔(毫秒)
            var numberOfShow = (obj.numberOfShow == undefined) ? 1 : obj.numberOfShow; //一次顯示在輪播畫面中的張數
            var numberOfUpdate = (obj.numberOfUpdate == undefined) ? 1 : obj.numberOfUpdate; //輪播效果更新的張數
            var isDisplay = (obj.isDisplay == undefined) ? false : obj.isDisplay; //是否要展示大圖示(true/false)
            var sliderImgArr = (obj.sliderImgArr == undefined) ? [] : obj.sliderImgArr; //要顯示的圖之陣列(內容為html結構)
            var sliderTextArr = (obj.sliderTextArr == undefined || obj.sliderTextArr == '') ? '' : obj.sliderTextArr; //要顯示的文字之陣列(內容為html結構)

            //若是小網, 顯示的張數限制為一張
            if ($(window).width() < 768) {
                numberOfShow = 1;
            }

            //將要顯示的圖塞進html裡
            var sliderArea = $('#' + idOfSliderArea);
            var imgArr = [];
            var imgTextArr = [];
            $.each(sliderImgArr, function (index, value) {

                imgArr.push('<div><img src="' + value + '"></div>');

                if (sliderTextArr != '') {
                    var currentText = sliderTextArr[index];

                    if (currentText != undefined) {
                        imgTextArr.push('<div><img src="' + value + '">' + currentText + '</div>');
                    } else {
                        console.debug('sliderTextArr有誤');
                    }
                }
            });
            sliderArea.append(imgArr.join(''));

            //將slider中央的圖展示成大圖示
            if (isDisplay) {
                $('<section id="displayAreaOfSlider"></section>').insertBefore(sliderArea);

                var displayAreaOfSlider = $('#displayAreaOfSlider');
                displayAreaOfSlider.append(imgTextArr.join(''));

                sliderArea.slick({
                    dots: dots,
                    autoplay: autoPlay,
                    infinite: true, //無限輪播
                    autoplaySpeed: sliderSpeed,
                    centerMode: true,
                    slidesToShow: numberOfShow,
                    slidesToScroll: numberOfUpdate,
                    asNavFor: '#displayAreaOfSlider',
                    focusOnSelect: true
                });

                displayAreaOfSlider.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: '#' + idOfSliderArea
                });
            }
            //slider不用展示成大圖示
            else {
                //呼叫slick api長slider
                sliderArea.slick({
                    dots: dots,
                    autoplay: autoPlay,
                    infinite: true, //無限輪播
                    autoplaySpeed: sliderSpeed,
                    centerMode: true,
                    slidesToShow: numberOfShow,
                    slidesToScroll: numberOfUpdate
                });
            }
        },
        
        //
        //text slider
        
        
        _textSlider: function(obj) {
            /* 
                var obj = {
                    targetID: 要套用sroll目標之ID
                    animationSpeed: 動畫速度(slider速度及pagging轉場時間)
                    mobileWidth: 小網視窗寬度
                    mobileContent: [{
                        title: 小網標題(html code),
                        text: 小網內文(html code)
                    },{
                        title: 小網標題(html code),
                        text: 小網內文(html code)
                    },{
                        more...(有幾層就有幾頁slider)
                    }],
                    content: [{
                        title: 大網標題(html code),
                        text: 大網內文(html code)
                    },{
                        more...(有幾層就有幾頁slider)
                    }]
                    
                }
            */
            var targetID = $('#' + obj.targetID);
            var animationSpeed = (obj.animationSpeed == undefined) ? 1000 : obj.animationSpeed;
            var mobileWidth = (obj.mobileWidth == undefined) ? 768 : obj.mobileWidth;
            var mobileContent = obj.mobileContent;
            var mobileArrLength = mobileContent.length;
            var content = obj.content;
            var contentArrLength = content.length;
            var prev = obj.prev;
            var next = obj.next;
            var status; //判定大小網
            var current = 1; //判定目前層數
            var wrapper = '<div class="text-slider-wrapper textwrapper"></div>';
            var mobileWrapper = '<div class="text-slider-mobile-wrapper textwrapper"></div>';
            var pagging = '<a href="#" class="text-slider-prev sliderbtn"></a><a href="#" class="text-slider-next sliderbtn"></a>';
            
            /* 剛載入網頁時，先判斷當前大小網 設定status參數 */
            if ($(window).width() > mobileWidth) {
                status = true;
            } else {
                status = false;
            }
            
            /* 
                overflow: 'hidden'(為了呈現slider效果)
                position: 'relative'(pagging定位用)
            */
            
            targetID.css({
                overflow: 'hidden',
                position: 'relative'
            });
            
            
            /*  
                如果content != undefined 
                將wrapper塞進target內 並跑each將content依序塞進$('.text-slider-wrapper')內 
            */
            
            if (content != undefined) {
                targetID.append(wrapper);
                $.each(content, function(index, value) {
                    var inner = '<div class=innerwrapper>' + value.title + value.text + '</div>';
                    $('.text-slider-wrapper').append(inner);
                }); 
                
            }
            
            /* 
                如果mobileContent != undefined 
                將mobileWrapper塞進target內 並跑each將content依序塞進$('.text-slider-mobile-wrapper')內
            */
            
            if (mobileContent != undefined) {
                targetID.append(mobileWrapper);
                $.each(mobileContent, function(index, value) {
                    var inner = '<div class=innerwrapper>' + value.title + value.text + '</div>';
                    $('.text-slider-mobile-wrapper').append(inner);
                });
            }
            
            
            
            targetID.append(pagging); // 將pagging塞進target內
            
            var container = $('.text-slider-wrapper');
            var mobileContainer = $('.text-slider-mobile-wrapper');
            
            /*
                設定window resize event 
            */
            
            $(window).resize(function() {
                /* 
                    windowWidth = 當前螢幕寬度
                    targetHeight = target元素高度
                    targetWidth = target元素寬度
                */
                var windowWidth = $(window).width();
                var targetHeight = targetID.height();
                var targetWidth = targetID.width();
                /*
                    設定wrapper元素寬高
                    height: target高度
                    width: target寬度 * 陣列長度(層數)
                */
                container.css({
                    height: targetHeight,
                    width: targetWidth * contentArrLength,
                    position: 'relative'
                });
                mobileContainer.css({
                    height: targetHeight,
                    width: targetWidth * mobileArrLength,
                    position: 'relative'
                });
            
                $('.innerwrapper').css({
                    height: "inherit",
                    width: targetWidth,
                    float: 'left'
                });
                
                if (windowWidth > mobileWidth) {//大小網判斷
                    container.show().css({ 
                        marginLeft: -((current - 1) * targetWidth) + 'px'
                    });
                    mobileContainer.hide();//大網時將小網結構hide
                    /*
                        如果content陣列長度為1(只有一層) or undefined(沒傳資料)
                        pagging hide
                        
                        如果有傳入資料且不只一層 則顯示pagging並隱藏上一頁(第一層用不到)
                    */
//                    if (contentArrLength == 1 || contentArrLength == undefined) {
//                        $('.sliderbtn').hide();
//                    } else {
//                        $('.sliderbtn').show();
//                        prevBtn.hide();
//                        alert('aaa');
//                    }
                    
                    /*
                        如果status為false 代表狀態改變(小網變大網)
                        將marginLeft重置(回到第一層)
                    */
                    
                    if (!status) {
                        container.css({
                           marginLeft: 0 
                        });
                        current = 1;
                        status = true;
                    }
                    
                    buttonStatus(contentArrLength); //將大網層數傳入function
                    
                } else { // 小網
                    container.hide(); //隱藏大網結構
                    mobileContainer.show().css({
                        marginLeft: -((current-1) * targetWidth) + 'px'
                    });
                    
                    /*
                        如果mobileArrLength陣列長度為1(只有一層) or undefined(沒傳資料)
                        pagging hide
                        
                        如果有傳入資料且不只一層 則顯示pagging並隱藏上一頁(第一層用不到)
                    */
//                    
//                    if (mobileArrLength == 1 || mobileArrLength == undefined) {
//                        $('.sliderbtn').hide();
//                    } else {
//                        $('.sliderbtn').show();
//                        prevBtn.hide();
//                        alert('bbb');
//                    }
                    
                    /*
                        如果status為true 代表狀態改變(大網變小網)
                        將marginLeft重置(回到第一層)
                    */
                    
                    buttonStatus(mobileArrLength); //將小網層數傳入function
                    
                    if (status) {
                        mobileContainer.css({
                           marginLeft: 0 
                        });
                        current = 1;
                        status = false;
                    }
                }
            });
            
            var nextBtn = $('.text-slider-next');
            var prevBtn = $('.text-slider-prev');
            
            /*
                (以nextBtn為例)
                pagging css({
                    display: 'block'(固定值無法改變)
                    position: 'absolute'(固定值無法改變)
                    top: 'next.topOffset'(top偏移量)
                    right: 'next.rightOffset'(right偏移量)
                    width: 'next.width'(元素寬度)
                    height: 'next.height'(元素高度)
                    borderColor: 'next.color(箭頭顏色)'
                    borderWidth: 'next.borderWidth(箭頭粗細)'
                    borderStyle: 'solid' (目前固定為solid)
                    trasform: 'rotate(-45deg)' (固定值無法改變)
                    borderLeft: 'none' (固定值無法改變)
                    borderTop: 'none' (固定值無法改變)
                });
            */
            nextBtn.css({
                display: 'block',
                position: 'absolute',
                top: next.topOffset,
                right: next.rightOffset,
                width: next.width,
                height: next.height,
                borderColor: next.color,
                borderWidth: next.borderWidth,
                borderStyle: 'solid',
                transform: "rotate(-45deg)",
                borderLeft: 'none',
                borderTop: 'none',
            });
            
            /*
                同nextBtn!!!!
                同nextBtn!!!!
                同nextBtn!!!!
                同nextBtn!!!!
                同nextBtn!!!!
            */
            prevBtn.css({
                position: 'absolute',
                top: prev.topOffset,
                left: prev.leftOffset,
                width: prev.width,
                height: prev.height,
                borderColor: prev.color,
                borderWidth: prev.borderWidth,
                borderStyle: "solid",
                transform: 'rotate(-45deg)',
                borderRight: 'none',
                borderBottom: 'none'
            });
            
            
            nextBtn.off('click').on('click', function(ev) { // 上一頁 click event
                ev.preventDefault(); 
                var targetWidth = targetID.width(); //當前target寬度
                var windowWidth = $(window).width(); //當前視窗寬度
                if (windowWidth > mobileWidth) { //大網
                    container.animate({ //設定動畫
                        /*
                            marginLeft = -(當前層數 - 1) * target寬度 - target寬度 + 'px'
                        */
                        marginLeft: -(current - 1) * targetWidth - targetWidth + 'px'
                    }, animationSpeed);
                    current ++; //層數+1
                    buttonStatus(contentArrLength); //將大網層數傳入function
                } else { //小網 (跟大網一樣)
                    mobileContainer.animate({
                        marginLeft: -(current - 1) * targetWidth - targetWidth + 'px'
                    }, animationSpeed);
                    current ++; //層數+1
                    buttonStatus(mobileArrLength); //將小網層數傳入function
                }
            });
            
            prevBtn.off('click').on('click', function(ev) { //下一頁 click event
                ev.preventDefault();
                var targetWidth = targetID.width(); //當前target寬度
                var windowWidth = $(window).width(); //當前視窗寬度
                if (windowWidth > mobileWidth) { //大網
                    container.animate({
                        marginLeft: -(current - 1) * targetWidth + targetWidth + 'px'
                    }, animationSpeed);
                    current --; //層數-1
                    buttonStatus(contentArrLength); //將大網層數傳入function
                } else { //小網
                    mobileContainer.animate({
                        marginLeft: -(current - 1) * targetWidth + targetWidth + 'px'
                    }, animationSpeed);
                    current --; //層數-1
                    buttonStatus(mobileArrLength); //將小網層數傳入function
                }
            });
            
            //此函式用來判定前後箭頭是否需要隱藏
            function buttonStatus (length) {
                if (length != undefined && length != 1) {
                    if (current == 1) {
                        prevBtn.hide();
                        nextBtn.fadeIn();
                    } else if (current == length) {
                        prevBtn.fadeIn();
                        nextBtn.hide();
                    } else {
                        nextBtn.fadeIn();
                        prevBtn.fadeIn();
                    }  
                } else {
                    prevBtn.hide();
                    nextBtn.hide();
                }
            }
            /*
                trigger resize
                用來判定大小網初始值 以及設定動態元素寬高
            */
            
            $(window).trigger('resize');
            
        },
        
        
        //
        //google map
        _showGoogleMap: function (obj) {
            //    var obj = {
            //        address: addrInput,
            //        mapAreaId: 'mapArea',
            //        dialogContent: '<div><div>標題</div><div>內文</div></div>',  
            //        zoom: 13   
            //    };

            var addr = obj.address; //輸入的地址
            var mapAreaId = obj.mapAreaId; //要顯示google map的位置之id
            var dialogContent = (obj.dialogContent == '' || obj.dialogContent == undefined) ? '' : obj.dialogContent; //提示框的內容(html)
            var zoom = obj.zoom; //地圖縮放程度

            var geocoder = new google.maps.Geocoder(); //定義一個Geocoder物件   
            geocoder.geocode({
                    address: addr
                }, //設定地址的字串   
                function (results, status) { //callback function   
                    console.debug(status);
                    console.debug(results);
                    if (status == google.maps.GeocoderStatus.OK) { //判斷狀態   
                        var $lat = results[0].geometry.location.lat(); //經度
                        var $lng = results[0].geometry.location.lng(); //緯度 

                        showGoogleMap($lat, $lng); //藉由經緯度產生google map

                    } else {
                        alert('輸入的地址有誤');
                    }
                }
            );

            //產生google map
            function showGoogleMap(lat, lng) {
                //初始畫一個LatLng物件(位置的物件，須以經緯度為參數加入)
                var latlng = new google.maps.LatLng(lat, lng);
                var mapOptions = {
                    center: latlng, //目前地圖中央的位置(須放置LatLng物件)
                    zoom: zoom //地圖縮放程度
                };
                //設定Google Map會檢視的dom
                var map = new google.maps.Map(document.getElementById(mapAreaId), mapOptions);

                //如果有輸入提示框內容才要顯示提示框
                if (dialogContent != '') {
                    //設定地圖標記提示框中的html內容
                    var contentString = dialogContent;

                    //建立一個地圖標記提示框
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString //提示框中的內容
                    });

                    //檢視(open)提示框並指向map物件裡的marker標記點
                    infowindow.open(map, marker);
                }

                //建立一個marker物件(地圖標記點)
                var marker = new google.maps.Marker({
                    map: map, //指定要放置標記的dom
                    position: latlng //指定識別標記的初始位置
                });
            }
        },

        //datepicker
        _datepicker: function (obj) {
            //    var obj = {
            //           calendarInput: tag,
            //           disableWeekends: false,
            //           hasImgBtn: true,
            //           imgBtnUrl: '../img/calendar.gif',
            //           showOn: '',
            //           secondDatepicker: tag
            //    };

            var calendarInput = obj.calendarInput; //產生datepicker的tag
            var disableWeekends = (obj.disableWeekends == false) ? '' : $.datepicker.noWeekends; //決定要不要取消選取週末(true/false)
            var hasImgBtn = (obj.hasImgBtn == true) ? true : false; //要不要顯示image button(true/false)
            var imgBtnUrl = (obj.imgBtnUrl == '') ? '' : obj.imgBtnUrl; //image button的url
            var showOn = (obj.hasImgBtn == true) ? 'both' : 'focus'; //決定觸發顯示datepicker的是哪一個('focus':輸入框; 'button':圖示按鈕; 'both':兩者)
            var secondDatepicker = (obj.secondDatepicker == undefined || obj.secondDatepicker == '') ? '' : obj.secondDatepicker; //另一個input的tag

            //若有傳另一個input的tag, 預設先隱藏起來
            if (secondDatepicker != '') {
                secondDatepicker.hide();
            }

            //產生datepicker
            calendarInput.datepicker({
                dateFormat: "yy-mm-dd", //顯示的格式
                showOtherMonths: true, //顯示上下個月的日期, 但是不可選
                firstDay: 7, // Start with Sunday
                //showAnim: "explode", //出現的動畫
                beforeShowDay: disableWeekends, //disable weekends.
                showOn: showOn, //決定觸發顯示datepicker的是哪一個(focus:輸入框; button:圖示按鈕; both:兩者)
                buttonImageOnly: hasImgBtn, //要不要顯示image button
                buttonImage: imgBtnUrl, //image button的url
                onSelect: function (dateText, inst) { //選完日期後的行為(callback)
                    console.debug(dateText);
                    console.debug(inst);

                    //若有傳另一個input的tag
                    //表示要呼叫setSecondDatepicker的function
                    if (secondDatepicker != '') {
                        secondDatepicker.show(); //顯示另一個input的tag
                        setSecondDatepicker(dateText, secondDatepicker);
                    }
                }
            });

            //第一個datepicker的日期不可晚於第二個datepicker的日期
            //第二個datepicker的日期不可早於第一個datepicker的日期
            function setSecondDatepicker(dateText, secondDatepicker) {
                var datePicked = new Date(dateText);
                datePicked.setDate(datePicked.getDate());
                var dd = datePicked.getDate(); //日
                var mm = datePicked.getMonth() + 1; //月
                var yy = datePicked.getFullYear(); //年
                var dtFormatted = yy + '-' + mm + '-' + dd;
                console.debug('from' + dtFormatted);
                secondDatepicker.datepicker("option", "minDate", dtFormatted); //第二個datepicker加上minDate

                //產生第二個datepicker
                secondDatepicker.datepicker({
                    dateFormat: "yy-mm-dd", //顯示的格式
                    showOtherMonths: true, //顯示上下個月的日期, 但是不可選
                    firstDay: 7, // Start with Sunday
                    //showAnim: "explode", //出現的動畫
                    minDate: dateText,
                    beforeShowDay: disableWeekends, //disable weekends.
                    showOn: showOn, //決定觸發顯示datepicker的是哪一個(focus:輸入框; button:圖示按鈕; both:兩者)
                    buttonImageOnly: hasImgBtn, //要不要顯示image button
                    buttonImage: imgBtnUrl, //image button的url
                    onSelect: function (dateText, inst) { //選完日期後的行為(callback)
                        console.debug(dateText);
                        console.debug(inst);

                        var datePicked = new Date(dateText);
                        datePicked.setDate(datePicked.getDate());
                        var dd = datePicked.getDate(); //日
                        var mm = datePicked.getMonth() + 1; //月
                        var yy = datePicked.getFullYear(); //年
                        var dtFormatted = yy + '-' + mm + '-' + dd;
                        console.debug('to' + dtFormatted);
                        calendarInput.datepicker("option", "maxDate", dtFormatted); //第一個datepicker加上minDate
                    }
                });
            }
        },

        //calendar
        _generateCalender: function (obj) {
            //    var obj = {
            //           calendarArea : calendarArea,
            //           eventsArr : eventsArr
            //           canEdit : canEdit   
            //    };

            var calendarArea = obj.calendarArea; //顯示日曆的tag
            var eventsArr = obj.eventsArr; //顯示在日曆上的事件之array
            var canEdit = obj.canEdit; //事件是否可編輯,可編輯是指可移動或改變大小等(true/false)

            calendarArea.fullCalendar({
                schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
                header: {
                    left: 'prev, next, today',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                },
                //defaultDate: '2016-09-12',   //預設日期 
                editable: canEdit, //事件是否可編輯,可編輯是指可移動或改變大小等
                handleWindowResize: true, //隨瀏覽器窗口大小變化而自動變化
                eventLimit: true, //如果事件太多, 可以點選more看其他未顯示出來的事件
                events: eventsArr, //顯示在日曆上的事件
                dayClick: function (date, jsEvent, view) { //點擊某一天後的行為(callback)
                    console.debug('Clicked on: ' + date.format());
                    var $this = $(this);
                    calendarArea.fullCalendar('renderEvent', { //提供事件
                        title: 'TITLE',
                        start: date,
                        allDay: true
                    }, true);
                },
                eventClick: function (event, element) { //點擊某一事件就會觸發
                    event.title = "CLICKED!";
                    calendarArea.fullCalendar('updateEvent', event); //更新事件
                },
            });
        },

        //mobile menu
        _jqueryMobileMeun: function (obj) {
            //    var obj = {
            //           menuTitle : 'menu',
            //           menuId : 'my-meun',
            //           burgerId : 'burger',  
            //           transitionDuration : 5000,    
            //           slidingSubmenus : true,   
            //           add : true,
            //           borderStyle : "border-none",   
            //           effectMenu:"effect-menu-zoom",
            //           effectPanels:"effect-panels-zoom", 
            //           effectListItems:"effect-listitems-slide",
            //           screen:"fullscreen",     
            //           overflowText:"multiline",   
            //           zposition : ????   
            //           navbarsContent:['prev','title','close'],   
            //           maxLevel:[],   
            //           item : []   
            //    };

            var menuTitle = obj.menuTitle; //menuTitle
            var menuId = obj.menuId; //menuID
            var burgerId = obj.burgerId; //收合按鈕ID
            var transitionDuration = obj.transitionDuration; //css轉場時間(毫秒)
            var position = obj.position; //選單位置
            var slidingSubmenus = obj.slidingSubmenus; //子選單展開方式(true/false)(false的話會往下長)
            var add = obj.add; //是否顯示menuTitle
            var borderStyle = obj.borderStyle; //選單邊框樣式
            var effectMenu = obj.effectMenu; //選單轉場效果
            var effectPanels = obj.effectPanels; //子層選單轉場效果(要兩層以上
            var effectListItems = obj.effectListItems; //選單選項效果
            var screen = obj.screen; //是否全螢幕展開
            var overflowText = obj.overflowText; //是否允許多行文字(預設為單行 + ...)
            var zposition = obj.zposition;
            var navbarsContent = obj.navbarsContent; //選單功能(上一層、下一層、關閉)
            var maxLevel = obj.maxLevel; //最多有幾層(array:存放每一層的物件)
            var containerOfMMenu = ""; //內容
            var wrap = $('<div><ul class="mm-panel-1"></ul></div>').attr('id', menuId);
            wrap.appendTo($('body'));
            var mmPanel = $('.mm-panel-1');
            var removeATag = []; //若第一層的某選項沒有第二層, 則將其預設會長的a tag拿掉
            var menuArea = $('#' + menuId); //mmenu
            var $html = $('html, body');
            var lastParent = []; //存放目前的title, 供下一層找parent用
            //總共有幾層
            $.each(maxLevel, function (indexOfMaxLevel, valueOfMaxLevel) {
                var currentLevel = eval('obj.' + valueOfMaxLevel);

                //第一層
                if (indexOfMaxLevel == 0) {
                    //塞第一層內容
                    $.each(currentLevel, function (indexOfCurrentLevel, ObjectOfCurrentLevel) {
                        var currentParentTitle = (ObjectOfCurrentLevel.parentTitle == undefined || ObjectOfCurrentLevel.parentTitle == null) ? '' : ObjectOfCurrentLevel.parentTitle; //上一層title
                        var currentTitle = (ObjectOfCurrentLevel.title == undefined || ObjectOfCurrentLevel.title == null) ? '' : ObjectOfCurrentLevel.title; //title
                        var currentUrl = (ObjectOfCurrentLevel.url == undefined || ObjectOfCurrentLevel.url == null) ? '#' : ObjectOfCurrentLevel.url; //url
                        var currentID = (ObjectOfCurrentLevel.itemID == undefined || ObjectOfCurrentLevel.itemID == null) ? "" : ObjectOfCurrentLevel.itemID;
                        //若array中還未存放此title, 則push進array中
                        if (lastParent.indexOf(currentTitle) == -1) {
                            lastParent.push(currentTitle);
                        }

                        //若無輸入URL
                        if (currentUrl == '#') {
                            containerOfMMenu += '<li id="' + ObjectOfCurrentLevel.itemID + '" class=item' + indexOfCurrentLevel + ' title="' + currentTitle + '"><span>' + currentTitle + '</span></li>';
                        }
                        //若有輸入URL
                        else {
                            containerOfMMenu += '<li id="' + ObjectOfCurrentLevel.itemID + '" class="item' + indexOfCurrentLevel + '" title="' + currentTitle + '"><a href="' + currentUrl + '"><span>' + currentTitle + '</span></a></li>';
                        }

                        //最後將內容轉成html結構塞進ul結構中
                        if (indexOfCurrentLevel == currentLevel.length - 1) {
                            mmPanel.html(containerOfMMenu);
                            containerOfMMenu = '';
                        }
                    });
                }
                //第一層以外
                else {
                    lastParent = setContentToParent(currentLevel, lastParent);
                    console.debug(lastParent);
                }
            });

            //call mmenu api
            menuArea.mmenu({
                "extensions": [
                    borderStyle,
                    effectMenu,
                    effectPanels,
                    effectListItems,
                    screen,
                    overflowText,
                ],
                "slidingSubmenus": slidingSubmenus,
                "offCanvas": {
                    zposition: zposition,
                },
                navbar: {
                    title: menuTitle,
                    "add": add,
                },
                navbars: [{
                    position: 'top',
                    content: navbarsContent,
                }]
            }, {
                transitionDuration: transitionDuration,
            });

            //按了按鈕後會展開mmenu
            var API = $('#' + menuId).data('mmenu');
            var mmenuBtn = $('#' + burgerId);
            mmenuBtn.off('click').on('click', function () {
                API.open();
            });

            //塞第一層以外的內容
            function setContentToParent(contentPerLevel, lastParent) {
                console.debug(contentPerLevel);
                console.debug(lastParent);
                var contentArr = [];
                var parentArr = [];

                $.each(contentPerLevel, function (index, obj) {
                    var parentTitle = obj.parentTitle;
                    var title = obj.title;
                    var url = (obj.url == undefined) ? '#' : obj.url;
                    var contentTemp = '';
                    var macthIndex = lastParent.indexOf(parentTitle);

                    //若沒有輸入URL
                    if (url == '#') {
                        contentTemp += '<li class="item' + index + '" title="' + title + '"><span>' + title + '</span></li>';
                    }
                    //若有輸入URL
                    else {
                        contentTemp += '<li class="item' + index + '" title="' + title + '"><a href="' + url + '"><span>' + title + '</span></a></li>';
                    }

                    //將內容塞進array中
                    if (macthIndex != -1) {
                        if (contentArr[macthIndex] != undefined) {
                            contentArr[macthIndex] = contentArr[macthIndex] + contentTemp;
                        } else {
                            contentArr[macthIndex] = contentTemp;
                        }
                    }

                    //記錄title, 供下一層找parent用
                    if (parentArr.indexOf(title) == -1) {
                        parentArr.push(title);
                    }
                });

                $.each(contentArr, function (index, value) {

                    if (value != undefined) {
                        var subItem = $('<ul></ul>').html(value);
                        var parentTag = $('[title="' + lastParent[index] + '"]');

                        parentTag.append(subItem);
                    }
                });

                console.debug(contentArr);
                console.debug(parentArr);

                return parentArr;
            }
        }
    },

    //顯示方面的元件
    display: {

        //彈跳視窗
        _popUp: function (obj) {
            //    var obj = {
            //           btnId : 'popupBtn',
            //           modalTitle : modalTitle,
            //           modalBody : modalBody,
            //           modalFooter : modalFooter
            //    };

            var btnId = obj.btnId; //按了會彈跳視窗的按鈕之id
            var modalTitle = obj.modalTitle; //彈跳視窗的title(純字串)
            var modalBody = obj.modalBody; //彈跳視窗的內容(字串內容為html結構)
            var modalFooter = obj.modalFooter; //彈跳視窗的footer(字串內容為html結構)

            var modalId = btnId + '_modal';

            var popupBtn = $('#' + btnId);
            popupBtn.attr('data-toggle', 'modal');
            popupBtn.attr('data-target', '#' + btnId + '_modal');

            $('<div class="modal fade" id="' + modalId + '" role="dialog">' + '<div class="modal-dialog">' + '<!-- Modal content-->' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal">&times;</button>' + '<h4 class="modal-title">' + modalTitle + '</h4>' + '</div>' + '<div class="modal-body">' + modalBody + '</div>' + '<div class="modal-footer">' + '<!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->' + modalFooter + '</div>' + '</div>' + '</div>' + '</div>').appendTo($('body'));


        },

        //分頁
        _paging: function (obj) {
            //    var obj = {
            //           pageInfo: pageInfo,   //分頁資料(包含總頁數totalPage, 當前頁碼currentPage)
            //           pageDiv: tag,       //分頁的div
            //           getPageInfoCallBackFn : function(){}  //點分頁後要的function(會自動傳page參數)
            //    };

            var getPageInfoCallBackFn = (obj.getPageInfoCallBackFn == undefined) ? '' : obj.getPageInfoCallBackFn;
            var pageDiv = obj.pageDiv;
            var totalPage = obj.pageInfo.totalPage;
            var currentPage = obj.pageInfo.currentPage;
            var pageNumberDiv = $('<div class="page_control"></div>').appendTo(pageDiv);
            var pageAreaArray = [];
            var pageNumberArray = [];

            //若分頁數超過10頁,則要長"上一頁"和"下一頁"
            if (totalPage > 10) {
                pageAreaArray.push('<a href="#" rel="prev" class="pageControl prev">上一頁</a>' +
                    '<ul class="pageControl pageNumber"></ul>' +
                    '<a href="#" rel="next" class="pageControl next">下一頁</a>');

            }
            //否則就不用長"上一頁"和"下一頁"
            else {
                pageAreaArray.push('<ul class="pageNumber"></ul>');

            }
            pageNumberDiv.empty();
            pageNumberDiv.append(pageAreaArray.join(''));

            var pageNumberUL = pageDiv.find('.pageNumber'); //放分頁數字的UL元素

            //長page的數字
            for (var n = 1; n <= totalPage; n++) {
                //console.debug(n);
                pageNumberArray.push('<li class="numberOfPage" id="number' + n + '"><a href="#">' + n + '</a></li>');
            }

            pageNumberUL.append(pageNumberArray.join(''));
            var numberOfPage = pageDiv.find('.numberOfPage'); //放分頁數字的LI元素

            var showNumberObj = {
                target: pageDiv,
                totalPage: totalPage,
                index: currentPage,
                preNumber: (currentPage - 5),
                nextNumber: (totalPage - (currentPage + 4)),
                indexNumber: currentPage
            }
            showNumber(showNumberObj);

            //按分頁數字時的事件
            numberOfPage.off('click').on('click', function (ev) {
                ev.preventDefault();

                var $this = $(this);
                console.debug($this);
                var index = $this.find('a').text(); //按的分頁數字
                console.debug(index);
                var dataArray = [];
                var indexNumber = parseInt(index);
                var preNumber = indexNumber - 5; //判斷當前頁面前面是否還有五頁以上
                var nextNumber = totalPage - (indexNumber + 4); //判斷當前頁面後面是否還有4頁以上

                pageDiv.empty();
                getPageInfoCallBackFn(index);

                if (totalPage > 10 && indexNumber > 5) {
                    pageNumberUL.find('.numberOfPage').each(function () {
                        var num = parseInt($(this).text());
                        if (num < preNumber) {
                            $(this).hide();
                        }
                    });
                } else if (totalPage > 10 && indexNumber <= 5) {
                    pageNumberUL.find('.numberOfPage').each(function () {
                        var num = parseInt($(this).text());
                        if (num > 10) {
                            $(this).hide();
                        }
                    });
                }

                var showNumberObj = {
                    target: pageDiv,
                    totalPage: totalPage,
                    index: index,
                    preNumber: preNumber,
                    nextNumber: nextNumber,
                    indexNumber: indexNumber
                }
                showNumber(showNumberObj);

                pageNumberUL.find('#number' + indexNumber).show();

                //先將全部頁面的數字的active拿掉, 再將當下頁面的數字加上active
                numberOfPage.removeClass('active');
                $this.addClass('active');
            });

            //按上一頁
            pageDiv.find('.prev').off('click').on('click', function (ev) {
                ev.preventDefault();

                var activePage = 0;

                $.each(numberOfPage, function (index, ele) {
                    var ele = $(ele);
                    if (ele.hasClass('active')) {
                        console.debug(index);
                        activePage = parseInt(ele.children().text()) - 1; //index;
                    }
                })

                pageNumberUL.find('#number' + activePage).trigger('click');
            });

            //按下一頁
            pageDiv.find('.next').off('click').on('click', function (ev) {
                ev.preventDefault();

                var activePage = 0;

                $.each(numberOfPage, function (index, ele) {
                    var ele = $(ele);
                    if (ele.hasClass('active')) {
                        console.debug(index, ele, ele.children().text());
                        activePage = parseInt(ele.children().text()) + 1; //index + 2;
                    }
                })
                pageNumberUL.find('#number' + activePage).trigger('click');
            });

            $(window).resize(function () {
                var window_w = $(window).width();

                if (window_w < 769) {
                    pageDiv.find('.prev, .next').text('');
                } else {
                    pageDiv.find('.prev').text('上一頁');
                    pageDiv.find('.next').text('下一頁');
                }
            });
            $(window).resize();

            //長分頁的數字
            function showNumber(showNumberObj) {
                var target = showNumberObj.target;
                var totalPage = showNumberObj.totalPage;
                var index = showNumberObj.index;
                var preNumber = showNumberObj.preNumber;
                var nextNumber = showNumberObj.nextNumber;
                var indexNumber = showNumberObj.indexNumber;

                //先隱藏全部的分頁數字
                for (var k = 1; k <= totalPage; k++) {
                    target.find('#number' + k).hide();
                }

                //若分頁大於10, 則需要多判斷何時隱藏"上一頁"或"下一頁"
                if (totalPage > 10) {
                    var totalPageString = '' + totalPage;

                    if (index == '1') { //若當前頁是在第一頁, 則隱藏"上一頁"
                        target.find('.prev').hide();
                        target.find('.next').show();
                    } else if (index == totalPage) { //若當前頁是在最後一頁, 則隱藏"下一頁"
                        target.find('.next').hide();
                        target.find('.prev').show();
                    } else {
                        target.find('.prev').show();
                        target.find('.next').show();
                    }

                    //若當前頁面前面沒有五頁以上,則顯示1~10頁的數字
                    if (preNumber <= 0) {
                        for (var j = 1; j <= 10; j++) {
                            target.find('#number' + j).show();
                        }
                    }
                    //再檢查當前頁後面有沒有四頁以上
                    else {
                        //若
                        if (nextNumber < 0) {
                            for (var j = totalPage; j >= ((totalPage - 10) + 1); j--) {
                                target.find('#number' + j).show();
                            }
                        }
                        //否則顯示當前頁的前五頁和後四頁的數字
                        else {
                            for (var i = 1; i <= 5; i++) {
                                var preShowingNumber = indexNumber - i;
                                var nextShowingNumber = indexNumber + i;

                                target.find('#number' + preShowingNumber).show();
                                if (i !== 5) {
                                    target.find('#number' + nextShowingNumber).show();
                                } else {
                                    target.find('#number' + indexNumber).show();
                                }
                            }
                        }
                    }
                }
                //若分頁小於10, 則全部顯示
                else {
                    for (var k = 1; k <= totalPage; k++) {
                        target.find('#number' + k).show();
                    }
                }

                //先將全部頁面的數字的active拿掉, 再將當下頁面的數字加上active
                target.find('.numberOfPage').removeClass('active');
                target.find('#number' + index).addClass('active');

            }
        },

        //colorBox
        _generateColorBox: function (obj) {
            //    var obj = {
            //           contentOfLightbox : tag,
            //           classOfColorBox : [],
            //           colorBoxContentArr : [],
            //           colorBoxTitleArr : [],
            //           colorBoxWidth : 600,
            //           colorBoxHeight : 400,
            //           useSlider : true,
            //           isSliderAuto : true,
            //           sliderSpeed : 3000,
            //           eventOfClosed : function(){}
            //    };

            var contentOfLightbox = obj.contentOfLightbox; //放燈箱的tag
            //var classOfColorBox = obj.classOfColorBox; //燈箱裡的內容之tag的class(用以決定哪些圖片是一個group)(array)
            var classOfColorBox = obj.classOfColorBox; //燈箱裡的內容之tag的class
            //var classOfGroup = obj.classOfGroup; //燈箱裡的內容之group的class(存放每一個group的class字串)(array)
            var colorBoxContentArr = obj.colorBoxContentArr; //放燈箱上的內容(array)
            var colorBoxTitleArr = obj.colorBoxTitleArr; //放燈箱上的標題(array)
            var colorBoxWidth = obj.colorBoxWidth; //燈箱中間區塊的寬度
            var colorBoxHeight = obj.colorBoxHeight; //燈箱中間區塊的高度
            var useSlider = obj.useSlider; //使用slide效果(true/false)
            var isSliderAuto = obj.isSliderAuto; //是否自動播放(true/false)
            var sliderSpeed = obj.sliderSpeed; //自動播放的速度(毫秒)
            var eventOfClosed = (obj.eventOfClosed == undefined) ? '' : obj.eventOfClosed; //當燈箱關閉時的callback funtion

            var colorBoxTag = [];

            console.debug('classOfColorBox', classOfColorBox);

            $.each(colorBoxContentArr, function (index, value) {
                //colorBoxTag.push('<a href="' + value + '" class="' + classOfColorBox[index] + '" title="' + colorBoxTitleArr[index] + '"><img src="' + value + '"/></a>');
                colorBoxTag.push('<a href="' + value + '" class="' + classOfColorBox + '" title="' + colorBoxTitleArr[index] + '"><img src="' + value + '"/></a>');
            });

            contentOfLightbox.append(colorBoxTag.join(''));

            var currentGroup = $('.' + classOfColorBox);

            currentGroup.colorbox({
                //title: 'PRETTY',  //標題
                //speed: 3000,
                rel: classOfColorBox, //設置元素集合
                transition: "elastic", //顯示colorbox的效果(elastic/fade/none)
                width: 600, //燈箱中間區塊的寬度
                height: 400, //燈箱中間區塊的高度
                slideshow: true, //使用slide效果
                slideshowAuto: true, //是否自動播放
                slideshowSpeed: 3000, //自動播放的速度
                //slideshowStart: 'START',   //開始自動播放的按鈕
                //slideshowStop: 'STOP',     //停止自動播放的按鈕
                onClosed: function () { //當燈箱關閉時的callback funtion
                    alert('Lightbox is closed');
                }
            });

            /*$.each(classOfGroup, function(index, value) {
                var currentGroup = $('.' + value);

                currentGroup.colorbox({
                    //title: 'PRETTY',  //標題
                    //speed: 3000,
                    rel: value, //設置元素集合
                    transition: "elastic", //顯示colorbox的效果(elastic/fade/none)
                    width: 600, //燈箱中間區塊的寬度
                    height: 400, //燈箱中間區塊的高度
                    slideshow: true, //使用slide效果
                    slideshowAuto: true, //是否自動播放
                    slideshowSpeed: 3000, //自動播放的速度
                    //slideshowStart: 'START',   //開始自動播放的按鈕
                    //slideshowStop: 'STOP',     //停止自動播放的按鈕
                    onClosed: function() { //當燈箱關閉時的callback funtion
                        alert('Lightbox is closed');
                    }
                });
            });*/
        },

        //
        //loading animation
        _loadingAnimation: function (obj) {
            /*
            	var obj = {
            		imgURL: 圖片路徑
            		animationSpeed:淡出時間(毫秒)
            	}
            */
            var imgURL = obj.imgURL;
            var animationSpeed = (obj.animationSpeed == undefined) ? 1000 : obj.animationSpeed;
            if (animationSpeed <= 500) { //如果傳入的參數低於500 則設為500
                animationSpeed = 500;
            } else if (animationSpeed > 5000) { //高於5000 則設為5000
                animationSpeed = 5000;
            }
            var loaderArea = '<div id=loader-wrapper><div id=loader></div><div class="loader-section section-left"></div><div class="loader-section section-right"></div></div>';
            $('body').append(loaderArea); //將loader結構塞進body
            if (imgURL == undefined) { //如果路徑沒傳
                $(window).load(function () {
                    $('#loader-wrapper').fadeOut(animationSpeed); //則播放預設動畫
                });
            } else { //如果有傳 將該圖片放進loader中
                var img = '<img src=' + imgURL + '>';
                var loader = $('#loader');
                loader.addClass('hasimg');
                loader.append(img);
                loader.css({
                    border: 0
                });
                $(window).load(function () {
                    $('#loader-wrapper').fadeOut(animationSpeed);
                });
            }
        },

        //
        //Tab
        _tab: function (obj) {
            /*
            	var obj: {
            		tabID:ul標籤之ID
            		mobileWidth:螢幕寬度多少以下為小網
            	}
            */
            var tabID = obj.tabID;
            var tabUI = $('#' + tabID);
            var tabLi = tabUI.children('li');
            var liLength = tabLi.length;
            var container = $('#' + tabID + 'Container');
            var links = tabLi.children('a:first-child');
            var mobileWidth = (obj.mobileWidth == undefined) ? 768 : obj.mobileWidth;
            var containerDiv = container.children('div');
            var subsTab = $('.subs-tab');
            var subsContainer = $('.subs-inner-container');
            //resize event
            $(window).resize(function () {

                //存取當前瀏覽器寬度(判斷當前是大網還是小網)
                var currentWidth = $(window).width();
                //計數器(用來判斷有幾個tab有active class
                var count = 0;

                //如果瀏覽器寬度 > 小網寬度(參數)
                if (currentWidth > mobileWidth) {
                    //將原本的結構塞回去
                    container.html(containerDiv);
                    //用來設定css寬度，防止破版，以及計算tab active數量
                    $.each(tabLi, function (index, value) {
                        //						$(this).css({
                        //							width: 100 / liLength + '%'
                        //						});
                        if ($(this).hasClass('active')) {
                            count++;
                        }
                    });
                    //如果沒有tab有active(網頁初始狀態) or 有兩個以上的active
                    if (count != 1) {
                        //只讓第一個tab active(預設)
                        tabLi.removeClass('active');
                        tabLi.eq(0).addClass('active');
                    }
                    //反之(瀏覽器寬度 <= 小網寬度)
                } else {
                    //設定CSS寬度100%以及計算active數量
                    $.each(tabLi, function (index) {
                        //							$(this).css({
                        //							width: 100 + '%'
                        //						});
                        if ($(this).hasClass('active')) {
                            count++;
                        }
                        //塞結構(將大網的div塞進li裡面)
                        $(this).append(containerDiv.eq(index));
                    });
                    //如果沒有tab有active(網頁初始狀態) or 有兩個以上的active
                    if (count != 1) {
                        //將全部的tab active拿掉(小網預設全部關閉)
                        tabLi.removeClass('active');
                    }
                }
                //判斷當前哪幾個tab有active，讓對應的div顯示，其餘的隱藏
                checkClass(tabLi);
            });

            //網頁一開始載入時先trigger，用來判斷大小網tab active怎麼加(大網:第一個tab加上active 小網:不加active(預設全關閉))
            $(window).trigger('resize');

            //當tab連結被點時住觸發
            links.off('click').on('click', function (ev) {
                //存取當前瀏覽器寬度
                var currentWidth = $(window).width();
                //取消預設行為
                ev.preventDefault();
                //如果瀏覽器寬度 > 小網寬度(參數)
                if (currentWidth > mobileWidth) {
                    //拿掉全部的active並在this的父元素(li)加上active(只能有一個active)
                    tabLi.removeClass('active');
                    $(this).parent('li').addClass('active');
                    //反之(瀏覽器寬度 <= 小網寬度)
                } else {
                    //判斷this的父元素(li)有沒有active class(toggle)(允許打開多個tab)
                    $(this).parent('li').toggleClass('active');
                }
                //判斷當前哪幾個tab有active，讓對應的div顯示，其餘的隱藏
                checkClass(tabLi);
            });


            //判斷當前哪些li有active，將對應的div顯示出來，其餘隱藏
            function checkClass(ele) {
                $.each(ele, function (index) {
                    if ($(this).hasClass('active')) {
                        containerDiv.eq(index).show();
                    } else {
                        containerDiv.eq(index).hide();
                    }
                });
            }
        },

        //
        //scrollbar
        _scrollBar: function (obj) {
            var targetID = obj.targetID;
            var height = (obj.height == undefined) ? '250' : obj.height;
            var type = (obj.type == undefined) ? 'scrollbar-inner' : obj.type;
            $('#' + targetID).addClass(type);
            $('.' + type).scrollbar();
            var scrollWrapper = $('.scroll-wrapper');
            scrollWrapper.css({
                maxHeight: height + 'px'
            });
        },


        //
        //scroll
        _scroll: function (obj) {
            
        }

    },
    //驗證方面的元件
    valid: {
        _formChecker: function (obj) {
            /* 
                var obj = {
                    formID: 目標form tag之ID
                    submitID: submit按鈕之ID
                    mode: 錯誤訊息顯示方式(true為顯示錯誤文字 false為alert) 預設為true
                    emptyMsg:檢查空值之錯誤訊息
                    numberOnlyMsg:檢查純數字之錯誤訊息文字
                    chineseOnlyMsg:檢查純文字之錯誤訊息文字
                    emailFormatMsg:檢查email格式之錯誤訊息文字
                    identifyFormatMsg:檢查身分證格式之錯誤訊息文字
                    generalMsg:輸入錯誤之錯誤訊息文字
                    address: [{ }]存放縣市及區域之二維矩陣，每個矩陣的第一項為縣市，後面皆為該縣市對應之區域
                    empty: [{
                        inputName:要檢查空值之input name
                        errormessage:錯誤訊息文字
                    },{
                        inputName:要檢查空值之input name
                        errormessage:錯誤訊息文字
                    }]
                    numberOnly: [{
                        inputName:要檢查純數字之input name
                        errormessage:錯誤訊息文字
                    },{
                        inputName:要檢查純數字之input name
                        errormessage:錯誤訊息文字
                    }] 
                    chineseOnly: [{
                        inputName:要檢查純中文之input name
                        errormessage:錯誤訊息文字
                    },{
                        inputName:要檢查純中文之input name
                        errormessage:錯誤訊息文字
                    }]
                    emailFormat: [{
                        inputName:要檢查信箱格式之input name
                        errormessage:錯誤訊息文字
                    }]
                    identifyFormat: [{
                        inputName:要檢查身分證格式之input name
                        errormessage:錯誤訊息文字
                    }]
                }
            */

            var formID = obj.formID; //必填
            var inputs = $('#' + obj.formID).find('input');
            var submitID = obj.submitID; //必填
            //非必填
            var mode = (obj.mode == undefined) ? true : obj.mode;
            var emptyMsg = (obj.emptyMsg == undefined) ? '不能為空' : obj.emptyMsg;
            var numberOnlyMsg = (obj.numberOnlyMsg == undefined) ? '限輸入數字' : obj.numberOnlyMsg;
            var chineseOnlyMsg = (obj.chineseOnlyMsg == undefined) ? '限輸入中文' : obj.chineseOnlyMsg;
            var emailFormatMsg = (obj.emailFormatMsg == undefined) ? '格式錯誤' : obj.emailFormatMsg;
            var identifyFormatMsg = (obj.identifyFormatMsg == undefined) ? '格式錯誤' : obj.identifyFormatMsg;
            var minLengthMsg = (obj.minLengthMsg == undefined) ? '長度不可低於' : obj.minLengthMsg;
            var generalMsg = (obj.generalMsg == undefined) ? '輸入錯誤' : obj.generalMsg;
            var empty = (obj.empty == undefined) ? [] : obj.empty;
            var numberOnly = (obj.numberOnly == undefined) ? [] : obj.numberOnly;
            var chineseOnly = (obj.chineseOnly == undefined) ? [] : obj.chineseOnly;
            var emailFormat = (obj.emailFormat == undefined) ? [] : obj.emailFormat;
            var identifyFormat = (obj.identifyFormat == undefined) ? [] : obj.identifyFormat;
            var minLength = (obj.minLength == undefined) ? [] : obj.minLength;
            //非必填 end
            var address = obj.address; //吃後臺資料
            //存取當前時間(年月日)
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth();
            var day = time.getDate();

            //click start
            $('#' + submitID).off('click').on('click', function () {
                var errormessage = $('.errormessage'); //錯誤訊息
                errormessage.text(''); //先清空上一次顯示的錯誤訊息
                var inputArr = []; //存放有錯誤訊息之inputName
                var errorArr = []; //存放該inputName之錯誤訊息

                var customizeValidResult = [];
                obj.customizeFun(customizeValidResult);

                //過濾空白
                $.each(inputs, function (index, value) {
                    var $value = clearSpace(value.value);
                    var name = $(this).attr('name');
                    $('input[name=' + name + ']').val($value);
                });

                //check empty(如果沒傳值進來，則直接跳過這段)
                if (empty.length != 0) {
                    $.each(empty, function (index, value) {
                        var name = value.inputName;
                        var errormessage = value.errormessage;
                        var group = value.group;
                        var $value = $('input[name=' + name + ']').val();
                        //如果為空值，將錯誤訊息以及inputName傳入矩陣
                        if ($value.length == 0) {
                            inputArr.push(name);
                            errorArr.push(errormessage + emptyMsg);
                        } else {
                            return;
                        }
                    });
                }

                //檢查純數字(如果沒傳值進來，則直接跳過這段)
                if (numberOnly.length != 0) {
                    $.each(numberOnly, function (index, value) {
                        var cellphoneRule = /^09\d{8}$/;
                        var name = value.inputName;
                        var errormessage = value.errormessage;
                        var group = value.group;
                        var $value = $('input[name=' + name + ']').val();
                        var length = $value.length;
                        var checkValue = $.inArray(name, inputArr); //檢查inputArr裡面是否已經有這個name
                        //如果是區域碼、月、日，且只輸入一個數字時，在前面補0
                        if ((name == 'month' || name == 'day' || name == 'areanumber') && $value.length == 1 && $value != 0) {
                            var newValue = addZero($value);
                            $('input[name=' + name + ']').val(newValue);
                        }
                        var monthValue = $('input[name=month]').val(); //存取月份的值
                        /*
                            如果inputArr裡面已經有這個name，則不做任何事
                            如果沒有，才會檢查是否錯誤
                        */
                        if (checkValue == -1) {
                            if (isNaN($value)) { //如果傳入的值非純數字
                                inputArr.push(name); //將該input name傳入矩陣
                                errorArr.push(errormessage + numberOnlyMsg); //將該input對應之錯誤訊息傳入矩陣
                            } else { //如果傳入的值是純數字，則檢查是否輸入錯誤
                                switch (name) {
                                case 'year':
                                    var checker = checkyear($value); //將直傳入function，如果為false則將錯誤訊息及input name塞入矩陣
                                    if (!checker) {
                                        inputArr.push(name);
                                        errorArr.push(errormessage + generalMsg);
                                    }
                                    break;
                                case 'month':
                                    var checker = checkmonth($value);
                                    if (!checker) {
                                        inputArr.push(name);
                                        errorArr.push(errormessage + generalMsg);
                                    }
                                    break;
                                case 'day':
                                    var checker = checkday($value, monthValue);
                                    if (!checker) {
                                        inputArr.push(name);
                                        errorArr.push(errormessage + generalMsg);
                                    }
                                    break;
                                case 'cellphone':
                                    var checker = checkCellphone($value);
                                    if (!checker) {
                                        inputArr.push(name);
                                        errorArr.push(errormessage + generalMsg);
                                    }
                                    break;
                                }
                            }
                        } else {
                            return;
                        }
                    });
                }


                //檢查純中文(如果沒傳值進來，則直接跳過這段)
                if (chineseOnly.length != 0) {
                    $.each(chineseOnly, function (index, value) {
                        var rule = /^[\u4e00-\u9fa5]{1,10}$/;
                        var name = value.inputName;
                        var errormessage = value.errormessage;
                        var group = value.group;
                        var $value = $('input[name=' + name + ']').val();
                        var checkValue = $.inArray(name, inputArr); //檢查inputArr裡面是否已經有這個name
                        if (checkValue == -1) { //如果沒有，才會檢查是否為純中文 如果有就不做事
                            if (rule.test($value)) {
                                return;
                            } else {
                                inputArr.push(name);
                                errorArr.push(errormessage + chineseOnlyMsg);
                            }
                        } else {
                            return;
                        }
                    });
                }

                //emailFormat(如果沒傳值進來，則直接跳過這段)
                if (emailFormat.length != 0) {
                    $.each(emailFormat, function (index, value) {
                        var rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                        var name = value.inputName;
                        var errormessage = value.errormessage;
                        var group = value.group;
                        var $value = $('input[name=' + name + ']').val();
                        var checkValue = $.inArray(name, inputArr); //檢查inputArr裡面是否已經有這個name
                        if (checkValue == -1) { //如果沒有，才會檢查格式 如果有就不做事
                            if (rule.test($value)) {
                                return;
                            } else {
                                inputArr.push(name);
                                errorArr.push(errormessage + emailFormatMsg);
                            }
                        } else {
                            return;
                        }
                    });
                }


                //identifyFormat(如果沒傳值進來，則直接跳過這段)
                if (identifyFormat.length != 0) {
                    $.each(identifyFormat, function (index, value) {
                        var name = value.inputName;
                        var errormessage = value.errormessage;
                        var group = value.group;
                        var $value = $('input[name=' + name + ']').val();
                        var checkID = checkTwID($value);
                        var checkValue = $.inArray(name, inputArr); //檢查inputArr裡面是否已經有這個name
                        if (checkValue == -1) { //如果沒有，才會檢查格式 如果有就不做事
                            if (checkID) {
                                return;
                            } else {
                                inputArr.push(name);
                                errorArr.push(errormessage + identifyFormatMsg);
                            }
                        } else {
                            return;
                        }
                    });
                }

                //再跑客製的
                $.each(customizeValidResult, function (i, obj) {
                    console.debug(inputArr);
                    console.debug('customizeValidResult', obj);
                    var customizeName = obj.inputName;
                    var customizeMsg = obj.msg;

                    if ($.inArray(customizeName, inputArr) == -1) {
                        inputArr.push(customizeName);
                        errorArr.push(customizeMsg);
                    }

                }); // end if: customize valid


                if (mode) { //if mode = true
                    for (var i = 0; i < inputArr.length; i++) { //用for loop把inputArr以及errorArr的值顯示出來
                        var name = inputArr[i];
                        var msg = errorArr[i];
                        var $value = $('input[name=' + name + ']').siblings('.errormessage').text();
                        var length = $value.length;
                        if (length == 0) {
                            $('input[name=' + name + ']').siblings('.errormessage').text(msg);
                        } else {
                            $('input[name=' + name + ']').siblings('.errormessage').text($value + '\n' + msg);
                        }
                    }
                } else { //if mode = false 使用alert將錯誤訊息顯示出來
                    var errorText = errorArr.join('\n');
                    alert(errorText);
                }
            }); //end click


            //check year
            function checkyear(value) {
                if (value > year || value <= 0 || value.length != 4) { //年份不可超過現在的年份 or 年份必須為四位數字
                    return false;
                } else {
                    return true;
                }
            }

            //check month
            function checkmonth(value) {
                if (value > 12 || value <= 0) { //月份必須為1~12
                    return false;
                } else {
                    return true;
                }
            }

            //check day
            function checkday(value, month) {
                if (month.length == 0) { //如果月份沒填
                    if (value <= 0 || value > 31) { //日期必須為1~31
                        return false;
                    } else {
                        return true;
                    }
                } else { //如果月份有填
                    if (month <= 7 && month % 2 == 0 && month != 2 && value > 30) { //月份 = 4 or 6時 日期不可超過30
                        return false;
                    } else if (month <= 7 && month % 2 == 1 && value > 31) { //月份 = 1、3、5、7時 日期不可超過31
                        return false;
                    } else if (month > 7 && month % 2 == 0 && value > 31) { //月份 = 8、10、12時 日期不可超過31
                        return false;
                    } else if (month > 7 && month % 2 == 1 && value > 30) { //月份 = 9、11時 日期不可超過30
                        return false;
                    } else if (month == 2 && value > 29) { //月份 = 2時 日期不可超過29
                        return false;
                    } else {
                        return true; //如果符合格式 傳回true
                    }
                }
            }

            //check cellphone
            function checkCellphone(value) {
                var rule = /^09/; //手機需為09開頭，且長度要等於10
                if (rule.test(value) && value.length == 10) {
                    return true;
                } else {
                    return false;
                }
            }

            //清除空白
            function clearSpace(value) {
                value += "";
                return value.replace(/\s+/g, '');
            }

            //addZero
            function addZero(value) {
                value = "0" + value;
                return value;
            }

            //檢查身分證
            function checkTwID(id) {
                //建立字母分數陣列(A~Z)
                var city = new Array(
                    1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11,
                    20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30
                )
                id = id.toUpperCase();
                // 使用「正規表達式」檢驗格式
                if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
                    return false;
                } else {
                    //將字串分割為陣列(IE必需這麼做才不會出錯)
                    id = id.split('');
                    //計算總分
                    var total = city[id[0].charCodeAt(0) - 65];
                    for (var i = 1; i <= 8; i++) {
                        total += eval(id[i]) * (9 - i);
                    }
                    //補上檢查碼(最後一碼)
                    total += eval(id[9]);
                    //檢查比對碼(餘數應為0);
                    return ((total % 10 == 0));
                }
            }


            //city & downtown select
            var city = $('#city');
            var downtown = $('#downtown');
            //將縣市傳入縣市的select內
            for (var i = 0; i < address.length; i++) {
                $('<option>' + address[i][0] + '</option>').appendTo(city);
            }

            //綁事件(當縣市被改變時觸發)
            city.off('change').on('change', function () {
                downtown.empty();
                var currentCity = city.val();
                for (var i = 0; i < address.length; i++) {
                    if (currentCity == address[i][0]) {
                        for (var j = 1; j < address[i].length; j++) {
                            $('<option>' + address[i][j] + '</option>').appendTo(downtown);
                        }
                    }
                }
            }); //end change
        }
    },

    //偵測瀏覽器版本
    browser: {
        _browserDetect: function (obj) {
            var version = (obj.version == undefined) ? 11 : obj.version;
            // detect IE
            var IEversion = detectIE();
            if (IEversion != false && IEversion < version) {
                alert('建議勿使用IE' + version + '以下之瀏覽器');
            }


            /**
             * detect IE
             * returns version of IE or false, if browser is not Internet Explorer
             */
            function detectIE() {

                var ua = window.navigator.userAgent;
                // test values
                // IE 10
                //ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
                // IE 11
                //ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
                // IE 12 / Spartan
                //ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

                var msie = ua.indexOf('MSIE ');
                if (msie > 0) {
                    // IE 10 or older => return version numbera
                    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                }

                var trident = ua.indexOf('Trident/');

                if (trident > 0) {

                    var rv = ua.indexOf('rv:');

                    // IE 11 => return version number
                    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                }

                var edge = ua.indexOf('Edge/');

                if (edge > 0) {
                    // IE 12 => return version number
                    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                }

                // other browser
                return false;
            }
        }
    },

    //滾輪效果
    roller: {
        //
        //animation of roller
        _animationOfRoller: function (obj) {
            //    var obj = {
            //           "tagClass" : "textArea",
            //           "offset" : 0,
            //           "animationClass" : "imgAnimation"
            //    };

            //依序檢查傳進來的元素
            $.each(obj, function (index, object) {
                var tagClass = object.tagClass; //要產生動畫的元素之class
                var offset = (object.offset == undefined) ? 0 : object.offset; //偏移量(功能還沒寫～)
                var animationClass = object.animationClass; //要產生動畫用的class(css3預先寫好的動畫樣式)
                var currentEle = $('.' + tagClass); //取得要產生動畫的元素

                //如果此元素不止一個
                if (currentEle.length > 1) {
                    //再依序檢查這些元素
                    $.each(currentEle, function (index, element) {
                        var $elem = $(element);
                        var obj = {
                            "currentEle": $elem, //要產生動畫的元素
                            "animationClass": animationClass //要產生動畫用的class(css3預先寫好的動畫樣式)
                        };
                        
                        addClassToCreateAnimation(obj);
                    });

                }
                //如果此元素只有一個
                else if(currentEle.length == 1){
                    var obj = {
                        "currentEle": currentEle, //要產生動畫的元素
                        "animationClass": animationClass //要產生動畫用的class(css3預先寫好的動畫樣式)
                    };
                    console.debug(currentEle);

                    addClassToCreateAnimation(obj);
                }
                //如果沒有此元素,則顯示訊息告知找不到,解決方法為:到JS檔檢查傳入的參數之CLASS名稱是否有出現在HTML的任何元素上
                else{
                    console.debug('Can not find any elements which the class name is '+tagClass+'.');
                }
            });

            //檢查哪一個元素在可見視窗中,則表示需要增加class以產生對應的動畫
            function addClassToCreateAnimation(obj) {
                console.debug(obj);
                var currentEle = obj.currentEle; //要產生動畫的元素
                var animationClass = obj.animationClass; //要產生動畫用的class(css3預先寫好的動畫樣式)

                var viewportTop = $(window).scrollTop(); //取得可見視窗的頂部位置
                var viewportBottom = viewportTop + $(window).height(); //取得可見視窗的底部位置

                var elemTop = Math.round(currentEle.offset().top); //取得元素的頂部位置
                var elemBottom = elemTop + currentEle.height(); //取得元素的底部位置

                //如果元素出現有出現在可見視窗中, 則加上class以產生動畫
                if ((elemTop < viewportBottom) && (elemBottom > viewportTop)) {
                    currentEle.addClass(animationClass);
                }
                //否則移除class, 以取消動畫
                else {
                    currentEle.removeClass(animationClass);
                }
            }
        },

        //
        //Animation of vertical flip by roller
        _verticalFlipByRoller: function (obj) {
            //    var obj = {
            //           "delta" : delta,
            //           "speed" : 2000
            //    };

            var delta = obj.delta; //可以獲取滾輪的方向和速度, 負值代表滾輪向下, 正值代表滾輪向上
            var speed = 1000; //滾動的速度
            if (obj.speed >= 500 && obj.speed <= 1500) {
                speed = obj.speed;
            }
            
            //console.debug(speed);

            var viewHeight = $(window).height(); //可見視窗的高度
            var viewTop = $(window).scrollTop(); //可見視窗的頂部
            var direction = (delta > 0) ? -1 : 1; //滾動的方向, 若向上則設為-1; 向下則設為1 
            var height = direction * viewHeight + viewTop;
            var multipleHeight = Math.floor(height / viewHeight) * viewHeight; //滾動整數倍的高度

            //先停止當前動畫, 再使用動畫方式滾動scroll bar
            $("html, body").stop().animate({
                scrollTop: multipleHeight
            }, speed);

            return false;
        },

        //
        //Animation of horizontal flip by roller
        _horizontalFlipByRoller: function (obj) {
            var delta = obj.delta; //可以獲取滾輪的方向和速度, 負值代表滾輪向下, 正值代表滾輪向上
            var speed = 1000; //滾動的速度
            if (obj.speed >= 500 && obj.speed <= 1500) {
                speed = obj.speed;
            } 
            
            var viewWidth = $(window).width(); //可見視窗的寬度
            var viewLeft = $(window).scrollLeft(); //可見視窗的left偏移量
            var direction = (delta > 0) ? -1 : 1; //滾動的方向,若向左則設為-1; 向右則設為1
			if (direction == 1) {
				var purpose = Math.floor(viewLeft / viewWidth + 1) * viewWidth;
			} else {
				var purpose = Math.ceil(viewLeft / viewWidth - 1) * viewWidth;
			}
            //先停止當前動畫, 再使用動畫方式滾動scroll bar
            $("html, body").stop().animate({
                scrollLeft: purpose
            }, speed);
            return false;
        }
    }
}