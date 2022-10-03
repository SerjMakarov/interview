import Vue from 'vue';
global.Vue = Vue;
// import 'bootstrap';
import './sass/main.scss';
// import 'jquery-slinky';
// import 'jquery-mask-plugin';
// import './js/bootstrap/dropdown';
// import './js/bootstrap/tab';
// import './js/ex-inline-extentions.js';
require('../../js/main.js');

//добавление VUE
// import Vue from 'vue';
// global.Vue = Vue;

//файлы вендоров не из нпм
// import './js/custom-jquery-slinky';
// import './js/jquery.flexslider-min.js';
//маска на строку ввода номера
// import './js/jquery.inputmask.min.js';
// import './js/forms/phonemask';

// require('./js/forms/index.js');

// import './js/forms/dashboard.js';
// import './js/forms/about_swiper.js';
// import accordeon from "./js/components/accordeon"; './js/components/accordeon';

// document.body.contentEditable = true;
// $(document).ready(() => {
//     startHandleInputs();
//     startCatalogController();
//     startMobileCatalog();
//     startMobileSearch();
//     startStickyBasketController();
//     startKitchenDetailController();
//     startFilterController();
//     startFeedBackForm();
//     startActivationCard();
//     startOpenMobileMenu();
//     hidePreloader('.js-preloader');
// });
//
// $(document).ajaxComplete(function() {
//     startStickyBasketController();
// });
//
// // подстановка телефона из хедера на страницу
// $(document).ready(function() {
// var region_phone = $('.header .phone').html();
//     $('.phone_container').attr('href', 'tel:'+region_phone).html(region_phone);
// });
// /* КОСТЫЛЬ ДЛЯ ДОСТУПНОСТИ JQUERY в инлайновых скриптах сайта */
// // window.$ = window.jQuery = require("jquery");
//
// function startActivationCard() {
//     if ($('.js-activation-card').length === 0) return;
//     const startAccordeon = accordeon('.js-activation-card-accordeon');
//     startAccordeon();
// }
// function startFeedBackForm() {
//     if ($('.js-feedback-page').length === 0) return;
//     const startAccordeon = accordeon('.js-feedback-accordeon');
//     startAccordeon();
// }
// function hidePreloader(selector) {
//     const $preloader = $(selector);
//     setTimeout(function() {
//         $preloader.fadeOut('slow');
//     }, 500);
// }
// function showPreloader(selector) {
//     const $preloader = $(selector);
//     $preloader.fadeIn();
// }
// function startFilterController() {
//     if ($('.js-filter').length === 0) {
//         return;
//     }
//     $('.js-filter__category').on('click', function(e) {
//         e.preventDefault();
//         const $button = $(e.target);
//         const $conntrols = $button.next('.js-filter__controls');
//         if ($button.hasClass('opened')) {
//             $button.removeClass('opened');
//             $conntrols.slideUp(300);
//         } else {
//             $button.addClass('opened');
//             $conntrols.slideDown(300);
//         }
//     })
// }
//
// function startHandleInputs() {
//     $('.js-text-input__field').on('change focus focusin touchstart ', function(e) {
//         const $element = $(this);
//         $element.addClass('active');
//     }).on('focusout', function(e) {
//         const $element = $(this);
//         switch (true) {
//             case ($element.val().length !== 0):
//                 $element.addClass('active');
//                 $element.css('outline', '2px solid blue');
//                 break;
//             default:
//                 $element.removeClass('active');
//                 break;
//         }
//     });
// }
//
// function startMobileCatalog() {
//     const state = {
//         'opened': false,
//     };
//
//     var slinky = $('.js-menu').slinky({
//         // title: true
//     });
//     const $button = $('.js-toggle-mobile-catalog');
//     const $container = $('.js-mob-cat-container');
//     const $body = $('body');
//
//     const openCatalog = () => {
//         $button.addClass('header__m-catalog_opened');
//         $container.addClass('mob-cat-container_opened');
//         $body.addClass('sticked');
//         state['opened']= true;
//     };
//
//     $('.mobile-catalog .next, .mobile-catalog .back').on('click', (e) => {
//         e.preventDefault();
//         let myDiv = document.querySelector('.mob-cat-container');
//         myDiv.scrollTop = 0;
//     });
//
//     const closeCatalog = () => {
//         $button.removeClass('header__m-catalog_opened');
//         $container.removeClass('mob-cat-container_opened');
//         $body.removeClass('sticked');
//         slinky.jump('.js-root-menu');
//         state['opened'] = false;
//     };
//     $button.on('click', (e) => {
//         e.preventDefault();
//         if (state['opened']) {
//             closeCatalog();
//         } else {
//             openCatalog();
//         }
//     });
//     $(window).on('resize', () => {
//         if ($(window).width() > 991) {
//             closeCatalog();
//         }
//     });
// }
//
// function startMobileSearch() {
//     const $openButton = $('.js-search-mobile-open');
//     const $closeButton = $('.js-search-mobile-close');
//     const $mobileSearch = $('.js-search-mobile');
//
//     $openButton.on('click', function (e) {
//         e.preventDefault();
//         $mobileSearch.addClass('open');
//     });
//     $closeButton.on('click', function (e) {
//         e.preventDefault();
//         $mobileSearch.removeClass('open');
//     });
// }
//
// function startCatalogController() {
//     let catalogOpened = false;
//     const $desctopCatalogBtn = $('.js-open-catalog'), $overlayBlock = $('.js-overlay'), $catalog = $('.catalog'),
//         $allSubMenus = $('.js-catalog__submenu'), openCloseCatalog = (catalogStatus, e) => {
//             let $e = e;
//             switch (catalogStatus) {
//                 case true:
//                     $overlayBlock.removeClass('overlay_show');
//                     $desctopCatalogBtn.removeClass('show');
//                     $catalog.removeClass('catalog_show');
//                     $allSubMenus.removeClass('catalog__submenu_show');
//                     catalogOpened = false;
//                     break;
//                 case false:
//                     if ($overlayBlock[0] != $e) {
//                         $overlayBlock.addClass('overlay_show');
//                         $desctopCatalogBtn.addClass('show');
//                         $catalog.addClass('catalog_show');
//                         $('.search_result').hide();
//                         $('.js-search__input').val('');
//                         catalogOpened = true;
//                     }
//                     break;
//             }
//         };
//
//
//     $('.js-open-catalog, .js-overlay').on('click', (e) => {
//         if ($("#boxList").css("display") != "block" &&  !$(".overlay").hasClass('overlay_show_menu')) {
//             e.preventDefault();
//             openCloseCatalog(catalogOpened, e.target);
//         }
//     });
//
//     $('.js-catalog__item').on('mouseover', (e) => {
//         const $target =  $(e.currentTarget);
//         $target.siblings().find('.js-catalog__submenu').removeClass('catalog__submenu_show');
//         $target.children('.js-catalog__submenu').addClass('catalog__submenu_show');
//     });
// }
//
// function startStickyBasketController() {
//     const $window = $(window);
//     if($('.js-order-form__basket').length <= 0) return;
//     const orderFormOffset = $('.order-form__sticky-basket-cont').offset().top;
//     const $basket = $('.js-order-form__basket');
//     const $basketContainer = $('.js-order-form__sticky-basket-cont');
//     const $formContainer = $('.order-form__nav-container');
//     const $footer = $('.js-footer');
//     const $retailrocket = $('.order-form__retailrocket');
//     let basketOffcet = $basketContainer.offset().left;
//
//     $window.on('scroll resize', () => {
//         move();
//     });
//     move();
//
//     function move() {
//         // if(timer) {
//         //     window.clearTimeout(timer);
//         // }
//         //
//         // timer = window.setTimeout(function() {
//         //     console.clear();
//         //     console.log({
//         //         // 'order-form__nav-container': $formContainer.offset().left + $formContainer.outerWidth(),
//         //         // formOffset: orderFormOffset,
//         //         basketContainer: $basketContainer.offset().left,
//         //         basket: $basket.offset().left,
//         //         // scroll: $window.scrollTop(),
//         //         // footerOffset: $footer.offset().top ,
//         //     });
//
//         let koeff = 16;
//
//         switch (true) {
//             case ($window.scrollTop() >= orderFormOffset - koeff && $window.scrollTop() >= $footer.offset().top - $basket.outerHeight() - 70):
//                 $basketContainer.addClass('order-form__sticky-basket-cont_downstairs');
//                 $basket.removeClass('order-form__basket_fixed').css('left', 'unset');
//                 break;
//             case ($window.scrollTop() >= orderFormOffset - koeff && $window.scrollTop() >= $retailrocket.offset().top - $basket.outerHeight() - 70):
//                 $basketContainer.addClass('order-form__sticky-basket-cont_downstairs');
//                 $basket.removeClass('order-form__basket_fixed').css('left', 'unset');
//                 break;
//             case ($window.scrollTop() >= orderFormOffset - koeff):
//                 let dif = 0;
//                 if ($basket.offset().left > $basketContainer.offset().left) {
//                     basketOffcet = $basketContainer.offset().left - $basketContainer.offset().left;
//                 }
//                 $basket.addClass('order-form__basket_fixed').css('left', $basketContainer.offset().left);
//                 break;
//             default:
//                 $basket.removeClass('order-form__basket_fixed').css('left', 'unset');
//                 $basketContainer.removeClass('order-form__sticky-basket-cont_downstairs');
//         }
//         // }, 10);
//     }
// }
//
// function startKitchenDetailController() {
//     if($('.js-estimate-overlay').length === 0) {
//         return;
//     }
//     kitchenDetailSliderHandler();
//     kitchenTextDescriptionController();
//     kitchenEstimateController();
//     backCallFormController();
//     sendEmailEstimateFormController();
//     selectGridController();
//
//     function selectGridController() {
//         const $gridContainer = $('.js-grid-container');
//         if ($gridContainer.length === 0) {
//             return;
//         }
//         const $items = $gridContainer.find('.js-goods');
//         const $listBtn = $('.js-display-list');
//         const $moduleBtn = $('.js-display-module');
//         let state = ($items.hasClass('row') ? 'modules' : 'list');
//
//         const turnToList = () => {
//             if (state === 'list') {
//                 return;
//             }
//             $listBtn.addClass('display-selector__button_active');
//             $moduleBtn.removeClass('display-selector__button_active');
//             $items
//                 .removeClass('row')
//                 .find('.goods__item-container')
//                 .removeClass('col')
//                 .each(function() {
//                     const $container = $(this);
//                     $container.addClass('list-view');
//                 })
//             ;
//             state = 'list';
//         };
//         const turnToModule = () => {
//             if (state === 'modules') {
//                 return;
//             }
//             $listBtn.removeClass('display-selector__button_active');
//             $moduleBtn.addClass('display-selector__button_active');
//             $items
//                 .addClass('row')
//                 .find('.goods__item-container')
//                 .addClass('col')
//                 .each(function() {
//                     const $container = $(this);
//                     $container.removeClass('list-view');
//                 })
//             ;
//             state = 'modules';
//         }
//         $listBtn.on('click', (e) => {
//             e.preventDefault();
//             turnToList()
//         })
//         $moduleBtn.on('click', (e) => {
//             e.preventDefault()
//             turnToModule();
//         })
//         $( window ).resize(function() {
//             console.log($( window ).width());
//             if ($( window ).width() < 768) {
//                 turnToModule();
//             }
//         });
//     }
//
//     function backCallFormController() {
//         const $overlay = $('.js-phone-overlay');
//         const $openButton = $('.js-back-call-btn');
//         const $closeButton = $('.js-close-phone');
//         const $submitBtn = $('.js-submit-phone');
//         const $form = $('.js-phone-form');
//         const $mainContent = $overlay.find('.js-mail-phone-main');
//         const $successMsg = $overlay.find('.js-success-msg');
//         const $inputField = $form.find('input[name="phone"]');
//         const $document = $('body');
//
//         const sendForm = () => {
//             const items = $form.serializeArray().reduce((obj, item) => {
//                 obj[item.name] = item.value;
//                 return obj;
//             }, {});
//             $.ajax({
//                 url: '/ajax/kitchens_estimate/make-phonecall.php',
//                 data: items,
//                 success: (data) => {
//                     console.log(safelyParseJSON(data));
//                 }
//             });
//             $mainContent.fadeOut(300, () => {
//                 $form[0].reset();
//                 $successMsg.fadeIn(300, () => {
//                     setTimeout(() => {
//                         closeForm();
//                         $successMsg.fadeOut();
//                         $mainContent.fadeIn();
//                     }, 4000);
//                 })
//             });
//         };
//
//         const openForm = () => {
//             $overlay.addClass('show');
//             $document.addClass('sticked');
//         };
//         const closeForm = () => {
//             $overlay.removeClass('show');
//             $document.removeClass('sticked');
//             $successMsg.fadeOut();
//             $mainContent.fadeIn();
//             $form[0].reset()
//         };
//         $inputField.mask("+7 999 999 99 99");
//         $openButton.on('click', function(e) {
//             e.preventDefault();
//             openForm();
//         });
//         $closeButton.on('click', function(e) {
//             e.preventDefault();
//             closeForm();
//         });
//         $submitBtn.on('click', function (e) {
//             e.preventDefault();
//             sendForm();
//         });
//
//     }
//
//     function sendEmailEstimateFormController() {
//         const $overlay = $('.js-email-overlay');
//         const $openButton = $('.js-send-email-btn');
//         const $closeButton = $('.js-close-email');
//         const $submitBtn = $('.js-submit-email');
//         const $form = $('.js-email-form');
//         const $mainContent = $overlay.find('.js-mail-phone-main');
//         const $successMsg = $overlay.find('.js-success-msg');
//         const $inputField = $form.find('input[name="email"]');
//         const $document = $('body');
//
//         const sendForm = () => {
//             const items = $form.serializeArray().reduce((obj, item) => {
//                 obj[item.name] = item.value;
//                 return obj;
//             }, {});
//             $.ajax({
//                 url: '/ajax/kitchens_estimate/send-email.php',
//                 data: items,
//                 success: (data) => {
//                     console.log(safelyParseJSON(data));
//                 }
//             });
//             $mainContent.fadeOut(300, () => {
//                 $form[0].reset();
//                 $successMsg.fadeIn(300, () => {
//                     setTimeout(() => {
//                         closeForm();
//                         $successMsg.fadeOut();
//                         $mainContent.fadeIn();
//                     }, 4000);
//                 })
//             });
//         };
//         const openForm = () => {
//             $overlay.addClass('show');
//             $document.addClass('sticked');
//         };
//         const closeForm = () => {
//             $overlay.removeClass('show');
//             $document.removeClass('sticked');
//             $successMsg.fadeOut();
//             $mainContent.fadeIn();
//             $form[0].reset();
//         };
//         $openButton.on('click', function(e) {
//             e.preventDefault();
//             openForm();
//         });
//         $closeButton.on('click', function(e) {
//             e.preventDefault();
//             closeForm();
//         });
//         $inputField.on('change', function() {
//             $inputField.removeClass('invalid');
//         });
//         $submitBtn.on('click', function (e) {
//             e.preventDefault();
//             if ($inputField.val().length === 0) {
//                 $inputField.addClass('invalid')
//             }
//             if (!$inputField.is(":invalid") && !$inputField.hasClass('invalid')) {
//                 sendForm();
//             }
//         });
//     }
//
//     function kitchenTextDescriptionController() {
//         const $text = $('.js-kitchen-detail__text');
//         const $button = $('.js-kitchen-detail__show-more');
//         if ($text.length === 0 || $button.length === 0 || $(window).width() <= 768) {
//             return;
//         }
//         if ($text.height() <= 390) {
//             return;
//         }
//         let initHeight = $text.outerHeight();
//         let isOpened = false;
//         let permanentlyOpened = false;
//         // $text.addClass('kitchen-detail__text_fixed');
//         $text.css('height', '390px');
//         $button.css('visibility', 'visible');
//         $button.on('click', function(e) {
//             e.preventDefault();
//             if (isOpened) {
//                 // $text.addClass('kitchen-detail__text_fixed');
//                 $text.stop().animate({height: "390px"}, 200, function() {
//                     $button.removeClass('opened');
//                     isOpened = false;
//                 });
//             } else {
//                 // $text.removeClass('kitchen-detail__text_fixed');
//                 $text.stop().animate({height: `${initHeight}px`}, 200, function() {
//                     isOpened = true;
//                     $button.addClass('opened');
//                 });
//             }
//
//         });
//         $(window).on('resize', function() {
//             initHeight = $text.css('height', 'auto').outerHeight();
//             if ($(window).width() <= 768 || permanentlyOpened) {
//                 $text.css('height', 'auto');
//                 $button.css('display', 'none');
//                 permanentlyOpened = true;
//                 return;
//             }
//             $text.css('height', '390px');
//             $button.removeClass('opened');
//             isOpened = false;
//         });
//     }
//
//     function kitchenDetailSliderHandler() {
//         if ($('.js-kitchen-detail__slider-container').length > 0) {
//             // The slider being synced must be initialized first
//             $('#carousel').flexslider({
//                 animation: "slide",
//                 controlNav: false,
//                 animationLoop: false,
//                 slideshow: false,
//                 itemWidth: 68,
//                 itemMargin: 8,
//                 minItems: 0,
//                 maxItems: 4,
//                 touch: true,
//                 asNavFor: '#slider'
//
//             });
//
//             $('#slider').flexslider({
//                 animation: "slide",
//                 controlNav: false,
//                 animationLoop: false,
//                 slideshow: false,
//                 touch: true,
//                 sync: "#carousel"
//             });
//         }
//     }
//
//     function kitchenEstimateController() {
//         const updateUrl = '/ajax/kitchens_estimate/update.php';
//         const preloaderSelector = '.js-estimate-preloader';
//         const $preloader = $(preloaderSelector);
//         const $container = $('.js-estimate-container');
//         const fillContainer = (items) => {
//             const $total = $('.total .price');
//             $total.text(`${items['itogo']}, -`);
//             const html = Object.keys(items).map(key => {
//                 const {
//                     name,
//                     size,
//                     img,
//                     code,
//                     quantity,
//                     price,
//                 } = items[key];
//                 if (typeof code === "undefined") return;
//                 return `<div class="checkbox estimate-checkbox js-estimate-checkbox" data-quantity="${quantity}" data-code="${code}">
//                     <input class="checkbox__control estimate-checkbox__control" type="checkbox" checked="checked" id="${code}es">
//                     <label class="checkbox__label estimate-checkbox__label" for="${code}es">
//                         <img class="estimate-checkbox__item-img" src="${img}">
//                         <div class="estimate-checkbox__description">
//                             <div class="name">${name}</div>
//                             <div class="size">Размер: ${size}</div>
//                             <div class="vendor-code">
//                                 <span class="label">Код товара: </span>
//                                 <span class="code"></span>${code}</span>
//                             </div>
//                         </div>
//                         <div class="counter estimate-checkbox__counter">
//                             <div class="quantity">
//                                 <div class="quantity__control">
//                                     <button class="btn quantity__button quantity__button_minus js-estimate-btn-minus"></button>
//                                     <input type="number" class="quantity__input" step="1" min="0" max="1000" value="${quantity}">
//                                     <button class="btn quantity__button quantity__button_plus js-estimate-btn-plus"></button>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="estimate-checkbox__price">
//                             ${price}
//                         </div>
//                     </label>
//                 </div>`;
//             }).join('');
//             $container.html(html);
//             $container.prepend($preloader);
//             startPlusMinusHandlers();
//             hidePreloader(preloaderSelector);
//         };
//         const updateItemsInEstimate = (items) => {
//             $container.prepend($preloader);
//             // showPreloader(preloaderSelector);
//             $.ajax({
//                 url: updateUrl,
//                 data: items,
//                 success: (data) => {
//                     console.log(safelyParseJSON(data));
//                     fillContainer(safelyParseJSON(data));
//                 }
//             });
//         };
//         const drawAddedItem = ($target) => {
//             $target
//                 .removeClass('goods__smeta-btn_show')
//                 .next('.js-smeta-btn_remove').addClass('goods__smeta-btn_show')
//                 .closest('.js-goods__item-card').addClass('in-estimate')
//             ;
//         };
//         const drawRemovedItem = ($target) => {
//             $target
//                 .removeClass('goods__smeta-btn_show')
//                 .prev('.js-smeta-btn_add').addClass('goods__smeta-btn_show')
//                 .closest('.js-goods__item-card').removeClass('in-estimate')
//             ;
//         };
//
//         const startAddRemoveItemsOuterEstimate = () => {
//             // const $addBtns = $('.js-smeta-btn_add');
//             // const $removeBtns = $('.js-smeta-btn_remove');
//             $('.js-smeta-btn_add').on('click', function(e) {
//                 e.preventDefault();
//                 const $target = $(e.target);
//                 const code = $target.closest('.js-goods__item-card').data('code');
//                 drawAddedItem($target);
//                 updateItemsInEstimate({ [code] : 1});
//             });
//             $('.js-smeta-btn_remove').on('click', function(e) {
//                 e.preventDefault();
//                 const $target = $(e.target);
//                 const code = $target.closest('.js-goods__item-card').data('code');
//                 drawRemovedItem($target);
//                 updateItemsInEstimate({ [code] : 0});
//             });
//         };
//
//         const startPlusMinusHandlers = () => {
//             $('.js-estimate-btn-plus').on('click', function(e) {
//                 e.preventDefault();
//                 const input = this.parentNode.querySelector('input[type=number]');
//                 input.stepUp();
//                 $(this).closest('.js-estimate-checkbox').attr('data-quantity', input.value);
//             });
//             $('.js-estimate-btn-minus').on('click', function(e) {
//                 e.preventDefault();
//                 const input = this.parentNode.querySelector('input[type=number]');
//                 input.stepDown();
//                 $(this).closest('.js-estimate-checkbox').attr('data-quantity', input.value);
//             });
//         };
//         const startSaveCurrentEstimate = () => {
//             const $saveBtn = $('.js-estimate-save');
//             $saveBtn.on('click', (e) => {
//                 const items = {};
//                 e.preventDefault();
//                 console.clear();
//                 $('.js-estimate-checkbox').each((index, el) => {
//                     const $element = $(el);
//                     const $control = $element.children('input[type="checkbox"]');
//                     const code = $element.attr('data-code');
//                     items[code] = ($control.prop("checked")) ? $element.attr('data-quantity') : 0;
//                     console.log({
//                         code,
//                         quantity: ($control.prop("checked")) ? $element.attr('data-quantity') : 0
//                     })
//                 });
//                 closeEstimate();
//                 updateItemsInEstimate(items);
//             });
//         };
//         const $openEstimateBtn = $('.js-open-estimate');
//         const $closeEstimateBtns = $('.js-close-estimate');
//         const $overlay = $('.js-estimate-overlay');
//         const $document = $('body');
//         const openEstimate = () => {
//             $overlay.addClass('show');
//             $document.addClass('sticked');
//         };
//         const closeEstimate = () => {
//             $overlay.removeClass('show');
//             $document.removeClass('sticked');
//         };
//         $openEstimateBtn.on('click', function(e) {
//             e.preventDefault();
//             openEstimate();
//             return false;
//         });
//         $closeEstimateBtns.on('click', function(e) {
//             e.preventDefault();
//             closeEstimate();
//             return false;
//         });
//
//         function filterController() {
//             const preloaderSelector = '.js-estimate-goods-preloader';
//             hidePreloader(preloaderSelector);
//             const $form = $(".js-filter-kitchen");
//             $form.submit(function (e) {
//                 e.preventDefault();
//                 updateCollectionItems(getFormData());
//             });
//
//             function getFormData() {
//                 console.log($form.serialize());
//                 return $form.serialize();
//             }
//
//             function updateCollectionItems(inputData) {
//                 showPreloader(preloaderSelector);
//                 $.ajax({
//                     type: "POST",
//                     url: "/ajax/kitchen/jsonKitchen.php",
//                     data: decodeURI(inputData),
//                     success: function (data) {
//                         console.log('success');
//                         $(".js-goods").html(data);
//                         startAddRemoveItemsOuterEstimate();
//                         hidePreloader(preloaderSelector);
//                     }
//                 });
//             }
//
//             $(".js-clear-filter").click(function (e) {
//                 e.preventDefault();
//                 $form.get(0).reset();
//                 updateCollectionItems(getFormData());
//             });
//
//             $('.js-select-sort').on('click', function (e) {
//                 e.preventDefault();
//                 updateCollectionItems(getFormData() + '&sort=' + $(this).data('sort'))
//             })
//         }
//         filterController();
//         updateItemsInEstimate({});
//         startPlusMinusHandlers();
//         startAddRemoveItemsOuterEstimate();
//         startSaveCurrentEstimate();
//     }
// }
//
// function safelyParseJSON (json) {
//     var parsed = false;
//     try {
//         parsed = JSON.parse(json);
//     } catch (e) {
//         return false;
//     }
//     return parsed;
// }
//
// //показываем/скрываем мобильное меню
// function startOpenMobileMenu() {
//     $('#footer__mobmenu-open').on('click', function() {
//     $('.header__mobilemenu').css('display') == 'block' ? $('.header__mobilemenu').hide() : $('.header__mobilemenu').show();
//     $('.search_result').hide();
//     $('.js-search__input').val('');
//     window.scrollTo(0, 0);
//     $('#footer__mobmenu-open').toggleClass("footer__mobmenu-openbg footer__mobmenu-closebg")
//   });
// };
//
// Number.prototype.mdPriceFormat = function(mainPageFormat = false) {
//     // console.log('format: '+this);
//     let formattedPrice;
//     if (!isNaN(this)) {
//         formattedPrice = this
//             .toLocaleString('ru', {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2
//             })
//             .replace(/\u00a0/g,' ')
//             .replace('.',',')
//             .replace(',00',',- ');
//         // новый формат 2022 г.
//         if (mainPageFormat) {
//             formattedPrice = formattedPrice.replace(',-','');
//         }
//
//     } else {
//         formattedPrice = null;
//     }
//
//     // console.log('result: ' + formattedPrice);
//     return formattedPrice;
// }
//
// let myCalendar = new VanillaCalendar({
//     selector: "#myCalendar"
// })
//
// import './js/forms/cart';
