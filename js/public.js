// >> Reset Style --- >

$(document).ready(function(){
    // Left Side Menu
    $('.btn--toggleMenu').on('click', function(){
        $(this).toggleClass('open');
        $('nav').toggleClass('open');
    });
    $('.btn--openSub').on('click', function(){
        $(this).toggleClass('open');
        $(this).next('.toggleSubmenu').slideToggle();
    });

    // >> Left Side Menu Title
    let pageTitle = $('h2.pageTitle');
    $('.nav--leftSide h3').text(pageTitle[0].textContent);

    // >> Section Menu

    let sectionLink = $('.sectionNav__item a');

        // Create elements
        sectionLink.each(function(){
            $(this).html('<span class="sectionNo">'+ $(this).html() +'</span><span class="circle"><span><em></em></span><span><em></em></span></span>');
        });

    sectionLink.on('click', function(){
        var l=$($(this).attr('href')).offset().top;
        $('body, html').stop().animate({scrollTop:l}, 500);
        return false;
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
    $('.btn--copyHexa').on('click', function(){

        // Copy Code
        $(this).next('input').select();
        document.execCommand('copy');

        //Display text
        var copyDone = $(this).parent().parent().children('.colorCard__data').children('.colorCard__data__copyDone');

        copyDone.fadeIn().delay(1200).fadeOut();

    });

    // Set Sample Color
    $('.colorCard').each(function() {

        let sampleLight = $(this).children('.colorCard__colorSample--light');
        let sampleDark = $(this).children('.colorCard__colorSample--dark');
        let hexaData = $(this).children('.colorCard__data');

        let colorLight = sampleLight.children('input').val();
        let colorDark = sampleDark.children('input').val();

        sampleLight.css('background', colorLight);
        sampleDark.css('background', colorDark);

        hexaData.children('.colorCard__data__hexa').text(colorLight + ' | ' + colorDark);

    });

});
