// import Vue from "vue";
// import cartStockModal from "./cartStockModal.vue";
//
// const VueInputMask = require('vue-inputmask').default
// Vue.use(VueInputMask)
//
// // создаёт объект Vue cart только на странице корзины
// if (document.getElementById("new-cart")) {
//
//
// window.$vmcart = new Vue({
//     el: '#new-cart',
//     data: {
//         // для таймера отсчёта изменения кол-ва товаров...
//         timerCounter: false,
//         // признак обновления ТС (обновляется с сервера)
//         isUpdateGes: false,
//         // список ошибок ТС
//         errors: [],
//         // корзина (обновляется с сервера)
//         basket: {
//             items: [],
//             store: [],
//             basePrice: 0,
//             basePriceFormatted: '',
//             discountCard: 0,
//             discountCardFormatted: '',
//             discountPromo: 0,
//             discountPromoFormatted: '',
//             price: 0,
//             datePrint: new Date().toLocaleString(),
//             priceFormatted: '',
//             discountAction: 0,
//             discountActionFormatted: '',
//             weight: 0,
//             Result: {
//                 ProcSkid: 0,
//                 ProcBonus: 0,
//                 GoodsQuantity: 0,
//                 BonusUsed: false,
//                 BonusAvailable: 0
//             },
//             CustomAppliedSystem: {
//                 BasketUserID : 0,
//                 MaxBonus4Goods: {
//                     AmountBonus: 0,
//                     AmountPriceBonus: 0,
//                 },
//             }
//         },
//         // дополнительная корзина
//         basketExtra: [],
//
//         // бонусы (обновляется с сервера)
//         bonusInfoStorage: {
//             infoAvailableBonus: null,
//             infoCountBonus: null,
//             isNeedConfirm: false,
//             wantUseBonus: false
//         },
//         // можно ли сделать заказ (обновляется с сервера)
//         canOrder: true,
//         // дисконтная карта (обновляется с сервера)
//         discountCard: {
//             CAN_USE_BONUS: false,
//             ID: null,
//             isApplied: false,
//             MESSAGE: null,
//             STATUS: null,
//             NAME: null,
//         },
//         // сообщения над кнопкой "оформить заказ" (обновляется с сервера)
//         flashErrorsBottom: [],
//         // сообщения вверху корзины (обновляется с сервера)
//         flashErrorsTop: [],
//         // промокоды (обновляется с сервера)
//         promoCodeData: {
//             promo_code_list: [],
//             errorMessagesList: [],
//             infoMessagesList: [],
//         },
//         // карта много.ру (обновляется с сервера)
//         mnogoru: {
//             isError: false,
//             errorText: '',
//             text: '',
//             saved_card: null,
//             ajax_token: null,
//             calc_bonus: 0
//         },
//         // регион (обновляется с сервера)
//         REPRESENTATION_ID: 8,
//         // информация о пользователе (обновляется с сервера)
//         user: {
//             isAuthorized: false,
//             // TODO: это нигде не используется
//             userGroupArray: [],
//             // показывать ли кнопку "сохранить в планировщик кухонь"
//             isModels3D: false,
//             // тип "физическое или юридическое лицо" (используется в js при проверке перед отправкой корзины и при определении текста ошибки)
//             type: 'fiz',
//         },
//
//         // кол-во совсем недоступных для продажи (рассчитывается локально)
//         outOfStockCounter: 0,
//         // кол-во не в наличии (рассчитывается локально)
//         notRemainsCounter: 0,
//         // общее кол-во (рассчитывается локально)
//         existCounter: 0,
//
//         // данные для передачи в дочерний компонент cartStockModal
//         stockModal: {
//             items: {},
//             store: {},
//         },
//
//         // маркетинговые переменные
//         marketing: {
//             // заполняется после получения данных из апи (но не напрямую)
//             authUserToSite: null,
//             // город
//             rrSendCity: null,
//             // trackId
//             tgConfig: {
//                 basket_products: [],
//                 page_type: "cart",
//                 user_email: null,
//                 user_firstname: null,
//                 user_id: null,
//                 user_lastname: null
//             }
//         },
//
//         // sert: {
//         //     isOpen: false
//         // },
//         // corp: {
//         //     isOpen: false
//         // },
//
//         // компоненты пользовательского интерфейса - формы, поля ввода, модалки...
//         ui: {
//             // прелоадер корзины
//             isShowAjaxCartPreloader: true,
//             // чекбокс: выбраны все товары (значение по-умолчанию определяется в зависимости от того, есть ли доступные для продажи товары)
//             allSelected: null,
//             // форма "дисконтная карта"
//             discountCardForm: {
//                 ID: null,
//                 NAME: null,
//                 isIdInvalid: false,
//                 isNameInvalid: false,
//                 isShowForm: true,
//                 isShowInfo: false,
//             },
//             // форма "промокод"
//             promoCodeForm: {
//                 step1: true,
//                 step2: true,
//                 name: '',
//                 errorMessage: '',
//                 isPromocodeErrors: false,
//             },
//             // форма "много.ру"
//             mnogoruForm: {
//                 isMnogoruStep1: true,
//                 isMnogoruStep2: true,
//                 isMnogoruStep3: false,
//                 cardId: null,
//             },
//             // блок "подробнее"
//             aboutTotal: {
//                 // открыт ли блок
//                 isOpen: false,
//             },
//
//             // модальное окно "очистить корзину"
//             modalClearCart: {
//                 isOpen: false
//             },
//             // модальное окно "смета"
//             modalEstimate: {
//                 isOpen: false
//             },
//             // модальное окно "наличие по-магазинам"
//             modalCartStock: {
//                 isOpen: false
//             },
//
//             /**
//              * Форма "Сохранение смет"
//              */
//             estimateForm: {
//                 timeout: null,
//                 name: null,
//                 // признак успешного сохранения формы
//                 isSuccess: false,
//                 // сообщение об ошибке
//                 errorMessage: null,
//                 // идет запрос (на это время блокируется кнопка)
//                 isProcessing: false,
//             },
//
//             // подсказка по промокодам
//             promoQw: {
//                 isOpen: false
//             },
//             // подсказка по карте "много.ру"
//             mnogoruQw: {
//                 isOpen: false
//             },
//             // подсказка по дисконтной карте
//             discountCardQw: {
//                 isOpen: false
//             },
//             // кнопка "оформить заказ"
//             submitButton: {
//                 isDisabled: false,
//                 text: 'Оформить заказ',
//             }
//
//         },
//
//         cdekParams: {
//             maxWeight: 'Y',
//         },
//
//         // TODO: проверить, используется ли
//         state: {},
//
//         // TODO: проверить, используется ли
//         error_messages: {
//             onlyindividual: 'К сожалению, в текущий момент, доставка товаров в данный регион возможна только для физических лиц. Пожалуйста оформите заказ как физическое лицо.',
//             // остальные не используются
//             // wrongWeightAndGabarites: 'Уважаемый покупатель, к сожалению, временно мы не доставляем товары весом больше ${this.cdekParams.maxWeight}кг или имеют неприемлемые габариты для выбранной Вами транспортной компании.',
//             // wrongWeight: 'Уважаемый покупатель, к сожалению, временно мы не можем доставить заказа весом больше <?= $arResult["SDEK_PARAMS"]["MAX_WEIGHT"] ?>кг в Ваш регион. Пожалуйста, уменьшите суммарный вес вашего заказа до <?= $arResult["SDEK_PARAMS"]["MAX_WEIGHT"] ?>кг.',
//             // wrongGabarites: 'Уважаемый покупатель, к сожалению, временно мы не доставляем выбранный товар в Ваш регион, поскольку данный товар имеет неприемлемые габариты для выбранной Вами транспортной компании.',
//             // wrongVolumeWeight: 'Уважаемый покупатель, к сожалению, временно мы не можем доставить заказ c объемным весом превышающий <?= $arResult["SDEK_PARAMS"]["MAX_WEIGHT"] ?>кг в Ваш регион. (Ш*В*Д / 5000)',
//         },
//
//         // уже не используется
//         basketProductsParams: {
//             maxProps: {
//                 dimensions: {
//                     width: 0,
//                     height: 0,
//                     length: 0
//                 }
//             }
//         },
//
//         MAX_PARAMS: {
//             GABARITY: 'N',
//             WEIGHT: 'N',
//             VOLUME_WEIGHT: 'N',
//             PRODUCT: [],
//         },
//     },
//     /**
//      * Vue lifecycle hook. Called synchronously after the instance is created.
//      */
//     created() {
//         // запрашивает в API информацию для формирования объекта
//         this.loadData();
//
//         // инициализирует обработчик клика по оверлею: скрытие некоторых модальных окон, если те открыты
//         $('.overlay').click((e) => {
//             if (this.ui.modalClearCart.isOpen) {
//                 this.uiModalClearCartClose();
//                 return false;
//             } else if (this.ui.modalCartStock.isOpen) {
//                 this.uiModalCartStockClose();
//                 return false;
//             } else if (this.ui.modalEstimate.isOpen) {
//                 this.uiModalEstimateClose();
//                 return false;
//             }
//             else if (this.ui.promoQw.isOpen) {
//                 this.uiPromoQwClose();
//                 return false;
//             }
//                 // else if (sertDisplay == "block") {
//                 //     e.preventDefault();
//                 //     basket.hideBlock(sert.item, false);
//                 //     return false;
//                 // } else if (corpDisplay == "block") {
//                 //     e.preventDefault();
//                 //     basket.hideBlock(corp.item, false);
//             //     return false;}
//             else if (this.ui.discountCardQw.isOpen) {
//                 this.uiDiscountCardQwClose();
//                 return false;
//             } else if (this.ui.mnogoruQw.isOpen) {
//                 this.uiMnogoruQwClose();
//                 return false;
//             }
//         });
//     },
//     components: {
//       'cart-stock-modal': cartStockModal,
//     },
//     mounted() {
//         // маска для много.ру
//         $('input[name="mnogoru_card"]').mask("99999999");
//
//         // маска для карты Максидом
//         //Inputmask("DK 9{0,9}").mask($('input[name="coupon"]'));
//
//         // маска для промокода
//         $('input[name="promocode"]').mask('AAAAAAAAAAAAAAAAAAAA', {
//             'translation': {
//                 A: {pattern: /(\w|[А-Яа-я\-])/},
//             }
//         });
//     },
//     methods: {
//
//         /**
//          * Наполняет данными объект Vue, считай, перерисовывает страницу
//          * Данные приходят обычно в момент первоначальной загрузки страницы из ajax, а затем заново поступают в процессе других ajax-запросов.
//          * Т.к. данные возвращаются всегда в одинаковом виде, для перерисовки страницы используется одна функция.
//          * @param data
//          */
//         renderData(data) {
//             Object.entries(data).forEach(([key, value]) => {
//
//                 // для объекта "корзина"
//                 if (key == 'basket') {
//                     // console.log(key);
//                     // console.log(value);
//
//                     // добавить реактивные свойства.
//                     // т.к. возвращается объекты (массивы с кастомными ключами), нужно преобразовать их в массивы
//                     const objects = ['items', 'store'];
//                     Object.entries(value).forEach(([key, value]) => {
//                         if (objects.includes(key)) {
//                             // console.log(key);
//                             Vue.set($vmcart.basket, key, Object.values(value));
//                             // Vue.set($vmcart.basket, 'items', Object.values(value.items));
//                             // Vue.set($vmcart.basket, 'store', Object.values(value.store));
//                         } else {
//                             Vue.set($vmcart.basket, key, value);
//                         }
//                     });
//
//                     //$vmcart.set(this.basket, 'items', data.basket.items);
//
//                     //Object.assign({}, this.basket.items, value.ITEMS);
//                     //$vmcart.set(this.key, 'items', data.key.items);
//
//                     // если не было ответа из системы, видимо, нужно обнулить часть итоговых свойств?
//                     if (data.basket.Result == null) {
//                         //Vue.set($vmcart.basket, key, Object.values(value));
//                         this.basket.Result.GoodsQuantity = null;
//                     }
//                 }
//             });
//
//             this.$set(this, 'basketExtra', Object.values(data.basketExtra));
//
//             this.user = data.user;
//             this.REPRESENTATION_ID = data.REPRESENTATION_ID;
//             this.canOrder = data.canOrder;
//
//             this.basket.datePrint = new Date().toLocaleString();
//             this.bonusInfoStorage = data.bonusInfoStorage;
//             this.discountCard = data.discountCard;
//             this.promoCodeData = data.promoCodeData;
//             this.mnogoru = data.mnogoru;
//             this.flashErrorsTop = data.flashErrorsTop;
//             this.flashErrorsBottom = data.flashErrorsBottom;
//             this.isUpdateGes = data.isUpdateGes;
//             this.errors = data.errors;
//
//             // Load marketing data and compute it
//             this.marketing = data.marketing;
//
//             // инициализировать TrackAd
//             this.marketingInitTrackAd();
//             // инициализировать dataLayer
//             this.marketingInitDataLayer();
//
//             //console.log($vmcart);
//
//             // Object.keys(data).map(entry => {
//             //     console.log(entry);
//             //     this.entry = data.entry;
//             //     // const key = Object.keys(entry)[0];
//             //     // console.log (entry[key].name);
//             //     console.log(data.entry);
//             //     //return { name: entry[key].name, data: entry[key].data };
//             // });
//             //this.json = null;
//
//             // p(entry => {
//             //     const key = Object.keys(entry)[0];
//             //     return { name: entry[key].name, data: entry[key].data };
//             // }
//             //
//             // data.map(function(value, key) {
//             //     alert(key);
//             //     this.key = value;
//             // });
//
//             // подсчитать ИТОГО
//             this.calculateStockCounters();
//
//             // вычислить видимость форм
//             this.calculateDiscountCardVisibility();
//             this.calculatePromocodeVisibility();
//             this.calculateMnogoruVisibility();
//
//             // добавить функции-наблюдатели после первой загрузки, чтобы они не вызывались при инициализации...
//             // изменение количества товара
//             this.basket.items.forEach((val) => {
//                 // из-за особенностей vue установим кастомный ватчер на каждый объект корзины отдельно
//                 this.$watch(() => val, this.handleChangeItem, {deep: true});
//             });
//         },
//
//         /**
//          * Возвращает имя товара
//          * @param item
//          * @returns {*}
//          */
//         getItemName: function (item) {
//             return item.PRODUCT.PROPERTY_UP_PROP10090_VALUE && item.PRODUCT.PROPERTY_UP_PROP10090_VALUE.NAME ? item.PRODUCT.PROPERTY_UP_PROP10090_VALUE.NAME : item.CATALOG.NAME;
//         },
//
//         /**
//          * Возвращает текст статуса товара (в зависимости от кода статуса)
//          * @param item
//          * @returns {string}
//          */
//         getItemStatus: function (item) {
//             return item.PRODUCT_STATUS == 'O' ? 'Нет в наличии в вашем регионе' : 'Продается только в Гипермаркете';
//         },
//
//         /*
// sertCreate: function () {
//     let parent = $('#sertificates');
//     // создаем блоки сертификатов и пихаем их в родительский блок sertificates
//     parent.append('<div class="of-basket__total-info-row sert-block">' +
//         '<div class="of-basket__check">' +
//         '<div class="of-basket__head">СЕРТИФИКАТ</div>' +
//         '<svg class="icon-cart-check"><use xlink:href="#icon-cart-check"></use></svg>' +
//         '</div>' +
//         '<div class="of-basket__actions">' +
//         '<div class="of-basket__link sert-to-step1">Добавить</div>' +
//         '<div class="of-basket__link of-basket__link--red sert-delete">Удалить</div>' +
//         '</div>' +
//         '</div>');
//
//     // навешиваем событие по клику на "добавить"
//     $('.sert-to-step1').each(function () {
//         $(this).click(() => {
//             $("#sert-step2").fadeIn("fast");
//         });
//     });
//     // навешиваем событие по клику на "удалить"
//     $('.sert-delete').each(function () {
//         $(this).click(() => {
//             $(this).parent().parent().remove();
//             // проверяем остались ли элементы в блоке, если нет, открываем первый этап
//             if ($("#sertificates").children().length == 0) {
//                 $("#sert-step1").fadeIn("fast");
//             }
//         });
//     });
// },*/
//
//
// /**
//  * Инициализирует модальные окна и всплывающие подсказки
//  */
//         uiModalClearCartOpen: function (event) {
//             this.ui.modalClearCart.isOpen = true;
//             $('.overlay').addClass("overlay_show");
//         },
//         uiModalClearCartClose: function (event) {
//             this.ui.modalClearCart.isOpen = false;
//             $('.overlay').removeClass("overlay_show");
//         },
//         /*
//         sertOpen: function (event) {
//             this.sert.isOpen = true;
//             $('.overlay').addClass("overlay_transparent");
//         },
//         sertClose: function (event) {
//             this.sert.isOpen = false;
//             $('.overlay').addClass("overlay_transparent");
//         },
//         */
//         // corpOpen: function (event) {
//         //     this.corp.isOpen = true;
//         //     $('.overlay').addClass("overlay_transparent");
//         // },
//         // corpClose: function (event) {
//         //     this.corp.isOpen = false;
//         //     $('.overlay').addClass("overlay_transparent");
//         // },
//         uiDiscountCardQwOpen: function (event) {
//             this.ui.discountCardQw.isOpen = true;
//             $('.overlay').addClass("overlay_transparent");
//         },
//         uiDiscountCardQwClose: function (event) {
//             this.ui.discountCardQw.isOpen = false;
//             $('.overlay').removeClass("overlay_transparent");
//         },
//         uiPromoQwOpen: function (event) {
//             this.ui.promoQw.isOpen = true;
//             $('.overlay').addClass("overlay_transparent");
//         },
//         uiPromoQwClose: function (event) {
//             this.ui.promoQw.isOpen = false;
//             $('.overlay').removeClass("overlay_transparent");
//         },
//         uiMnogoruQwOpen: function (event) {
//             this.ui.mnogoruQw.isOpen = true;
//             $('.overlay').addClass("overlay_transparent");
//         },
//         uiMnogoruQwClose: function (event) {
//             this.ui.mnogoruQw.isOpen = false;
//             $('.overlay').removeClass("overlay_transparent");
//         },
//
//         /**
//          * Открывает модальное окно с таблицей наличия по магазинам
//          */
//         uiModalCartStockOpen: function () {
//             this.ui.modalCartStock.isOpen = true;
//             $('.overlay').addClass("overlay_show");
//         },
//         /**
//          * Закрывает модальное окно с таблицей наличия по магазинам
//          */
//         uiModalCartStockClose: function () {
//             this.ui.modalCartStock.isOpen = false;
//             $('.overlay').removeClass("overlay_show");
//         },
//
// /**
//  * Отправляет корзину
//  */
// cartSubmit: function () {
//     // Кликаем на оформить заказ и проверяем все ли в наличии.
//         // TODO: видимо эта проверка не нужна, т.к. данных для нее давно нет
//         // var max_weight = $("#order_value_weight").data("max_weight");
//         // var max_gabarity = $("#order_value_weight").data("max_gabarity");
//         // var volume_weight = $("#order_value_weight").data("volume_weight");
//         // end of TODO:
//
//         // console.log(max_weight, max_gabarity, volume_weight, region);
//
//         if (this.user.type == 'org' && this.REPRESENTATION_ID == 8) {
//             this.showModal('К сожалению, в текущий момент, доставка товаров в данный регион возможна только для физических лиц. Пожалуйста оформите заказ как физическое лицо.');
//         // } else if ((max_weight == "Y" || max_gabarity == "Y" || volume_weight == "Y") && Number(region) == 8) {
//         //     this.showModal('К сожалению, Вы не можете оформить заказ т.к в заказе существуют товары не удовлетворяющие условиям. ');
//         } else {
//
//             this.ui.submitButton.isDisabled = true;
//             this.ui.submitButton.text = "Подождите...";
//
//             if (this.REPRESENTATION_ID == 8) {
//                 // для регионов делает дополнительный запрос в СДЕК для проверки, можно ли оформить заказ с данной корзиной.
//                 $.ajax(
//                     "/ajax/sdek/getPriceIsSdek.php",
//                     {
//                         method: "POST",
//                         dataType: "json",
//                         data: {action: "CheckStore"},
//                         success: function (data) {
//
//                             if (data.status == "N") {
//
//                                 if (data.mess != '') {
//                                     this.showModal(data.mess);
//                                 } else {
//                                     this.showModal('К сожалению, Вы не можете оформить заказ, т.к в нём существуют товары, не удовлетворяющие условиям.');
//                                 }
//                                 setTimeout(function () {
//                                     this.ui.submitButton.isDisabled = false;
//                                     this.ui.submitButton.text = "Оформить заказ";
//
//                                 }.bind(this), 100);
//
//                             } else {
//                                 this.checkStore();
//                             }
//                         }.bind(this)
//                     }
//                 );
//
//             } else {
//                 this.checkStore();
//             }
//             // ------------------
//         }
// },
//
// updateDataLayer: function (data){
//     for(let prop of data){
//         if(prop.event === 'checkout'){
//             let target = prop.ecommerce.checkout.products;
//             Object.assign(target, this.marketingDatalayerProducts);
//         }
//     }
// },
//
// /**
//  * Инициализирует кнопки + - в карточке товара
//  */
// unitsPlus: function (item) {
//     if (item.PRODUCT_STATUS != 'D') {
//         item.QUANTITY++;
//         this.updateDataLayer(dataLayer);
//         dataLayer.push({
//             'event': 'updateCart',
//             'ecommerce': this.marketingDatalayerProducts,
//             'customerCity': window.customerCity
//         });
//         // this.actionUpdateQuantityWithTimeout();
//         // tgCallEvent('product_add', this.marketingCreateArImpressionAddRemove(item));
//     }
// },
// unitsMinus: function (item) {
//     if (item.QUANTITY > 1 && item.PRODUCT_STATUS != 'D') {
//         item.QUANTITY--;
//         this.updateDataLayer(dataLayer);
//         dataLayer.push({
//             'event': 'updateCart',
//             'ecommerce': this.marketingDatalayerProducts,
//             'customerCity': window.customerCity
//         });
//         // this.actionUpdateQuantityWithTimeout();
//         // tgCallEvent('product_remove',  this.marketingCreateArImpressionAddRemove(item));
//     }
//
// },
//
// /**
//  * Инициализирует кнопку "применять кол-во товара"
//  */
// unitsApply: function (item) {
//     // $(".units__apply").unbind("click");
//     // $(".units__apply").click(function (e) {
//     if (item.STATUS != 'D') {
//         item.QUANTITY = item.AMOUNT_UNIT_IN_STOCK;
//         // this.actionUpdateQuantity();
//     }
//     // TODO: call tgCallEvent('product_add', <?= CUtil::PhpToJSObject($product_add_remove) ?>);
// },
//
// /**
//  * Инициализирует остальные события элементов управления
//  */
// // занести во vue то, что нужно..
// /*
// basket.events = function () {
//     // закрываем cart popup
//     $(document).on('click', '#closeCartBoxUpdated', function (e) {
//         e.preventDefault();
//         $(this)
//             .parents('.cart-box')
//             .addClass('hidden');
//         window.setTimeout(document.location.reload(true), 300);
//
//     });
//     // закрываем cart popup
//     $(document).on('click', '.cart-box.updatedBasket', function (e) {
//         e.preventDefault();
//         $(this).addClass('hidden');
//         window.setTimeout(document.location.reload(true), 300);
//     });
//
//
//     var counter_value = '';
//
//     $('.wrap-item-units .counter').focus(function (event) {
//
//         console.log('focus');
//
//         counter_value = Number($(this).val());
//         console.log("значение до изменения: " + counter_value);
//
//
//     });
//
//     $(".wrap-item-units .counter").unbind("keyup");
//     $(".wrap-item-units .counter").keyup(function () {
//         // TODO: это вообще работает?
//
//         let status = $(this).data('item-status');
//         if (status == 'D') {
//             return false;
//         }
//
//         var params;
//         if (!$(this).val()) {
//             $(this).val("1");
//         }
//         //$(this).closest(".item-cart").find('.counter').val(Number($(this).val()));
//         $(this).closest(".item-cart").find('.counter').val(parseInt($(this).val()).toFixed(0));
//
//         if ($(this).attr("data-params")) {
//
//             params = $(this).data("params").split(' | ');
//
//             var params_prd_impressions = {
//                 id: params[0],
//                 name: params[1],
//                 price: params[2],
//                 quantity: params[3],
//                 position: params[4],
//             }
//
//             if (Number($(this).val()) > counter_value) {
//                 console.log(' увеличиваем');
//                 params_prd_impressions.quantity = Number($(this).val()) - counter_value;
//
//                 console.log(params_prd_impressions);
//
//                 tgCallEvent('product_add', params_prd_impressions);
//
//             } else if (Number($(this).val()) < counter_value) {
//                 console.log(' уменьшаем');
//                 params_prd_impressions.quantity = counter_value - Number($(this).val());
//
//                 console.log(params_prd_impressions);
//
//                 tgCallEvent('product_remove', params_prd_impressions);
//             }
//         }
//
//         //
//         clearTimeout(basket.timerCounter);
//         basket.timerCounter = setTimeout(function () {
//             $(".ajax-load").css("display", "block");
//             $("#basket-form-id [name='refresh']").val("Y");
//
//             var ItemsQuantity = basket.getItemsQuantity();
//
//             var options = {
//                 target: "#basket-form-id",
//                 url: "/ajax/basket/refresh.php",
//                 data: {action: "UpdateQuantity", options: {ItemsQuantity: ItemsQuantity}},
//                 success: function () {
//                     basket.init();
//                     updateLittleCard();
//                     $(".ajax-load").css("display", "none");
//                 }
//             };
//             $("#basket-form-id").ajaxSubmit(options);
//         }, 800);
//     });
//     */
//
//         // обработчик изменения количества товара (вообще объекта basket.items)
//         handleChangeItem(newVal, oldVal) {
//             // console.log(newVal.QUANTITY, oldVal.QUANTITY);
//             // тут нас ждет неожиданность - старое значение такое же, как новое.
//             // так работает vue
//             // https://vuejs.org/v2/api/#vm-watch
//             //  Note: when mutating (rather than replacing) an Object or an Array, the old value will be the same as new value because they reference the same Object/Array. Vue doesn’t keep a copy of the pre-mutate value.
//             // поэтому сравнивать что-то бесполезно.
//             // if (newVal.QUANTITY !== oldVal.QUANTITY) {
//             // функция сработает при любом изменении объекта
//             this.ui.submitButton.isDisabled = true;
//             this.ui.submitButton.text = "Изменяется количество товара...";
//             clearTimeout(this.timerCounter);
//             this.timerCounter = setTimeout(function () {
//                 this.actionUpdateQuantity();
//                 this.enableSubmitButton();
//             }.bind(this), 800);
//             // this.actionUpdateQuantityWithTimeout();
//             // }
//         },
//         // unitsChange: function (item) {
//         //     if (item.PRODUCT_STATUS === 'D') {
//         //         return false;
//         //     }
//         //
//         //     this.actionUpdateQuantityWithTimeout();
//         // },
//     /*
//     $(".wrap-item-units .counter").unbind("change");
//     $(".wrap-item-units .counter").change(function () {
//
//         let status = $(this).data('item-status');
//         */
// /*
//             if (item.STATUS === 'D') {
//                 return false;
//             }
//
//             item.QUANTITY = quantity;
// */
//
//         /**
//          * Обновляет количество товара c таймаутом
//          */
//         actionUpdateQuantityWithTimeout: function (item = null, quantity = 1) {
//             this.ui.submitButton.isDisabled = true;
//             this.ui.submitButton.text = "Изменяется количество товара...";
//             clearTimeout(this.timerCounter);
//             this.timerCounter = setTimeout(function () {
//                 this.actionUpdateQuantity();
//                 this.enableSubmitButton();
//             }.bind(this), 800);
//         },
//
//         /**
//          * Обновляет количество товара
//          * TODO: переделать, чтобы обновлялся по-одному товару, а не все?
//          */
//         actionUpdateQuantity: function (item = null, quantity = 1) {
//             let ItemsQuantity = this.getItemsQuantity;
//             this.action('UpdateQuantity', {ItemsQuantity: ItemsQuantity}, true);
//         },
//         /**
//          * Удаление товара с корзины
//          * @param item
//          */
//         actionDeleteItem: function (item) {
//     /*
//     $(".link-delete").unbind("click");
//     $(".link-delete").click(function (e) {
//         e.preventDefault();
//         let item_id = $(this).data("item-id");
//         $(".ajax-load").css("display", "block");
//         let options = {
//             target: "#basket-form-id",
//             url: "/ajax/basket/refresh.php",
//             */
//             this.action("DeleteBasketItem", {item_id: item.ID}, true, true);
//             // вызов маркетинговой функции
//             this.marketingRemoveFromCart(this.marketingCreateArImpression(item));
//
//             /*
//             data: {action: "DeleteBasketItem", options: {item_id: item_id}},
//             success: function () {
//                 basket.init();
//                 updateLittleCard();
//                 $(".ajax-load").css("display", "none");
//             }
//         };
//         $("#basket-form-id").ajaxSubmit(options);
//     });
//     */
//     },
//         /**
//          * Удаление товара из дополнительной корзины
//          * @param item
//          */
//         actionDeleteItemExtra: function (item) {
//             this.action("DeleteBasketItemExtra", {item_id: item.ID}, true);
//             // TODO: вызов маркетинговой функции
//             // this.marketingRemoveFromCart(this.marketingCreateArImpression(item));
//         },
//         /**
//          * Изменение статуса товара в корзине
//          * @param item
//          */
//         actionChangeStatus: function (item) {
//     /*
//     $(".change-status").unbind("change");
//     $(".change-status").change(function (e) {
//         e.preventDefault();
//     */
//
//         let status = "Y";
//         if (item.PRODUCT_STATUS === 'Y') {
//             status = "D";
//         }
//         this.action("ChangeProductStatus", {status: status, item_id: item.ID}, true, true);
//         /*
//         let d = {action: "ChangeProductStatus", options: {status: status, item_id: item_id}};
//
//         $(".ajax-load").css("display", "block");
//         let options = {
//             target: "#basket-form-id",
//             url: "/ajax/basket/refresh.php",
//             data: d,
//             success: function () {
//                 basket.init();
//                 updateLittleCard();
//                 $(".ajax-load").css("display", "none");
//             }
//         };
//         $("#basket-form-id").ajaxSubmit(options);
//     });
//     */
//     },
//         /**
//          * Действие - переключить статус всех товаров в корзине
//          * @param status
//          */
//         actionToggleAllProductStatus: function (status) {
//             if (status === "Y") {
//                 status = "D";
//             } else {
//                 status = "Y";
//             }
//
//             console.log('изменить статус всех товаров в корзине', status);
//             this.action("ToggleAllProductStatus", {status: status}, true, true);
//         },
//
//         /**
//          * Изменение количества одного товара в корзине.
//          * Используется только подрядчиками RR.
//          *
//          * @param item
//          */
//         actionChangeQuantity: function (item) {
//             this.action("ChangeProductQuantity", {quantity: item.QUANTITY, kss: item.PRODUCT.PRODUCT}, true, false);
//         },
//
//     /**
//      * Применение карты "Максидом"
//      */
//     actionApplyDiscountCard: function () {
//         let cardId, cardName;
//         if (this.ui.discountCardForm.ID != null) {
//             cardId = this.ui.discountCardForm.ID.replace(/[^0-9]/gi, '').trim();
//         }
//         if (this.ui.discountCardForm.NAME != null) {
//             cardName = this.ui.discountCardForm.NAME.trim();
//         }
//         let error = false;
//         this.ui.discountCardForm.isIdInvalid = false;
//         this.ui.discountCardForm.isNameInvalid = false;
//         if (cardId == null || cardId == "") {
//             this.ui.discountCardForm.isIdInvalid = true;
//             error = true;
//         } else {
//             this.ui.discountCardForm.isIdInvalid = false;
//         }
//         if (cardName == null || cardName == "") {
//             this.ui.discountCardForm.isNameInvalid = true;
//             error = true;
//         } else {
//             this.ui.discountCardForm.isNameInvalid = false;
//         }
//         if (!error) {
//                 this.action("ApplyDiscountCard",  {cardId: cardId, cardName: cardName}, true, true, function () {
//                     try {
//                     //yandex-metrika click
//                     yaCounter26323485.reachGoal('coupon_submit_clicked');
//                     //universal analytic click
//                     //ga('send', 'pageview', '/virtual/podtverdit');
//                     } catch (e) {
//                         console.log ("Ошибка вызова целей");
//                         console.log (e);
//                     }
//                 });
//         }
//     },
//
//     // Отмена применения карты
//     resetCardMaxi: function () {
//         // функции отмены применения карты не было.
//         // чтобы отменить карту нужно попытаться применить несуществующую - тогда карта сбрасывается.
//         // кнопка отмены по сути просто перезагружала страницу...
//         // Проверить работу запроса
//         /*
//     $("#maxi-card-form__action-reset").unbind("click");
//     $("#maxi-card-form__action-reset").click(function (e) {
//      e.preventDefault();
//         $(".ajax-load").css("display", "block");
//         let options = {
//             target: "#basket-form-id",
//             url: "/ajax/basket/refresh.php",
//             //data: {action: "RefreshBasket"},
//             success: function () {
//                 basket.init();
//                 $(".ajax-load").css("display", "none");
//             },
//             error: function (xhr, status, error) {
//                 alert(error);
//                 $(".ajax-load").css("display", "none");
//             }
//         };
//         $("#basket-form-id").ajaxSubmit(options);
//       */
//     },
//
//         /**
//          * Сбрасывает форму карты "Максидом"
//          */
//         uiResetDiscountCardForm: function () {
//             if (!this.user.isAuthorized) {
//                 // если пользователь неавторизован, можно просто очистить форму.
//                 this.ui.discountCardForm.ID = null;
//                 this.ui.discountCardForm.NAME = null;
//                 this.ui.discountCardForm.isIdInvalid = false;
//                 this.ui.discountCardForm.isNameInvalid = false;
//                 // сбросить ошибки, пришедшие с сервера...
//                 this.discountCard.STATUS = 'success';
//                 this.discountCard.MESSAGE = null;
//             } else {
//                 // если авторизован
//                 // нужно перегрузить данные с сервера, чтобы подтянулась карта из личного кабинета
//                 this.loadData();
//             }
//         },
//
//         /**
//          * Показывает форму ввода карты "Максидом"
//          */
//         uiShowDiscountCardForm: function () {
//             this.ui.discountCardForm.isShowForm = true;
//             this.ui.discountCardForm.isShowInfo = false;
//         },
//
//         /**
//          * Показывает форму информации о карте максидом.
//          */
//         uiShowDiscountCardInfo: function () {
//             this.ui.discountCardForm.isShowForm = false;
//             this.ui.discountCardForm.isShowInfo = true;
//         },
//
//     // Использовать бонусы
//     actionUseBonus: function () {
//         this.action("useBonus", {use_bonus: this.bonusInfoStorage.wantUseBonus});
// /*
//     $("#maxi-card-form__action-use-bonus").unbind("change");
//     $("#maxi-card-form__action-use-bonus").change(function (e) {
//         e.preventDefault();
//         let use_bonus = this.checked;
//         $(".ajax-load").css("display", "block");
//         let options = {
//             target: "#basket-form-id",
//             url: "/ajax/basket/refresh.php",
//             data: {action: "useBonus", options: {use_bonus: use_bonus}},
//             success: function () {
//                 basket.init();
//                 $(".ajax-load").css("display", "none");
//             },
//             error: function (xhr, status, error) {
//                 alert(error);
//                 $(".ajax-load").css("display", "none");
//             }
//         };
//         $("#basket-form-id").ajaxSubmit(options);
//     });
//     */
//     },
//
//     // Удаление промокода и применение оставшихся
//     actionDeletePromo: function (index) {
//         this.$delete(this.promoCodeData.promo_code_list, index);
//         this.action("ApplyPromocode", {promo_code_list: this.promoCodeData.promo_code_list}, false, false, function () {
//             // убрать ошибки о применении промокодов, если они были до удаления?
//             this.ui.promoCodeForm.errorMessage = '';
//             this.ui.promoCodeForm.isPromocodeErrors = false;
//         });
//     /*$(".b-promocode__delete").unbind("click");
//     $(".b-promocode__delete").click(function (e) {
//
//         $(this).closest('.b-promocode__item').remove();
//
//         // получим список промокодов
//         var promo_code_list = [];
//         $('.b-promocode__value').each(function (th, el) {
//             promo_code_list.push($(el).html());
//         });
//
//         $(".ajax-load").css("display", "block");
//         var options = {
//             target: "#basket-form-id",
//             url: "/ajax/basket/refresh.php",
//             data: {action: "ApplyPromocode", options: {promo_code_list: promo_code_list}},
//             success: function () {
//                 basket.init();
//                 $(".ajax-load").css("display", "none");
//             }
//         };
//         $("#basket-form-id").ajaxSubmit(options);*/
//     },
//     // Применение промокодов
//     actionApplyPromocode: function () {
//         this.promoCodeData.errorMessagesList = [];
//         this.ui.promoCodeForm.isPromocodeErrors = false;
//
//         if (!this.ui.promoCodeForm.name || this.ui.promoCodeForm.name.length === 0) {
//             this.ui.promoCodeForm.errorMessage = 'Введите промокод';
//             this.ui.promoCodeForm.isPromocodeErrors = true;
//
//         } else {
//             // получим список уже примененных промокодов
//             if (this.promoCodeData.promo_code_list.filter(promocode => promocode.toLowerCase() === this.ui.promoCodeForm.name.toLowerCase()).length > 0) {
//                 this.ui.promoCodeForm.errorMessage = 'Промокод уже применён'
//                 this.ui.promoCodeForm.isPromocodeErrors = true;
//             } else {
//                 this.ui.promoCodeForm.errorMessage = '';
//             }
//         }
//
//         if (!this.ui.promoCodeForm.isPromocodeErrors) {
//             let promo_code_list = this.promoCodeData.promo_code_list.slice().map(function (x) {
//                 return x.toLowerCase();
//             });
//             promo_code_list.push(this.ui.promoCodeForm.name.toLowerCase());
//             this.action("ApplyPromocode", {"promo_code_list": promo_code_list}, false, false, function () {
//                 // Обнуляет поле ввода, если промокод применился
//                 if (this.promoCodeData.promo_code_list.filter(promocode => promocode.toLowerCase() === this.ui.promoCodeForm.name.toLowerCase()).length > 0) {
//                     this.ui.promoCodeForm.name = '';
//                 }
//             });
// /*
//             $(".ajax-load").css("display", "block");
//             var options = {
//                 target: "#basket-form-id",
//                 url: "/ajax/basket/refresh.php",
//                 data: {action: "ApplyPromocode", options: {promo_code_list: promo_code_list}},
//                 success: function () {
//                     basket.init();
//                     $(".ajax-load").css("display", "none");
//                     // promo_code_list = [];
//                     // $('.b-promocode__value').each(function (th, el) {
//                     //     promo_code_list.push($(el).html());
//                     // });
//                     // if (promo_code_list.includes(promocode)) {
//                     //     // промокод успешно применён
//                     //     // закрыть окно
//                     //     // убрала модальное окно modal-promo теперь это рыскрывающееся поле
//                     //     basket.hideBlock($('#modal-promo'), true);
//                     // } else {
//                     //     $("[name='promocode']").addClass("invalid");
//                     //     $(".modal-promo__invalid").html($('.b-promocode__messages').html());
//                     // }
//                 }
//             };
//             $("#basket-form-id").ajaxSubmit(options);
//         }
//  */
//         }
//     },
//     /**
//      * Удаляет карту много.ру
//      */
//     actionMnogoruDelete: function () {
//         this.action('deleteMnogoru');
//     },
//         /*
//     $(".mnogoru__delete").unbind("click");
//     $(".mnogoru__delete").click(function (e) {
//         e.preventDefault();
//         $(".ajax-load").css("display", "block");
//         let options = {
//             target: "#basket-form-id",
//             url: "/ajax/basket/refresh.php",
//             data: {action: "deleteMnogoru"},
//             success: function () {
//                 basket.init();
//                 $(".ajax-load").css("display", "none");
//             }
//         };
//         $("#basket-form-id").ajaxSubmit(options);
//     });
//     */
//     /**
//      * Печать корзины
//      */
//     print: function () {
//         window.print();
//         /*
//     $(".cart-footer__action-print").unbind("click");
//     $(".cart-footer__action-print").click(function (e) {
//         e.preventDefault();
//
//     });
//         */
// },
// /**
//  * Очищает корзину
//  */
// clearBasket: function () {
//     // console.log('полная очистка корзины');
//     // console.log(this.marketingDatalayerProducts.length);
//
//     dataLayer.push({
//         'event': 'updateCart',
//         'ecommerce': this.marketingDatalayerProducts,
//         'customerCity': window.customerCity
//     });
//     dataLayer.push({
//         'event': 'removeFromCartAll',
//         'ecommerce': {
//             'remove': {
//                 'products': this.marketingDatalayerProducts,
//             }
//         },
//         'customerCity': window.customerCity
//     });
//
//     /*
//     $(".ajax-load").css("display", "block");
//     var options = {
//         target: "#basket-form-id",
//         url: "/ajax/basket/refresh.php",
//     */
//     this.action('ClearBasket', false, true, true);
//     /*
//         data: {action: "ClearBasket"},
//         success: function () {
//             basket.init();
//             $(".ajax-load").css("display", "none");
//             updateLittleCard();
//         }
//     };
//     $("#basket-form-id").ajaxSubmit(options);
// },*/
// },
// /*
// basket.init();
//     basket.cartSubmit();
//
//     estimateModal.init();
//
//     $(document).ajaxComplete(function() {
//         updateRR();
//     });
// */
//     /**
//      * Применение карты много.ру:
//      * - валидирует форму
//      * - инициирует запрос на применение
//      */
//     actionApplyMnogoru: function () {
//         if (this.ui.mnogoruForm.cardId == null || this.ui.mnogoruForm.cardId.length !== 8) {
//             this.mnogoru.isError = true;
//             this.mnogoru.errorText = 'Введите 8 цифр';
//         } else {
//             this.mnogoru.isError = false;
//             this.mnogoru.errorText = null;
//         }
//         if (!this.mnogoru.isError) {
//             this.action('ApplyMnogoru', {'cardId': this.ui.mnogoruForm.cardId, 'ajaxToken': this.mnogoru.ajax_token});
//             /*
//             $(".ajax-load").css("display", "block");
//             let options = {
//                 target: "#basket-form-id",
//                 url: "/ajax/basket/refresh.php",
//                 data: {action: "RefreshBasket"},
//                 success: function () {
//                     basket.init();
//                     $(".ajax-load").css("display", "none");
//                 },
//                 error: function (xhr, status, error) {
//                     alert(error);
//                     $(".ajax-load").css("display", "none");
//                 }
//             };
//             $("#basket-form-id").ajaxSubmit(options);
//             */
//         }
//     },
//
//         /**
//          * Показывает блок "Подробнее" в Итого
//          */
//         uiShowAboutTotal: function () {
//             this.ui.aboutTotal.isOpen = true;
//         },
//
//         /**
//          * Скрывает блок "Подробнее в Итого
//          */
//         uiHideAboutTotal: function () {
//             this.ui.aboutTotal.isOpen = false;
//         },
//
//         /**
//          * Показывает модальное окно (обычно с сообщением об ошибке)
//          * Не имеет отношения к остальным всплывающим окнам на странице
//          *
//          * @param text текст сообщения
//          */
//         showModal: function (text) {
//     var oPopup = new BX.PopupWindow('oder_props_weight', window.body, {
//         autoHide: true,
//         offsetTop: 1,
//         offsetLeft: 0,
//         lightShadow: true,
//         closeIcon: true,
//         closeByEsc: true,
//         overlay: {
//             backgroundColor: '#000', opacity: '60'
//         },
//         events: {
//             onPopupClose: function (popupWindow) {
//                 popupWindow.destroy();
//             }
//         }
//     });
//     var modal = "<div id='bl_modal_weight'><div class='b_conteiner'>" + text + "</div></div>";
//     oPopup.setContent(modal);
//     oPopup.show();
// },
//
// /**
//  * Отключает нажатие клавиши enter в form
//  */
// /*
// function disabledEnter() {
//     $('#basket-form-id').keydown(function (event) {
//         if (event.keyCode == 13) {
//             event.preventDefault();
//             return false;
//         }
//     });
// }
// */
//
// /**
//  * Обновляет маленькую корзину
//  */
// updateLittleCard: function () {
//     console.log('updateLittleCard');
//     $.get("/ajax/shop/littlecart.php?maxi2020=Y", function (data) {
//         $('#cart-quantity').html(data);
//         $.get("/ajax/shop/littlecart_small.php?maxi2020=Y", function (data) {
//             $('#cart-quantity-small').html(data);
//         });
//         $.get("/ajax/shop/updateregion.php", function (data) {
//             $("#dropdownMenuLink").text(data);
//         });
//     });
// },
//
// /**
//  * Обновляет блок rr
//  */
// updateRR: function () {
//     if (typeof window.retailrocket !== 'undefined') {
//         // variable is undefined
//         $('.order-form__retailrocket').removeAttr('initialized');
//         try {
//             retailrocket.markup.render();
//             console.log('marketing: Блок RR обновлён');
//         } catch (e) {
//             console.error('marketing: Блок RR не обновлён', e);
//         }
//     } else {
//         console.error('marketing: Блок RR undefined');
//     }
// },
//
// /**
//  * Обновляет блок rr c таймаутом
//  */
// updateRRWithTimeOut: function () {
//     // т.к. нужно дождаться, пока скрипт rr полностью инициализируется
//     setTimeout(function () {
//         this.updateRR()
//     }.bind(this), 1000);
// },
//
// /**
//  * Проверяет доступность товаров в магазине
//  * Если всё хорошо, то отправляет корзину на оформление заказа.
//  * Если нет - открывает окно наличия товаров.
//  */
// checkStore: function () {
//     let url = "/ajax/basket/apiJson.php";
//     console.log("Проверяем наличие...");
//     this.ui.submitButton.text = "Проверяем наличие...";
//
//     $.ajax({
//             url: url,
//             method: 'POST',
//             contentType: 'application/json; charset=utf-8',
//             dataType: 'json',
//             data:  JSON.stringify({action: "CheckStore"}),
//             success: function (data) {
//                 if (data.status == "N") {
//                     // если проверка по магазинам не удалась
//
//                     if (data.checkAllRegion == "N" && data.storeCount > 1) {
//                         // если не включена по всему региону и кол-во магазинов больше 1
//                         // загрузить и показать таблицу наличия товаров по магазинам
//                         console.log("Товары находятся в разных магазинах. Запрашиваем данные...");
//                         this.ui.submitButton.text = "Товары находятся в разных магазинах. Запрашиваем данные...";
//                         $.ajax({
//                             method: 'POST',
//                             url: url,
//                             data: JSON.stringify({action: "getStorePopup"}),
//                             dataType: 'json',
//                             success: function (data2) {
//
//                                 console.log("Товары находятся в разных магазинах. Формируем таблицу наличия...");
//                                 this.ui.submitButton.text = "Товары находятся в разных магазинах. Формируем таблицу наличия...";
//
//                                 window.dataLayer = window.dataLayer || [];
//                                 dataLayer.push({
//                                     'event': 'Доступность на складе',
//                                     'customerCity': window.customerCity
//                                 });
//
//                                 // cart.popup
//                                 // Инициализирует всплывающее окно "наличия товаров", как отдельный компонент Vue,
//                                 // передав в него данные
//                                 // асинхронно, т.к. блокирует всю страницу
//                                 setTimeout(function () {
//                                     this.uiModalCartStockOpen();
//                                     this.stockModal.store = data2.basket.store;
//                                     this.stockModal.items = data2.basket.items;
//                                     // показать кнопку "оформить" заказ
//                                     this.enableSubmitButton();
//                                 }.bind(this), 0);
//
//                                 // setTimeout(function () {
//                                 //     enableSubmitButton();
//                                 // }, 2000);
//                             }.bind(this),
//                             error: function (jqXHR, textStatus, errorThrown) {
//                                 console.error("Ошибка таблицы наличия", jqXHR);
//                                 this.ui.submitButton.isDisabled = false;
//                                 this.ui.submitButton.text = "Ошибка таблицы наличия: " + jqXHR.responseText;
//                             }.bind(this)
//                         });
//                     } else {
//                         // если не нужно открывать модальное окно наличия
//                         // т.е. количество магазинов в регионе == 1
//                         // перезагрузить страницу (переоткрыть корзину) TODO: зачем???!!!
//                         location.reload();
//                     }
//                 } else if (data.status == "updatedBasket") {
//                     // если статус - "корзина обновилась" (TODO: проверить, что это значит, может вообще убрать...)
//                     $("#modal-stock").load("/ajax/basket/updatedBasket.php", function () {
//                         // stockModal.init(); // cart.popup
//                         $(".cart-box").addClass('updatedBasket');
//                     });
//                     setTimeout(function () {
//                         this.enableSubmitButton();
//                     }.bind(this), 2000);
//                 } else {
//                     // перейти на форму оформления заказа
//                     this.ui.submitButton.text = 'Товары в наличии. Переходим к оформлению...';
//                     window.location.href='/personal/cart/neworder/';
//                 }
//             }.bind(this)
//         }
//     );
// },
//
// /**
//  * Активирует кнопку "Оформить заказ"
//  */
// enableSubmitButton: function() {
//     this.ui.submitButton.isDisabled = false;
//     this.ui.submitButton.text = 'Оформить заказ';
// },
//
// /**
//  * TODO: вынести модальное окно смет в отдельный компонент?
//  */
// /* Модальное окно смет */
// /*
// let estimateModal = {};
//
// estimateModal.init = function () {
//     this.onOpenClick();
//     this.onSave();
// }*/
//
// /**
//  * Обработчик клика по кнопке "сохранить смету"
//  * estimateModal.onOpenClick
//  */
// uiModalEstimateOpen: function (event) {
//     this.ui.modalEstimate.isOpen = true;
//     $('.overlay').addClass("overlay_show");
// },
// uiModalEstimateClose: function (event) {
//     this.ui.modalEstimate.isOpen = false;
//     $('.overlay').removeClass("overlay_show");
// },
// /**
//  * Сбрасывает форму сохранения сметы (для следующего сохранения)
//  */
// estimateFormReset: function () {
//     this.estimateErrorMessageRemove();
//     this.estimateSuccessMessageRemove();
//     this.ui.estimateForm.name = null;
//     this.ui.estimateForm.isProcessing = false;
// },
// /**
//  * Показывает сообщение об ошибке сохранения сметы
//  * @param message
//  */
// estimateErrorMessageSet: function (message) {
//     this.ui.estimateForm.errorMessage = message;
// },
// /**
//  * Убирает сообщение об ошибке сохранения сметы
//  */
// estimateErrorMessageRemove: function () {
//     this.ui.estimateForm.errorMessage = null;
// },
// /**
//  * Показывает сообщение об успешном сохранении сметы (текст сообщения уже захардкожен в элементе)
//  */
// estimateSuccessMessageDisplay: function () {
//     this.ui.estimateForm.isSuccess = true;
// },
// /**
//  * Скрывает сообщение об успешном сохранении сметы
//  */
// estimateSuccessMessageRemove: function () {
//     this.ui.estimateForm.isSuccess = false;
// },
//
// /*
// estimateModal.onSave = function () {
// */
// estimateSend: function () {
//         console.log('start estimate saving...');
//         this.estimateErrorMessageRemove();
//
//         if (this.ui.estimateForm.timeout)
//             clearTimeout(this.ui.estimateForm.timeout);
//         let estimateName = $.trim(this.ui.estimateForm.name);
//         if (estimateName.length > 0) {
//             let data = {NAME: estimateName, ADD_ESTIMATE: 'Y'};
//             this.ui.estimateForm.isProcessing = true;
//             $.post('/ajax/basket/addEstimate.php', data, function (response) {
//                 if (response.error) {
//                     this.estimateErrorMessageSet(response.message);
//                     this.ui.estimateForm.isProcessing = false;
//                 } else {
//                     // добавляет сообщение, что все ок.
//                     this.estimateSuccessMessageDisplay();
//                     // убирает сообщение об ошибке
//                     this.estimateErrorMessageRemove();
//                     // закрывает окно
//                     this.ui.estimateForm.timeout = setTimeout(function () {
//                         this.uiModalEstimateClose();
//                         // и через некоторое время сбрасывает форму
//                         setTimeout(function () {
//                             this.estimateFormReset()
//                         }.bind(this), 1000);
//                     }.bind(this), 5000);
//                 }
//             }.bind(this), 'json')
//                 .fail(function (response) {
//                     this.ui.estimateForm.isProcessing = false;
//                     this.estimateErrorMessageSet(response.responseText);
//                 }.bind(this));
//         } else {
//             this.estimateErrorMessageSet('Не введено название сметы');
//         }
// },
// /**
//  * end of модальное окно смет
//  */
//
//         /* Дополнения на Vue.Js */
//
//         /**
//          * Округляет вес
//          *
//          * @param number
//          * @returns {string|*}
//          */
//         weightRound: function (number) {
//             if (number <= 0) {
//                 return '-';
//             } else {
//                 let newNumber = +number.toFixed(3);
//                 return newNumber;
//             }
//         },
//
//         /**
//          * Функция склонения в зависимости от количества
//          *
//          * @param number количество
//          * @param words массив склонений, например ["бонус", "бонуса", "бонусов"]
//          * @param onlyEnding возвращать только окончание (без цифры)
//          *
//          * @returns {string} строку типа "1 бонус"
//          */
//         declOfNum: function (number, words, onlyEnding = false) {
//             let prefix = onlyEnding ? '' : number + ' ';
//             return prefix + words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
//         },
//
//         /**
//          * Округляет число
//          * @param number
//          * @param digits
//          * @returns {*}
//          */
//         toFixed: function (number, digits = 0) {
//             return parseFloat(number).toFixed(digits);
//         },
//
//         /**
//          * Инициализирует ajax-запрос к API-корзины с определёнными параметрами.
//          * Инициализирует наполнение данными объекта Vue по результатам этого запроса.
//          *
//          * @param action название действия
//          * @param options список параметров для действия
//          * @param updateLittleCard обновлять ли маленькую корзину
//          * @param updateRR обновлять ли блок RetailRocket
//          * @param callbackSuccess функция для вызова в случае успеха
//          */
//         action: function (action, options = false, updateLittleCard = false, updateRR = false, callbackSuccess = null) {
//
//             // формирует параметры запроса
//             let body = {
//                 action: action,
//                 options: options,
//             };
//
//             const requestOptions = {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(body)
//             };
//
//             // показывает прелоадер
//             this.ui.isShowAjaxCartPreloader = true;
//
//             fetch("/ajax/basket/apiJson.php", requestOptions)
//                 .then(response => response.json())
//                 .then((data) => {
//                     if (data.redirect) {
//                         // TODO: иногда сервер хочет перезагрузить страницу.
//                         //       нужно от этого, конечно, избавляться
//                         window.location = data.url;
//                     }
//
//                     // обновляет данные в объекте Vue
//                     this.renderData(data);
//                     // скрывает прелоадер
//                     this.ui.isShowAjaxCartPreloader = false;
//                     // если нужно, обновляет маленькую корзину
//                     if (updateLittleCard) {
//                         this.updateLittleCard();
//                     }
//                     // ну и rr тоже
//                     if (updateRR) {
//                         this.updateRR();
//                     }
//                     // вызвать дополнительную функцию
//                     if (callbackSuccess != null) {
//                       callbackSuccess.call(this);
//                     }
//                 })
//                 .catch(error => {
//                     this.errorMessage = error;
//                     console.error("Произошла ошибка в процессе выполнения запроса-действия к корзине!", error);
//                     // скрывает прелоадер
//                     this.ui.isShowAjaxCartPreloader = false;
//                 });
//         },
//
//         /**
//          * Инициализирует ajax-запрос к API-корзины без параметров
//          * Инициализирует наполнение данными объекта Vue по результатам этого запроса.
//          * @param updateRR - обновлять ли блок RetailRocket (по-умолчанию - да)
//          */
//         loadData(updateRR = true) {
//             this.ui.isShowAjaxCartPreloader = true;
//             fetch("/ajax/basket/apiJson.php")
//                 .then(response => response.json()).then((data) => {
//                 // check for error response
//                 // if (!response.ok) {
//                 // get error message from body or default to response statusText
//                 // const error = (data && data.message) || response.statusText;
//                 // console.log('error loading basket json');
//                 // return Promise.reject(error);
//                 // }
//
//                 //this.basket = data.basket;
//                 this.renderData(data);
//                 if (updateRR) {
//                     // первоначальная загрузка блока идет с таймаутом
//                     this.updateRRWithTimeOut();
//                 }
//                 this.ui.isShowAjaxCartPreloader = false;
//             })
//                 .catch(error => {
//                     this.errorMessage = error;
//                     console.error("Произошла ошибка в процессе выполнения загрузки корзины.", error);
//                     this.isShowAjaxCartPreloader = false;
//                 });
//         },
//
//         /**
//          * Создаёт уникальное имя html-элемента "количество товара" для отправки в веб-сервис корзины
//          * @param id
//          * @returns {`count[${string}]`}
//          */
//         createUnitInputName: function (id) {
//             return `count[${id}]`;
//         },
//
//         /**
//          * Возвращает название ccs-класса "units--short" для карточки товара, если товар подходит под условия
//          * Этот css-класс скрывает кнопку + в карточке товара.
//          *
//          * @param item товар из this.items
//          * @returns {string}
//          */
//         createUnitShortCssClass: function (item) {
//             if (item.QUANTITY >= item.AMOUNT_UNIT_IN_STOCK && item.PRODUCT_STATUS != 'D') {
//                 return 'units--short';
//             }
//         },
//
//         /**
//          * Пересчитывает некоторые итоги
//          */
//         calculateStockCounters: function () {
//             this.outOfStockCounter = 0;
//             this.notRemainsCounter = 0;
//             this.existCounter = 0;
//
//             this.basket.items.forEach((item, index) => {
//                 // console.log(item);
//                 if (item.IS_NOT_REMAINS && item.AMOUNT_UNIT_IN_STOCK > 0) {
//                     this.notRemainsCounter++;
//                 }
//                 if ((item.AMOUNT_UNIT_IN_STOCK == 0 && item.PRODUCT_STATUS != 'D') || item.PRODUCT_STATUS == 'F') {
//                     this.outOfStockCounter++;
//                 } else {
//                     this.existCounter++;
//                 }
//             });
//
//             // товары из "дополнительной корзины"
//             this.basketExtra.forEach((item, index) => {
//                 this.outOfStockCounter++;
//             });
//         },
//
//         /**
//          * Вычисляет видимость элементов блока "Дисконтная карта Максидом"
//          */
//         calculateDiscountCardVisibility: function () {
//             if (!this.discountCard.isApplied) {
//                 this.uiShowDiscountCardForm();
//             } else {
//                 this.uiShowDiscountCardInfo();
//             }
//         },
//
//         /**
//          * Вычисляет видимость элементов блока "Промокоды"
//          */
//         calculatePromocodeVisibility: function () {
//             if (this.promoCodeData.errorMessagesList.length > 0) {
//                 // если с сервера вернулись сообщения об ошибках
//                 this.ui.promoCodeForm.isPromocodeErrors = true;
//             } else {
//                 // если не вернулись, сбросить ошибку...
//                 this.ui.promoCodeForm.isPromocodeErrors = false;
//             }
//         },
//
//         /**
//          * Вычисляет видимость блоков Много.ру
//          */
//         calculateMnogoruVisibility: function () {
//             if (this.mnogoru.saved_card == null) {
//                 this.ui.mnogoruForm.isMnogoruStep1 = true;
//                 this.ui.mnogoruForm.isMnogoruStep2 = true;
//                 this.ui.mnogoruForm.isMnogoruStep3 = false;
//             } else {
//                 this.ui.mnogoruForm.isMnogoruStep1 = false;
//                 this.ui.mnogoruForm.isMnogoruStep2 = false;
//                 this.ui.mnogoruForm.isMnogoruStep3 = true;
//             }
//         },
//
//         /**
//          * Маркетинг. Удаляет товар из корзины.
//          *
//          * @param prd_impressions
//          * @param trackId
//          */
//         marketingRemoveFromCart: function (prd_impressions) {
//             try {
//                 let arImpression = [];
//                 arImpression.push(prd_impressions);
//                 // удаляет из GA
//                 dataLayer.push({
//                     'event': 'updateCart',
//                     'ecommerce': this.marketingDatalayerProducts,
//                     'customerCity': window.customerCity
//                 });
//                 dataLayer.push({
//                     'event': 'removeFromCart',
//                     'ecommerce': {
//                         'remove': {  // 'remove' actionFieldObject measures.
//                             'products': arImpression
//                         }
//                     },
//                     'customerCity': window.customerCity
//                 });
//                 // удаляет из TrackAd
//                 tgCallEvent('product_remove', prd_impressions);
//             } catch (e) {
//                 console.error('marketing: ошибка удаления товара', e);
//             }
//         },
//
//         /**
//          * Создает маркетинговое свойство "product" для datalayer
//          * @param item
//          * @returns {{prd_code: *, quantity, price, name: *, id, position: number, prd_id: *, category, brand: *, feed_id: *}}
//          */
//         marketingCreateArImpression(item) {
//             let feed = JSON.parse(item.NAME);
//             let arImpression = {
//                 'id': item.PRODUCT.CODE,
//                 'prd_code': item.PRODUCT_ID,
//                 'feed_id': feed.PRODUCT_ID,
//                 'feed_categry_id':item.CATALOG.UF_REALID,
//                 'prd_id': feed.PRODUCT_ID,
//                 'name': this.getItemName(item),
//                 'price': item.PRICE,
//                 'brand': item.PRODUCT.PROPERTY_ITEM_FIRM_VALUE.UF_NAME,
//                 'category': item.CATALOG.SECTIONS[0],
//                 'quantity': item.QUANTITY,
//                 // свойство "позиция" вычисляется в другом месте
//                 'position': 0,
//             };
//             return arImpression;
//         },
//
//         /**
//          * Создает маркетинговое свойство "product" для TrackAd
//          * @param item
//          * @returns {{prd_code: *, quantity, price, name: *, id, position: number, prd_id: *, category, brand: *, feed_id: *}}
//          */
//         marketingCreateTrackAdProduct(item) {
//             let arTrackAd = this.marketingCreateArImpression(item);
//             arTrackAd['id'] = item.PRODUCT.PROPERTY_ITEM_CODE_VALUE;
//             arTrackAd["image"] = item.CATALOG.PREVIEW_PICTURE ? "https://" + window.location.hostname + item.CATALOG.PREVIEW_PICTURE : "";
//             arTrackAd["category_id"] = item.CATALOG.UF_REALID;
//             arTrackAd["category_name"] = item.CATALOG.SECTIONS_NAME;
//             return arTrackAd;
//         },
//
//         /**
//          * Маркетинговая функция для добавления/удаления товара по одному (через кнопки + и -)
//          * @param item
//          * @returns {{prd_code: *, quantity, price, name: *, id, position: number, prd_id: *, category, brand: *, feed_id: *}}
//          */
//         marketingCreateArImpressionAddRemove(item) {
//             let arImpression = this.marketingCreateArImpression(item);
//             delete arImpression.position;
//             arImpression.quantity = 1;
//             return arImpression;
//         },
//
//         /**
//          * Инициализирует TrackAd
//          */
//         marketingInitTrackAd() {
//             if (typeof window.tgConfig === "undefined") {
//                 console.log('marketing: TrackAd init');
//                 // TODO: нужно подключать тракад в этом скрипте, сейчас он инициализируется дефолтными значениям раньше,
//                 //       чем приходит ответ от ajax-запроса корзины
//                 var tgConfig = this.marketingTgConfig;
//                 console.log('marketing: TrackAd config', tgConfig);
//             }
//         },
//
//         /**
//          * Инициализирует DataLayer
//          */
//         marketingInitDataLayer() {
//             try {
//                 if (typeof window.isDlInitialized == "undefined") {
//                     console.log('marketing: dataLayer init');
//                     window.isDlInitialized = true;
//
//                     dataLayer.push({
//                         'event': 'checkout',
//                         'ecommerce': {
//                             'checkout': {
//                                 'actionField': {'step': 1, 'option': 'checkout'},
//                                 'products': this.marketingDatalayerProducts
//                             }
//                         },
//                         'customerCity': window.customerCity
//                     });
//                     dataLayer.push({
//                         'event': 'updateCart',
//                         'ecommerce': this.marketingDatalayerProducts,
//                         'customerCity': window.customerCity
//                     });
//                 }
//             } catch (e) {
//                 console.error('marketing: ошибка инициализации маркетингового слоя', e);
//             }
//         }
//     },
//
//     watch: {
//         // 'ui.allSelected': {
//         //     handler: function (newVal, oldVal) {
//         //         if (newVal !== oldVal && oldVal !== null) {
//         //             if (
//         //                 // если требуется выключить, и есть, что выключать
//         //                 ((newVal === 'D') && this.basket.items.filter(item => item.PRODUCT_STATUS === "Y").length > 0)
//         //                 // или если активировать все товары, и есть, что активировать
//         //                 || ((newVal === 'Y') && this.basket.items.filter(item => item.PRODUCT_STATUS === "D").length > 0)
//         //             ) {
//         //                 console.log('изменить статус всех товаров в корзине', newVal);
//         //                 this.actionToggleAllProductStatus(newVal);
//         //             }
//         //         }
//         //     },
//         // },
//         'filterItemsSell': {
//             handler: function (newVal, oldVal) {
//                 // установить статус чекбокса "выбрать все/снять выделение" в зависимости от статусов основных товаров
//                 if (newVal.filter(item =>
//                     item.PRODUCT_STATUS === "D"
//                 ).length > 0) {
//                     // если есть хотя бы один "продающийся товар, активировать чек-бокс"
//                     this.ui.allSelected = "D";
//                 } else {
//                     this.ui.allSelected = "Y";
//                 }
//             }
//         },
//     },
//     computed: {
//
//         /**
//          * Возвращает кол-во товара для функции обновления кол-ва (кнопки + и -, поле ввода количества, кнопка "применить")
//          *
//          * @returns {*[]}
//          */
//         getItemsQuantity: function () {
//
//             let ItemsQuantity = [];
//
//             this.basket.items.forEach(function (item, index) {
//                 ItemsQuantity.push({basketItemId: item.ID, QUANTITY: item.QUANTITY})
//             });
//
//             /*
//             $("#basket-form-id .counter").each(function () {
//                 ItemsQuantity.push({basketItemId: $(this).attr('data-id'), QUANTITY: $(this).val()})
//             });
//              */
//             return ItemsQuantity;
//         },
//
//         /**
//          * Общее количество для товаров (в формате json для наблюдения, т.к. объект basket.items меняется целиком после запроса, и ватчер срабатывает лишние разы)
//          * TODO: не используется
//          * @returns {string}
//          */
//         // getItemsQuantitySting() {
//         //     // let counters = [];
//         //     // this.basket.items.forEach(function (item, index, array) {
//         //     //     counters.push({id: item.PRODUCT_ID, quantity: item.QUANTITY});
//         //     // });
//         //     return JSON.stringify(this.getItemsQuantity);
//         // },
//
//        /**
//          *  Сообщения об ошибках.
//          *  На текущий момент используется только одно...
//          *  Вообще это нужно перенести в API!
//          *
//          * @returns {string}
//          */
//         getCartAdditionalErrorText: function () {
//            if (this.user.type == 'org' && this.REPRESENTATION_ID == 8) {
//                return this.error_messages.onlyindividual;
//            }
//             // } else if (this.MAX_PARAMS.GABARITY == 'Y' && this.MAX_PARAMS.WEIGHT == 'Y') {
//             //     return this.error_messages.wrongWeightAndGabarites;
//             // } else if (this.MAX_PARAMS.GABARITY == 'Y') {
//             //     return this.error_messages.wrongGabarites;
//             // } else if (this.MAX_PARAMS.WEIGHT == 'Y') {
//             //     return this.error_messages.wrongWeight;
//             // } else if (this.MAX_PARAMS.VOLUME_WEIGHT == 'Y') {
//             //     return this.error_messages.wrongVolumeWeight;
//             // }
//
//             return "";
//         },
//
//         // discountCardWithoutDk: function () {
//         //     return this.discountCard.ID.replace(/\D/g, '');
//         // },
//
//         /**
//          * Нужно ли вообще показывать "Подробнее" в ИТОГО
//          *
//          * @returns {boolean}
//          */
//         needShowAboutTotal: function () {
//             if ((this.basket.discountCard > 0)
//                 || (this.basket.discountAction > 0)
//                 || (this.basket.discountPromo > 0)
//                 || (this.basket.Result.BonusUsed)
//                 || (this.basket.CustomAppliedSystem.MaxBonus4Goods.AmountPriceBonus > 0)
//                 || (this.mnogoru.calc_bonus !== null)) {
//                 return true;
//             } else {
//                 return false;
//             }
//         },
//
//         /**
//          * Невалидная дисконтная карта (на сервере)
//          */
//         isDiscountCardInvalid: function() {
//             return this.discountCard.STATUS != "success";
//         },
//
//         /**
//          * Можно ли использовать бонусы
//          * TODO: вычислять на стороне АПИ, чтобы не показывать кол-во бонусов?
//          *
//          * @returns {boolean}
//          */
//         isCanUseBonus: function () {
//             if (this.discountCard.CAN_USE_BONUS && this.basket.CustomAppliedSystem.MaxBonus4Goods.AmountBonus > 0) {
//                 return true;
//             } else {
//                 return false;
//             }
//         },
//
//         /**
//          * Возвращает только "продающиеся" товары (для верхнего блока)
//          * @returns {*[]}
//          */
//         filterItemsSell: function () {
//             return this.basket.items.filter(item => {
//                 if ((item.AMOUNT_UNIT_IN_STOCK > 0 || item.PRODUCT_STATUS == 'D') && item.PRODUCT_STATUS != 'F') {
//                     return true;
//                 } else {
//                     return false;
//                 }
//             })
//         },
//
//         /**
//          * Возвращает только "не продающиеся" товары (для нижнего блока)
//          * @returns {*[]}
//          */
//         filterItemsNoSell: function () {
//             return this.basket.items.filter(item => {
//                 // исключает товары, которых нет в магазинах или со статусом "отключен"
//                 if ((item.AMOUNT_UNIT_IN_STOCK > 0 || item.PRODUCT_STATUS == 'D') && item.PRODUCT_STATUS != 'F') {
//                     return false;
//                 } else {
//                     return true;
//                 }
//                 // your logic here
//                 // of course you can use .map() or .reduce() depending on your business logic
//             })
//         },
//
//         /**
//          * ID первого товара, кол-ва которого не хватает
//          */
//         getFirstNotRemainsId: function () {
//             let firstNotRemainsId = null;
//
//             for (const [index, item] of this.filterItemsSell.entries()) {
//                 if ( item.IS_NOT_REMAINS ) {
//                     firstNotRemainsId = index;
//                     break;
//                 }
//             }
//
//             return firstNotRemainsId;
//         },
//
//         /**
//          * Массив товаров для google.dataLayer и trackAd
//          */
//         marketingDatalayerProducts: function () {
//             let arImpressions = [];
//             let position = 0;
//
//             this.filterItemsSell.forEach(function (item, index) {
//                 let arImpression = this.marketingCreateArImpression(item);
//                 arImpression.position = position;
//                 position++;
//                 arImpressions.push(arImpression);
//             }.bind(this));
//
//             return arImpressions;
//         },
//
//         /**
//          * Массив товаров для google.dataLayer и trackAd
//          */
//         marketingTrackAdProducts: function () {
//             let arTrackAds = [];
//             let position = 0;
//
//             this.filterItemsSell.forEach(function (item, index) {
//                 let arTrackAd = this.marketingCreateTrackAdProduct(item);
//                 arTrackAd.position = position;
//                 position++;
//                 arTrackAds.push(arTrackAd);
//             }.bind(this));
//
//             return arTrackAds;
//         },
//
//         marketingTgConfig: function () {
//             let tgConfig = this.marketing.tgConfig;
//             tgConfig.basket_products = this.marketingTrackAdProducts;
//             return tgConfig;
//         },
//
//         /**
//          * Возвращает разделённый запятыми список ID товаров для RetailRocket
//          * @returns {string}
//          */
//         marketingRRDataProductId: function () {
//                 let rr_ids = [];
//
//                 try {
//                     this.basket.items.forEach(function (item, index) {
//                         // в имени хранится код товара (нужно всё же возвращать его где-то в API?)
//                         let name = JSON.parse(item.NAME);
//                         rr_ids.push(name.PRODUCT_ID);
//                     });
//                 } catch (e) {
//                     console.error(e);
//                 }
//
//                 return rr_ids.join();
//         }
//     }
// });
//
// let contentGenerated = document.querySelector('#basket-container-id')
// let contentHeight = contentGenerated.offsetHeight
// if(contentHeight < 1810){
//   $('#basket-container-id').css("margin-bottom", "875px")
// }
// console.log(contentHeight);
// }
