// >> Public Js --- >

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

// Clone Slides
function cloneSlider_elements() {

    let firstElement = $('li.slide:first');
    let lastElement = $('li.slide:last');

    lastElement.clone().insertBefore('li.slide:first').attr('id', 'lastClone');
    firstElement.clone().insertAfter('li.slide:last').attr('id', 'firstClone');
}

// Slider function
function Slider() {

    // Buttons
    const btnNext = $('#btn--nextSlide');               // Next Button
    const btnPrev = $('#btn--prevSlide');               // Prev Button

    // Elements
    let slider = $('.slider');
    let sliderContent = $('.sliderContent');            // Slider
    let slide = $('.sliderContent .slide');             // Slide

    // Settings
    const size = slider[0].clientWidth;           // Slider width
    let counter = 1;                                    // #NO Slides
    let sliderWidth = slide.length * 100 + '%';         // Slides sum width
    let slideWidth = -size * counter + 'px';            // Slide width

    // Animation & Style
    function animationStyle(){
        sliderContent.css('transition' , 'transform 0.4s ease-in-out');
    }
    function executeAnimation(){
        sliderContent.css('transform', 'translateX('+ -size * counter + 'px');
    }

    // Set Slider width
    sliderContent.width(sliderWidth);

    // Set start slide
    sliderContent.css('transform', 'translateX('+ slideWidth +')');

    // Next slide
    btnNext.on('click', function () {
        if (counter >= slide.length - 1) return;
        animationStyle();
        counter++;
        executeAnimation();
    });

    // Prev slide
    btnPrev.on('click', function () {
        if (counter <= 0) return;
        animationStyle();
        counter--;
        executeAnimation();
    });

    // Sliding animation
    sliderContent.on('transitionend', function () {
        if (slide[counter].id === 'lastClone') {
            sliderContent.css('transition' , 'none');
            counter = slide.length -2;
            executeAnimation();
        }
        if (slide[counter].id === 'firstClone') {
            sliderContent.css('transition' , 'none');
            counter = slide.length - counter;
            executeAnimation();
        }
    });

}

$(document).ready(function(){

    // Slider
    if ($('.slider').length) {

        cloneSlider_elements();
        Slider();

    }

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

        let errorMessages = {
            input : "This input is require!",
            select : "Select an option!",
            checkbox : "Check this!",
            checkboxes : "Check on!",
            radio : "Please mark one option!",
            email : "It is not a valid e-mail address!",
            number : "This is not a number!"
        };

        $(".formError").remove();

        $('.form__item.validate').each(function () {

            let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            function IsEmail(email) {
                if(!regex.test(email)) {
                    return false;
                } else {
                    return true;
                }
            }

            let regNumbers = /^[0-9]+$/;
            function IsNumber(number) {
                if(!regNumbers.test(number)) {
                    return false;
                } else {
                    return true;
                }
            }

            let formField_checkboxItems = $(this).find('.formField .form__item__checkbox');
            let input = $(this).find('input[type=text]');
            let select = $(this).find('select');
            let checkbox = $(this).find('input[type=checkbox]');
            let radio = $(this).find('input[type=radio]');

            $(this).removeClass('errorFound');

            // Input
            if (input.val() === ''){
                input.after('<div class="formError">' + errorMessages.input + '</div>');
                input.closest('.form__item').addClass('errorFound');
            }
            // E-mail
            else if (input.data('type') === 'email' && IsEmail(input.val())==false){
                input.after('<div class="formError">' + errorMessages.email + '</div>');
                input.closest('.form__item').addClass('errorFound');
            }
            // Number
            else if (input.data('type') === 'numbersOnly' && IsNumber(input.val())==false){
                input.after('<div class="formError">' + errorMessages.number + '</div>');
                input.closest('.form__item').addClass('errorFound');
            }

            // Select
            if (select.val() === 'default') {
                select.after('<div class="formError">' + errorMessages.select + '</div>');
                select.closest('.form__item').addClass('errorFound');
            }

            // Checkbox
            if (!checkbox.is(":checked")){
                if (formField_checkboxItems.length > 1){
                    checkbox.closest('.formField').append('<div class="formError">' + errorMessages.checkboxes + '</div>');
                } else {
                    checkbox.closest('.formField').append('<div class="formError">' + errorMessages.checkbox + '</div>');
                }
                checkbox.closest('.form__item').addClass('errorFound');
            }

            // Radio Button
            if (!radio.is(":checked")){
                radio.closest('.formField').append('<div class="formError">' + errorMessages.radio + '</div>');
                radio.closest('.form__item').addClass('errorFound');
            }

        });

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

    // Floating Elements

    if ($('.floatingElements').length) {

        $(window).scroll(function () {

            let scroll = $(window).scrollTop();
            let floatingElements_offset = $('.floatingElements').offset().top - ($(window).height() / 1.5);

            if(scroll > floatingElements_offset){
                $('.floatingElements__item').each(function (i) {
                    setTimeout(function(){
                        $('.floatingElements__item').eq(i).addClass('fading');
                    }, 175 * (i+1));
                });
            }

        });
        $(window).scroll();

    }



    /*// Promo Scope
    $(window).scroll(function () {

        let scroll = $(window).scrollTop();
        let promoScope = $('.promoScope').offset().top - $(window).height();

        if(scroll > promoScope){
            $('.promoScope').css({
               'background-position' : 'center '+ scroll/16 +'px'
            });
        }

    });
    $(window).scroll();*/

    // jQuery Column Collapse Table

    let miniTable = $('.responsiveTable--mini');

    if (miniTable.length) {

        let theadTr = $('.responsiveTable--big--col3 thead').find('tr');
        let tbodyTr = $('.responsiveTable--big--col3 tbody').find('tr');
        let noColumn = theadTr[0].cells.length;
        let columnTitle = theadTr.find('th');

        for ( let i=0; i < noColumn; i++ ) {

            let columnContent = tbodyTr.find('td:nth-child(3n+' + (i + 1) + ')');
            let no_columnContent = columnContent.length;
            let ulContent = [];

            for (let j = 0; j < no_columnContent; j++) {
                ulContent.push('<li>' + columnContent[j].innerHTML + '</li>');
            }

            miniTable.append(
                '<div class="columnTitle">' + columnTitle[i].innerText + '</div>' +
                '<ul>' + ulContent.join('') + '</ul>'
            );
        }
    }

});

$(window).on('load', function () {
   $('.slider').css({
           'transition' : 'opacity 0.25s ease-in-out',
           'opacity' : '1'
   });
});


$(window).resize(function() {
    // Slider
    Slider();
});