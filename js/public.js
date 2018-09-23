// >> Reset Style --- >

$(document).ready(function(){
    // Menu toggle
    $('.btn--toggleMenu').on('click', function(){
        $('.toggleMenu').slideToggle("fast");
    });

    // Jump to top - mobilFooter
    $('.mobilFooter__item--jumpTo').on('click', function(){
        var l=$($(this).attr('href')).offset().top;
        $('body, html').stop().animate({scrollTop:l}, 500);
        return false;
    });

    // Jump to top - pc
    const btn_jumpTo_top = $('.jumpTo-top');

    // Show/hide on scroll
    $(window).scroll(function(){
        if ($(window).scrollTop() > 140){
            btn_jumpTo_top.addClass( "visible");
        }
        else {
            btn_jumpTo_top.removeClass("visible");
        }
    });

    // Trigger on click
    btn_jumpTo_top.on('click', function(){
        var l=$($(this).attr('href')).offset().top;
        $('body, html').stop().animate({scrollTop:l}, 500);
        return false;
    });

    // Copy Hexa Colors
    $('.btn--copyHexa').on('click', function () {
        var colorCode = $(this).parent().children('input');
        colorCode.select();
        document.execCommand('copy');
    });

    // Set Button Background Color
    $('.btn--copyHexa').css("background", color);

});
