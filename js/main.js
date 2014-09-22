/*--------------------------------------------------
Vars
--------------------------------------------------*/
var time = 200;


/*--------------------------------------------------
Create Thumbs
--------------------------------------------------*/
function createThumbs() {
    // create divs
    $('.thumb img').each(function () {
        $(this).wrap('<div></div>');
    });

    // attach zoom
    $('.thumb div').on('click touchend',function () {
        $('.thumb div').removeClass('active');
        $(this).addClass('active');
        var src = $('img', this).attr('src');
        openZoom(src);
    })

    // close zoom
    $('.zoom').on('dblclick', function () {
        closeZoom();
    });

    // keyboard
    $(document).on('keydown', function (e) {
        switch (e.which) {
            case 27:
                closeZoom();
                break;
            case 37:
                $('.thumb div.active').prev().trigger('click');
                break;
            case 39:
                $('.thumb div.active').next().trigger('click');
                break;
        }
    });
}

/*--------------------------------------------------
Open Zoom
--------------------------------------------------*/
function openZoom(src) {
    $('.zoom img').fadeOut(time);
    $('.loading, .zoom').fadeIn(time);

    var img = new Image();
    setTimeout(function () {
        img.src = src;
        img.onload = function () {
            $('.loading').stop().hide();
            $img = $('<img src="' + src + '">').hide();
            $('.zoom').html($img.fadeIn(time));
        }
    }, 1);
}


/*--------------------------------------------------
Close Zoom
--------------------------------------------------*/
function closeZoom() {
    $('.zoom').fadeOut(time);
}


/*--------------------------------------------------
Init
--------------------------------------------------*/
$(function () {
    createThumbs();
});