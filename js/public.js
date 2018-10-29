// >> Reset Style --- >

function scrollTo(target, speed) {
    if (target) {
        let y = target.offset().top;
        $('body, html').animate({scrollTop: y}, speed || 500);
        return false;
    }
}

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

        // Display current section on Section Menu

        $(window).scroll(function (event) {

            let scroll = $(window).scrollTop();
            let section = $('.sectionWrapper section');
            let i;
            let navItem = $('.sectionNav__item');

            for (i=0; i < section.length; i++){

                let currentSection = section.eq(i);
                let sectionOffset_top = currentSection.offset().top;
                let sectionHeight = currentSection.height();

                if ( scroll >= sectionOffset_top && scroll < (sectionOffset_top + sectionHeight) ){
                    break;
                }

            }
            navItem.removeClass('current');
            navItem.eq(i).addClass('current');

        });

        //trigger the scroll - current position when page is refreshed
        $(window).scroll();

    sectionLink.on('click', function(){
        scrollTo($($(this).attr('href')), 500);
        return false;
    });

    // Jump to top - mobilFooter
    $('.mobilFooter__item--jumpTo').on('click', function(){
        scrollTo($($(this).attr('href')), 500);
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
        scrollTo($($(this).attr('href')), 500);
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

    // Form validations
    $('#baseForm').submit(function(e) {
        e.preventDefault();
        let first_name = $('#first_name').val();
        let last_name = $('#last_name').val();

        $(".error").remove();

        if (first_name.length < 1) {
            $('#first_name').after('<div class="error">This field is required!</div>');
        }
        if (last_name.length < 1) {
            $('#last_name').after('<div class="error">This field is required!</div>');
        }

    });

});
