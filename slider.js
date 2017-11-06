function hoverSlider($slider, customOptions){
    var options = {
        sliderPositionLeft: $slider.offset().left,
        $slides: $slider.find('img'),
        slideCount: $slider.find('img').length,
        sliderWidth: $slider.outerWidth(),
        $dots: {},
        dotsContainerClass: 'dots',
        dotClass: 'dot'
    };

    var state = $.extend(options, customOptions);

    $slider.append('<div class="' + state.dotsContainerClass + '"></div>'); // Добавляем контейнер для булитов

    for(var i = 0; i < state.slideCount; i++){
        $slider.find('.' + state.dotsContainerClass).append('<div class="' + state.dotClass + '"></div>'); // Добавляем буллиты
    }

    state.$dots = $slider.find('.' + state.dotClass);

    // При загрузки страницы показываем первый слайд
    state.$slides.css('display', 'none');
    state.$slides.eq(0).css('display', 'block').addClass('active');
    state.$dots.eq(0).addClass('active');

    var step = state.sliderWidth / state.slideCount;

    state.$dots.css('width', step); //Устанавливаем ширину булитов равной шагу

    $(window).on('resize', function () { // При ресайзе пересчитываем ширину слайдера, ширину булитов и шаг
        state.sliderWidth = $slider.outerWidth();
        step = state.sliderWidth / state.slideCount;
        state.$dots.css('width', step);
    });

    $slider.mousemove(function () {
        var size = window.event.pageX - state.sliderPositionLeft;
        for(var i = 1; i <= state.slideCount; i++){
            if( size <= (step * i) && !state.$slides.eq(i-1).hasClass('active') ){
                state.$slides.css('display', 'none').removeClass('active');
                state.$dots.removeClass('active');
                state.$slides.eq(i-1).css('display', 'block').addClass('active');
                state.$dots.eq(i-1).addClass('active');
                break;
            } else if( size <= (step * i) && state.$slides.eq(i-1).hasClass('active') ) {
                break;
            }
        }
    });
}

hoverSlider($('.slider-wrapper'), {
});