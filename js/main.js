/*--------------------------------------------------
Vars
--------------------------------------------------*/
var time = 200;
var $loading = $('<div class="loading"></div>').appendTo($('body'));
var $zoom = $('<div class="zoom"></div>').appendTo($('body'));
var $miniature = $('<div class="miniature"></div>').appendTo($('body'));


/*--------------------------------------------------
Create Thumbs
--------------------------------------------------*/
function createThumbs() {
    // create divs & miniature
    $('.thumb').each(function (i) {
        $div = $('img', this).wrap('<div></div>');
    })
    $('.thumb div').clone().appendTo($miniature);

    // attach zoom
    $('.miniature div').on('click touchend', function (i) {
        $('.miniature div').removeClass('active');
        $(this).addClass('active');
        var src = $('img', this).attr('src');
        openZoom(src);
    });

    // thumb zoom
    $('.thumb div').on('click', function () {
        $('.thumb div').removeClass('active');
        i = $('.thumb div').index($(this).addClass('active'));
        $('div:eq(' + i + ')', $miniature).trigger('click');
    });

    // resize
    $resize = $('<span class="resize"></span>').appendTo($miniature);
    $resize.on('click', function () {
        $('html').toggleClass('resize');
    });

    // close zoom
    $zoom.on('dblclick', function () {
        closeZoom();
    });

    // scroll zoom
    $zoom.on('mousewheel', function (e) {
        $(this).scrollTop($(this).scrollTop() - e.originalEvent.wheelDeltaY);
        return false;
    });

    // keyboard
    $(document).on('keydown', function (e) {
        switch (e.which) {
            case 27:
                closeZoom();
                break;
            case 37:
                $('.miniature div.active').prev().trigger('click');
                break;
            case 39:
                $('.miniature div.active').next().trigger('click');
                break;
        }
    });
}

/*--------------------------------------------------
Open Zoom
--------------------------------------------------*/
function openZoom(src) {
    $('img',$zoom).fadeOut(time);
    $zoom.fadeIn(time);
    $loading.fadeIn(time);

    var img = new Image();
    img.src = src;
    img.onload = function () {
        $loading.stop().hide();
        $img = $('<img src="' + src + '">').hide();
        $zoom.html($img.fadeIn(time));
    }
}


/*--------------------------------------------------
Close Zoom
--------------------------------------------------*/
function closeZoom() {
    $zoom.fadeOut(time);
}


/*--------------------------------------------------
Init
--------------------------------------------------*/
$(function () {
    // loading
    for (i = 1; i <= 10; i++) {
        $('<div class="shaft' + i + '"></div>').appendTo($loading);
    }
    createThumbs();
});