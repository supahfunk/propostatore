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


var Imgs = [];
var Srcs = [];
var Mins = [];
var Ctx = [];
var Mtx = [];

function init(){
    $('.thumb img').each(function (i) {
        $(this).wrap('<div class="t' + i +'"></div>').remove();
        Srcs.push($(this).attr('src'));
        $('.t' + i).html('<canvas id="c' + i + '" width="120" height="120"></canvas>');
        $('<canvas id="m' + i + '" width="60" height="60"></canvas>').appendTo($miniature);
        Ctx[i] = document.getElementById('c' + i).getContext('2d');
        Mtx[i] = document.getElementById('m' + i).getContext('2d');
        Imgs[i] = new Image();
        Imgs[i].src = Srcs[i];
        Imgs[i].onload = function () {
            w = this.width;
            h = this.height;
            Ctx[i].drawImage(Imgs[i], 0, 0, 120, 120*h/w);
            Mtx[i].drawImage(Imgs[i], 0, 0, 60, 60 * h / w);
        }
    });

    $('.miniature canvas').each(function (i) {
        console.log(i)
        $(this).click(function () {
            $('.active').removeClass('active');
            $(this).addClass('active');
            $zoom.html('<canvas id="z"></canvas>');
            var z = document.getElementById('z');
            var ctx = z.getContext('2d');
            var img = new Image();
            img.src = Srcs[i];
            img.onload = function () {
                W = $(window).width();
                w = this.width;
                h = this.height;
                z.width = W;
                z.height = W * h / w;
                $('.zoom').fadeIn(time);
                console.log(w);
                ctx.drawImage(img, 0, 0, W, W * h / w);
            }
        });
    });

    $('.thumb canvas').each(function (i) {
        $(this).click(function () {
            console.log(i);
            $('.miniature canvas:eq(' + i + ')').trigger('click');
        });
    });
}

function close() {
    $zoom.hide().html('');
}

$(document).on('keydown', function (e) {
    switch (e.which) {
        case 27:
            close();
            break;
        case 37:
            $('.active').prev().click();
            break;
        case 39:
            $('.active').next().click();
            break;
    }
});

$zoom.on('dblclick', function () {
    close();
});


/*--------------------------------------------------
Init
--------------------------------------------------*/
$(function () {
    // loading
    for (i = 1; i <= 10; i++) {
        $('<div class="shaft' + i + '"></div>').appendTo($loading);
    }
    init();
    // createThumbs();
});