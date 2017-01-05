 var modal = {

        getNewCaseData: function () {

            $.ajax({
                async: false,
                type: "POST",
                dataType: 'json',
                url: 'json/newCase.json',
                contentType: "application/json",
                success: function (data) {
                    $.each(data, function (index, value) {
                        var content = '<div class=photo><img src=' + data[index].img + '></div>';
                        $('.case-sharing-photobox').append(content);
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.debug(XMLHttpRequest);
                    console.debug(textStatus);
                    console.debug(errorThrown);
                }
            });
        },

        getAllCaseData: function () {
            $.ajax({
                async: false,
                url: 'json/allCase.json',
                type: 'POST',
                datatype: 'json',
                data: 'json',
                success: function (data) {
                    $.each(data, function (index, value) {
                        var content = '<div data-id="' + data[index].id +'"class="content-box before_enterFromBottom"><a href="#"><img src=' + data[index].img + '></a><div class=img-introduction><div class=main-content-box><h3>' + data[index].name + '</h3></div></div></div>';
                        $('.case-waterfall').append(content);
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.debug(XMLHttpRequest);
                    console.debug(textStatus);
                    console.debug(errorThrown);
                }
            });
        },

        getPickedCaseData: function () {
            $.ajax({
                async: false,
                url: 'json/pickedCase.json',
                type: 'POST',
                datatype: 'jsonp',
                data: 'json',
                success: function (data) {
                    var content = '<div class="box imgbox before_zoomIn"><img src=' + data.img + '></div><div class="box text-box before_enterFromBottom" id=my-scroll><h3>' + data.title + '</h3><h5>' + data.date + '</h5><p>' + data.content + '</p></div>';
                    $('.img-text-contentbox').append(content);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.debug(XMLHttpRequest);
                    console.debug(textStatus);
                    console.debug(errorThrown);
                }
            });
        }
    };