import {Swiper, Navigation, Pagination, Scrollbar, Controller, EffectFade, Autoplay} from 'swiper';
Swiper.use([Navigation, Pagination, Scrollbar, Controller, EffectFade, Autoplay]);

if (document.getElementById("about_swiper")){
  new Swiper('.about-slider', {
    effect: 'fade',
    speed: 500,
    loop: true,
    navigation: {
      nextEl: '.about-slider-button-next',
      prevEl: '.about-slider-button-prev'
    },
    pagination: {
      el: '.about-slider-pagination',
      type: 'bullets',
      clickable: true
    },
  });
}
