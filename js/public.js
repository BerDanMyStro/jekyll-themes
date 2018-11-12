// >> Reset Style --- >

function scrollTo(target, speed) {
    if (target) {
        let y = target.offset().top;
        $('body, html').animate({scrollTop: y}, speed || 500);
        return false;
    }
}

// Circle cursor
/*$(document).mousemove(function(e) {

    $('.circlePointer').css({
        left: e.pageX,
        top: e.pageY
    });

    setTimeout(function() {
        $('.circleCursor').css({
            left: e.pageX,
            top: e.pageY
        });
    }, 100);

});*/

$(document).ready(function(){

    // Header Menu
    $('.btn--toggleMenu').on('click', function(){
        $(this).toggleClass('open');
        $(this).prev('nav').slideToggle();
    });
    $('.btn--openSub').on('click', function(){
        $(this).toggleClass('open');
        $(this).next('.toggleSubmenu').slideToggle();
    });
    if ($(window).width() > 1024){
        $('.hasSub').hover(function () {
            $(this).children('.toggleSubmenu').toggleClass('hover');
        });
    }

    /*// Left Side Menu
    $('.btn--toggleMenu').on('click', function(){
        $(this).toggleClass('open');
        $('nav').toggleClass('open');
    });
    $('.btn--openSub').on('click', function(){
        $(this).toggleClass('open');
        $(this).next('.toggleSubmenu').slideToggle();
    });*/

    // >> Left Side Menu Title
    let pageTitle = $('h2.pageTitle');
    $('.nav--leftSide h3').text(pageTitle[0].textContent);

    // >> Section Menu
    let navItem = $('.sectionNav__item');
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

        // Trigger the scroll - current position when page is refreshed
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

    // Cursor hover
    $('a, button, *[class^="btn--"]').hover(function () {
        $('.circleCursor').toggleClass('hover');
    });

    // Parallax Header
    $(window).scroll(function () {

        let scroll = $(this).scrollTop();

        $('.parallaxHeader__logo').css({
            'transform': 'translate(0px, '+ scroll /2 +'%)'
        });

        $('.parallaxHeader__tire').css({
            'transform': 'translate(0px, '+ scroll /20 +'%)'
        });

        $('.parallaxHeader__jump').css({
            'transform': 'translate(-'+ scroll /10 +'px, -'+ scroll /60 +'%)'
        });

    });

    // Lorem Text Generator
    $('.sample-1').looreem({'wC':50, 'isHTML':true, 'langSel':arrayHU});
    // $('#sample-2').looreem({'genType':'p','pC':2,'sPP':5,'wPPS':25,'isHTML':true,'langSel':arrayHU});
    $('.sample-3').looreem({'genType':'p','pC':5,'sPP':5,'wPPS':20,'isHTML':true,'langSel':arrayHU});
    $('.sample-4').looreem({'genType':'l','lC':5,'wPLI':20,'isHTML':true,'langSel':arrayHU});

        /* >> Option
        --- --- --- --- --- --- --- ---

        "isHTML": false, // true or false | add html tags such as &lt;p&gt;, &lt;ul&gt;&lt;li&gt; to the generated content
        "hasFont": false, // false or string | if isHTML is true and hasFont is not false, add style='font-family:hasFont' string to &lt;p&gt; or &lt;ul&gt; tags
        "genType": undefined, // w, p, s | specify generated content type. w is word, p is paragraph, l is list
        "langSel": arrayHU, // array names specified earlier, works with any custom one dimensional array also
        "wC":0, // positive integer, if genType is w, this will specify the number of words (array elements) to generate
        "pC":0, // positive integer, if genType is p, this will specify the number of paragraphs to generate
        "sPP":0, // positive integer, if genType is p, this will specify the number of sentences in one paragraph
        "wPPS":0, // positive integer, if genType is p, this will specify the number of words (array elements) to generate for one sentence
        "lC":0, // positive integer, if genType is l, this will specify the number of list elements to generate
        "wPLI":0 // positive integer, if genType is l, this will specify the number of words (array elements) to generate for one list element

        --- --- --- --- --- --- --- --- */

});
