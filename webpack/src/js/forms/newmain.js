// Import Swiper and modules
import {Swiper, Navigation, Pagination, Scrollbar, Controller, EffectFade, Autoplay} from 'swiper';

// Install modules
Swiper.use([Navigation, Pagination, Scrollbar, Controller, EffectFade, Autoplay]);

// создаёт объект Vue только на главной странице
if (document.getElementById("newmain")) {

    // NOTE: название такое же, как у корзины, чтобы работал блок rr.
    // TODO: конечно же, это нужно переименовать во что-то другое, и сделать для блока rr свой собственный объект.
    window.$vmcart = new Vue({
        el: '#newmain',
        data: {
            // баннеры наверху
            bannersTop: [],
            // текущий таб топ-предложений
            currentTab: 'new',
            // текущий таб журнала
            currentNewsTab: 'all',
            // маркетинговые переменные
            marketing: {
                // заполняется после получения данных из апи (но не напрямую)
                authUserToSite: null,
                // город
                //rrSendCity: null,
                rrSendCity: 'moscow',
                topOffersHits: {
                    arImpressions: {},
                    arImpressionsNew: {},
                    allArTrId: {}
                },
                topOffersHots: {
                    arImpressions: {},
                    arImpressionsNew: {},
                    allArTrId: {}
                },
                topOffersNew: {
                    arImpressions: {},
                    arImpressionsNew: {},
                    allArTrId: {}
                },
                topOffersOnline: {
                    arImpressions: {},
                    arImpressionsNew: {},
                    allArTrId: {}
                },

            },
            // заголовки табов топ-предложений
            categories: [
                {
                    type: 'topOffersNew',
                    tab_active: true,
                    message: 'Новинки',
                    active: true,
                    href: 'new'
                },
                {
                    type: 'topOffersHots',
                    tab_active: true,
                    message: 'Горячие предложения',
                    active: false,
                    href: 'hot'
                },
                {
                    type: 'topOffersHits',
                    tab_active: true,
                    message: 'Хиты продаж',
                    active: false,
                    href: 'hit'
                },
                {
                    type: 'topOffersOnline',
                    tab_active: true,
                    message: 'Выбор онлайн-покупателей',
                    active: false,
                    href: 'online'
                }
            ],
            // заголовки табов журнала
            tabs: [
                {
                    message: 'Все статьи',
                    active: true,
                    href: 'all'
                },
                {
                    message: 'Обзор',
                    active: false,
                    href: 'review'
                },
                {
                    message: 'Как выбрать',
                    active: false,
                    href: 'choice'
                },
                {
                    message: 'Полезные советы',
                    active: false,
                    href: 'advices'
                }
            ],
            // содержимое табов топ-предложений (признак показывать или нет)
            goods: {
                hit: true,
                hot: false,
                new: false,
                online: false
            },
            // топ-предложения (товары)
            topOffersHits: [],
            topOffersHots: [],
            topOffersNew: [],
            topOffersOnline: [],

            // избранное текущего пользователя
            favorites: [],
            // элементы пользовательского интерфейса
            ui: {
                // показывать ли прелоадер топ-предложений
                isShowOffersPreloader: true,
                // показывать ли блок RR (неиспользуется временно)
                isShowRR: false,
                // инициализирован ли слайдер товаров
                isSliderProductsInit: false,
            },
        },
        /**
         * Vue lifecycle hook. Called synchronously after the instance is created.
         */
        created() {
            // запрашивает в API информацию для формирования объекта
            console.log('loading...');
            this.loadMainPageData();
            console.log('loaded...');
        },
        mounted() {
            this.$nextTick(function () {
                // Код, который будет запущен только после
                // отрисовки всех представлений
            })
        },
        computed: {
            // topOffersHitsCopy() {
            //     return this.topOffersHits.slice()
            // },
            // topOffersHotsCopy() {
            //     return this.topOffersHots.slice()
            // },
            // topOffersNewCopy() {
            //     return this.topOffersNew.slice()
            // },
        },
        watch: {
            // topOffersHitsCopy(a, b) {
            //     // this.calls ++
            //     if (a.length !== b.length) return this.onChangeTopOffers()
            //     for (let i = 0; i < a.length; i++) {
            //         if (a[i] !== b[i]) return this.onChangeTopOffers()
            //     }
            // },
            // topOffersHotsCopy(a, b) {
            //     // this.calls ++
            //     if (a.length !== b.length) return this.onChangeTopOffers()
            //     for (let i = 0; i < a.length; i++) {
            //         if (a[i] !== b[i]) return this.onChangeTopOffers()
            //     }
            // },
            // topOffersNewCopy(a, b) {
            //     // this.calls ++
            //     if (a.length !== b.length) return this.onChangeTopOffers()
            //     for (let i = 0; i < a.length; i++) {
            //         if (a[i] !== b[i]) return this.onChangeTopOffers()
            //     }
            // },

        },
        methods: {
            /**
             * Нужно писать описание к каждой функции.
             * @param tab
             */
            changeTab: function (tab) {
                this.tabs.forEach(el => {
                    el.active = el === tab;
                })
                this.currentNewsTab = tab.href;
                slideToStart();
            },

            /**
             * Устанавливает активный таб топ-предложений
             * @param item
             */
            changeCategory: function (item) {
                this.categories.forEach(el => {
                    el.active = el === item;
                })
                this.currentTab = item.href;

                // вызвать событие при смене показываемой категории топ-предложений
                this.onChangeTopOffers();
            },

            /**
             * Обработчик клика на кнопке "добавить в корзну"
             * Добавляет товар в корзину (одну единицу - по умолчанию, или сколько укажет пользователь на втором шаге)
             * @param item
             */
            addBasket: function (item) {
                console.log('Корзина: добавление в корзину');
                // проверяет, что товар ещё не добавляется, чтобы препятствовать повторному клику по кнопке.
                if (item.btn.isProcessing !== true) {
                    if (item.count === 0) {
                        item.count = 1;
                    }
                    // показывает блок указания кол-ва товаров
                    // показывает сразу, до реального добавления, чтобы пользователь сразу мог добавить несколько товаров (ну такой он быстрый)
                    this.showChoiceBlock(item);

                    // по таймауту запускает функцию добавления товара в корзину
                    item.timeoutAjaxAddBasket = setTimeout(this.ajaxAddBasket, 1000, item);

                } else {
                    console.error('Корзина: повторное нажатие на "добавить в корзину", пока запрос не обработан');
                }
            },

            /**
             * Осуществляет ajax-запрос добавления товара в корзину
             * В случае успеха вызывает функцию показа блока изменения кол-ва
             * @param item
             */
            ajaxAddBasket(item) {
                // помечает товар, как обрабатывающийся
                item.btn.isProcessing = true;

                let quantity = item.count;
                let kcc = item.code;
                fetch("/ajax/basket/addBasket.php?quantity=" + quantity + "&kcc=" + kcc)
                    .then(response => response.json())
                    .then((data) => {
                        // анализирует ответ сервера
                        // console.log(data);
                        if (data.STATUS === "OK") {
                            item.isInCart = true;
                            // показывает обычное представление товара в зависимости от состояния
                            this.showCartBlock(item);
                            // обновляет маленькую корзину
                            $vmcart.loadData(false);
                            // вызывает маркетинговые события о добавлении в корзину товара из топ-предложений
                            this.marketingAdd2basketShopTopoffers(item, item.type);
                        } else {
                            item.isInCart = false;
                            item.count = 0;
                            // показывает обычное представление товара в зависимости от состояния
                            this.showCartBlock(item);
                            this.showModal('Ошибка добавления в корзину: ' + data.MESSAGE);
                        }
                        item.btn.isProcessing = false;

                    })
                    .catch(error => {
                        // this.errorMessage = error;
                        item.btn.isProcessing = false;
                        item.isInCart = false;
                        item.count = 0;
                        // показывает обычное представление товара в зависимости от состояния
                        this.showCartBlock(item);

                        console.error("Корзина: произошла ошибка при добавлении в корзину.", error);
                        // this.isShowAjaxCartPreloader = false;
                    })
            },

            blockSpecialChar(e) {
                const key = e.key;
                console.log(e);
                if (key == "-") {
                    e.preventDefault();
                    return;
                }
            },

            /**
             * Увеличивает или уменьшает кол-во товара в корзине
             * @param item
             * @param operation
             */
            changeCount: function (item, operation = null) {
                // проверяет, что еще не запущена обработка (чтобы не допускать кликов в процессе запроса)
                if (item.btn.isProcessing) {
                    console.error('Корзина: попытка кликнуть на изменение кол-ва в процессе запроса');
                    return false;
                }

                if (item.isInCart) {
                    // элемент в корзине. действует по логике "изменение существующего количества"
                    console.log('Корзина: изменение количества ранее добавленного товара');
                    // TODO: реализовать это в апи бекенда

                    clearTimeout(item.timeoutAjaxChangeCount);
                    let useTimeout = true;

                    if (item.count === '') {
                        // обрабатывает ситуацию, когда почему-то у элемента нет количества
                        item.count = 1;
                    }

                    switch (operation) {
                        case 'plus':
                            item.count++
                            break;
                        case 'minus':
                            if (item.count > 0) {
                                item.count--;
                            }
                            if (item.count === 0) {
                                item.isInCart = false;
                                this.showCartBlock(item);
                                useTimeout = false;
                                // удалить без таймаута
                                this.ajaxUpdateBasket(item);
                            }
                            break;
                        default:
                            break;
                    }

                    // запустить с таймаутом
                    if (useTimeout) {
                        item.timeoutAjaxChangeCount = setTimeout(this.ajaxUpdateBasket, 2000, item);
                    }
                } else {
                    // элемент не в корзине, увеличивает-уменьшает кол-во, добавляет по тайм-ауту
                    console.log('Корзина: изменение кол-ва перед добавлением.');

                    // приостанавливает имеющееся добавление
                    clearTimeout(item.timeoutAjaxAddBasket);
                    let useTimeout = true;

                    switch (operation) {
                        case 'plus':
                            item.count++
                            break;
                        case 'minus':
                            if (item.count > 0) {
                                item.count--;
                            }
                            if (item.count === 0) {
                                console.log('Корзина: отмена добавления товара в корзину.');
                                // отменяет добавление товара в корзину
                                this.showCartBlock(item);
                                useTimeout = false;
                            }
                            break;
                        default:
                            break;
                    }

                    // по-таймауту запускает функцию добавления товара в корзину
                    if (useTimeout) {
                        item.timeoutAjaxAddBasket = setTimeout(this.ajaxAddBasket, 1000, item);
                    }
                }
            },

            /**
             * Осуществляет ajax-запрос на изменение кол-ва товаров в корзине
             * TODO: объединить в одну логику с добавлением?
             */
            ajaxUpdateBasket: function (item) {
                item.btn.isProcessing = true;
                let callbackSuccess = () => {
                    item.btn.isProcessing = false;
                    if (item.count === 0) {
                        item.isInCart = false;
                    }
                    this.showCartBlock(item);
                };
                let callbackError = () => {
                    item.btn.isProcessing = false;
                };
                $vmcart.action("ChangeProductQuantity", {
                    'quantity': item.count,
                    "kss": item.code
                }, true, false, callbackSuccess, callbackError);
                //rrApi.recomAddToCart(itemId, { suggester: suges, methodName: alg });
            },

            /**
             * Обработчик клика на кнопке "показать окно изменения кол-ва" (отображается только на на мобильных)
             * @param item
             */
            mobQuantClick: function (item) {
                // показывает блок "изменить кол-во", а затем по таймауту возвращает всё обратно
                this.showChoiceBlock(item);
                item.timeoutAjaxChangeCount = setTimeout(this.showCartBlock, 2000, item);
            },

            /**
             * Показывает блок изменения кол-ва товаров в корзине
             * В зависимости от разрешения экрана, показывает основную или мобильную версию
             * @param item
             */
            showChoiceBlock: function (item) {
                // скрывает кнопку "добавить в корзину"
                item.btn.cart = false;
                // в зависимости от ширины блока
                if (window.innerWidth <= 600) {
                    // для мобильных
                    // скрывает цену
                    item.btn.price = false;
                    // показывает мобильный "выбиратор"
                    item.btn.choiceMob = true;
                    // скрывает десктопный "выбиратор"
                    item.btn.choice = false;
                    // скрывает кнопку "показать изменение кол-ва"
                    item.btn.mobQuant = false;
                } else {
                    // показывает обычный "выбиратор"
                    item.btn.choice = true;
                    // скрывает мобильный "выбиратор"
                    item.btn.choiceMob = false;
                }
            },

            /**
             * Показывает блок товара в зависимости от его состояния (в корзине, не в корзине)
             * TODO: переименовать в renderProduct
             * @param item
             */
            showCartBlock: function (item) {
                if (item.isInCart === false) {
                    // товар не в корзине
                    console.log('Отрисовка товара: не в корзине')

                    // показывает блок "добавить в корзину"
                    item.btn.cart = true;
                    if (window.innerWidth <= 600) {
                        // на мобильных устройствах
                        console.log('Отрисовка товара: мобильный');
                        item.btn.price = true;
                        // скрывает десктопный "выбиратор"
                        item.btn.choice = false;
                        // скрывает мобильный "выбиратор"
                        item.btn.choiceMob = false;
                        if (item.count > 0) {
                            // показывает блок "сколько добавлено" вместо кнопки "добавить"
                            item.btn.cart = false;
                            item.btn.mobQuant = true;
                        }
                    } else {
                        // на компьютерах
                        console.log('Отрисовка товара: десктоп');
                        item.btn.price = true;
                        // скрывает обычный "выбиратор"
                        item.btn.choice = false;
                        // скрывает мобильный "выбиратор"
                        item.btn.choiceMob = false;
                        // скрывает мобильную кнопку "показать изменение кол-ва"
                        item.btn.mobQuant = false;
                    }
                } else {
                    // товар в корзине
                    console.log('Отрисовка товара: в корзине')

                    // скрывает блок "добавить в корзину"
                    item.btn.cart = false;
                    if (window.innerWidth <= 600) {
                        // на мобильных устройствах
                        console.log('Отрисовка товара: мобильный');
                        item.btn.price = true;
                        item.btn.choice = false;
                        item.btn.choiceMob = false;
                        if (item.count > 0) {
                            // показывает блок "сколько добавлено" вместо кнопки "добавить"
                            item.btn.cart = false;
                            item.btn.mobQuant = true;
                        }
                    } else {
                        // на компьютерах
                        console.log('Отрисовка товара: десктоп');
                        item.btn.price = true;
                        // показывает обычный "выбиратор"
                        item.btn.choice = true;
                        // скрывает мобильный "выбиратор"
                        item.btn.choiceMob = false;
                        // скрывает мобильную кнопку "показать изменение кол-ва"
                        item.btn.mobQuant = false;
                    }
                }
            },

            /**
             * Показывает модальное окно (обычно с сообщением об ошибке)
             * Не имеет отношения к остальным всплывающим окнам на странице
             * Топорный костыль пока не будет другого ui
             *
             * @param text текст сообщения
             */
            showModal: function (text) {
                const oPopup = new BX.PopupWindow('oder_props_weight', window.body, {
                    autoHide: true,
                    offsetTop: 1,
                    offsetLeft: 0,
                    lightShadow: true,
                    closeIcon: true,
                    closeByEsc: true,
                    overlay: {
                        backgroundColor: '#000', opacity: '60'
                    },
                    events: {
                        onPopupClose: function (popupWindow) {
                            popupWindow.destroy();
                        }
                    }
                });
                const modal = "<div id='bl_modal_weight'><div class='b_conteiner'>" + text + "</div></div>";
                oPopup.setContent(modal);
                oPopup.show();
            },

            /**
             * Общая функция для наполнения "избранного" пользователя
             * Видимо далее нужно вызывать функцию, которая будет "показывать сердечки" избранноого
             *
             * @param data
             */
            renderFavorites(data) {
                console.log('favorites: render');
                Object.entries(data).forEach(([key, item]) => {
                    // console.log(item);

                    let Favorite = {
                        id: null,
                        name: null,
                        productId: null,
                        code: null,
                    }

                    // основная информация
                    Favorite.id = item.ID;
                    Favorite.productId = item.ELEMENT_ID;
                    Favorite.name = item.NAME;
                    Favorite.code = item.CODE;
                    // добавить в массив
                    this.favorites.push(Favorite);

                    // подразумевается, что все данные о товарах уже загружены ранее
                    const topOffers = [
                        'topOffersHits',
                        'topOffersHots',
                        'topOffersNew',
                        'topOffersOnline',
                    ];

                    // для каждого типа товаров прорисовывает "избранное"
                    topOffers.forEach(
                        typeTopOffer => {
                            Object.entries(this[typeTopOffer]).forEach(([key, product]) => {
                                if (product.code == Favorite.code) {
                                    product.isFavorite = true;
                                    Vue.set(this[typeTopOffer], key, product);
                                    console.log('favorites: ' + product.code + " в избранном");
                                }
                                // } else  {
                                //     product.isFavorite = false;
                                //     // console.log(product.code + " НЕ в избранном");
                                // }
                            });
                        });
                });
            },

            /**
             * Общая функция для показа скидок
             * @param data
             */
            renderDiscount(data) {
                if (data.STATUS === "Y") {
                    let discount = Number(data.DISCOUNT);

                    // подразумевается, что все данные о товарах уже загружены ранее
                    const topOffers = [
                        'topOffersHits',
                        'topOffersHots',
                        'topOffersNew',
                        'topOffersOnline',
                    ];

                    // для каждого типа товаров прорисовывает "скидку"
                    topOffers.forEach(
                        typeTopOffer => {
                            Object.entries(this[typeTopOffer]).forEach(([key, product]) => {

                                // TODO тут нужно пересчитывать цены на основе скидки
                                // рассчитывает коэффициенты скидки
                                let current_price = product.price;
                                let discount_value = product.price * discount / 100;
                                let new_price = current_price - discount_value;

                                // устанавливает новую цену
                                product.price = new_price;
                                product.priceFormatted = Math.ceil(product.price);

                                //product.priceFormatted = parseFloat(product.price).mdPriceFormat(true);

                                if (product.oldPrice == 0) {
                                    // если у товара не было старой цены
                                    product.oldPrice = current_price;
                                    product.oldPriceFormatted = Math.ceil(product.oldPrice);
                                }
                                if (product.discount > 0) {
                                    // если у товара уже была скидка, пересчитать её фактический размер
                                    let new_discount = 100 - (new_price * 100 / product.oldPrice);
                                    product.discount = Math.ceil(new_discount);
                                } else {
                                    // иначе установить ту, что пришла из базы
                                    product.discount = discount;
                                }

                                Vue.set(this[typeTopOffer], key, product);
                            });
                        });
                };
            },

            /**
             * Общая функция для рендеринга топ-предложений
             * @param data
             * @param typeTopOffers - тип топ-предложения (topOffersHots, topOffersHits, topOffersNew)
             */
            renderTopOffers(data, typeTopOffers) {
                console.log('topOffers: render ' + typeTopOffers);
                if(Object.keys(data.ITEMS).length > 0){

                    Object.entries(data.ITEMS).forEach(([key, item]) => {
                        let Product = {
                            id: null,
                            images: [],
                            online: false,
                            super: false,
                            hit: false,
                            new: false,
                            count: 1,
                            name: null,
                            detailURL: null,
                            rating: false,
                            code: null,
                            price: false,
                            priceFormatted: false,
                            oldPrice: false,
                            oldPriceFormatted: false,
                            discount: false,
                            measure: null,
                            type: null,
                            isFavorite: false,
                            isCompare: false,
                            isInCart: false,
                            btn: {
                                cart: true,
                                price: true,
                                choice: false,
                                choiceMob: false,
                                mobQuant: false,
                                isProcessing: false,
                            },
                        }

                        // изображения товара
                        if (Array.isArray(item.images) && item.images.length > 0) {
                            Object.entries(item.images).forEach(([key, image]) => {
                                Product.images.push({
                                    src: image.src
                                });
                            });
                        } else {
                            // картинка-заглушка
                            Product.images.push({
                                src: '/local/templates/maxi2020/img/nophoto.jpg'
                            });
                        }

                        // бейджи товара
                        if (item.offer.PROPERTY_REP_IMATRIX_VALUE === 'rep10') {
                            Product.online = true;
                        }
                        if (item.offer.PROPERTY_REP_ACTION_R_VALUE === 'rep1') {
                            Product.super = true;
                        }
                        if (item.offer.PROPERTY_REP_ACTION_FIRST_VALUE === 'rep1') {
                            Product.hit = true;
                        }
                        if (item.offer.PROPERTY_REP_ACTION_NEW_VALUE === 'rep1') {
                            Product.new = true;
                        }

                        // основная информация
                        Product.id = item.ID;
                        Product.name = item.NAME;
                        Product.detailURL = item.detailURL;
                        Product.code = item.PROPERTY_ITEM_CODE_VALUE;
                        Product.measure = item.offer.MEASURE;

                        Product.price = item.price;
                        Product.priceFormatted = parseFloat(item.price).mdPriceFormat(true);
                        Product.oldPrice = item.oldPrice;
                        Product.oldPriceFormatted = parseFloat(item.oldPrice).mdPriceFormat(true);
                        Product.discount = item.discount;

                        Product.type = typeTopOffers;

                        // добавить в нужный массив
                        this[typeTopOffers].push(Product);
                        // Vue.set(this.productsHits, key, Object.values(value));
                        // console.log(this[typeTopOffers]);
                    });

                    // маркетинг
                    Vue.set(this.marketing[typeTopOffers], 'arImpressions', data.arImpressions);
                    Vue.set(this.marketing[typeTopOffers], 'arImpressionsNew', data.arImpressionsNew);
                    Vue.set(this.marketing[typeTopOffers], 'allArTrId', data.allArTrId);

                } else {
                    this.categories.forEach(el => {
                        if(typeTopOffers === el.type){
                            el.tab_active = false;
                        }
                    })
                }

            },

            /**
             * Общая функция для рендеринга баннеров
             * @param data
             * @param typeBanners - тип баннера (banners, bannersLeft, bannersRight)
             */
            renderBanners(data, typeBanners) {
                console.log('banners: render ' + typeBanners);
                Object.entries(data).forEach(([key, item]) => {
                    // console.log(item);

                    const Banner = {
                        id: null,
                        src: null,
                        srcBig: null,
                        srcMobile: null,
                        href: null
                    };

                    Banner.srcBig = item.src;
                    Banner.srcMobile = item.src;
                    Banner.href = item.href;

                    //временный костыль для мобильных
                    if (window.innerWidth <= 600) {
                        Banner.src = Banner.srcMobile;
                    } else {
                        Banner.src = Banner.srcBig;
                    }

                    // добавляет в нужный массив
                    this[typeBanners].push(Banner);
                });
            },

            /**
             * Добавляет/удаляет товар из избранного
             * @param item
             */
            toggleFavorites(item) {
                if (item.isFavorite === false) {
                    console.log('favorites: adding', item.id, item.name);
                    BX.ajax({
                        method: 'POST',
                        dataType: 'json',
                        async: true,
                        url: '/bitrix/tools/wsm.favorites/action.php',
                        data: {
                            'action': 'add',
                            'id': item.id
                        },
                        cache: false,
                        onsuccess: function (data) {
                            if (data['success']) {
                                console.log('favorites: added', item.id, item.name);
                                item.isFavorite = true;
                            } else {
                                console.error('favorites: not added', item.id, item.name, data['error_message']);
                                alert(data['error_message']);
                            }
                        },
                        onfailure: function () {
                            console.error('favorites: general failure');
                            return false;
                        }
                    });
                } else {
                    console.log('favorites: removing...', item.id, item.name);
                    BX.ajax({
                        url: '/bitrix/tools/wsm.favorites/action.php',
                        method: 'POST',
                        dataType: 'json',
                        async: true,
                        data: {
                            'action': 'remove',
                            'id': item.id
                        },
                        onsuccess: function (data) {
                            if (data['success']) {
                                console.log('favorites: removed', item.id, item.name);
                                item.isFavorite = false;
                            } else {
                                console.error('favorites: not removed', item.id, item.name, data['error_message']);
                                alert(data['error_message']);
                            }
                        },
                        onfailure: function () {
                            console.log('failure');
                        }
                    });
                    item.isFavorite = false;
                }
            },

            /**
             * Инициализирует ajax-запросы к API-главной
             * Инициализирует наполнение данными объекта Vue по результатам этих запросов
             * @param updateRR - обновлять ли блок RetailRocket (по-умолчанию - да)
             */
            loadMainPageData(updateRR = true) {
                // this.ui.isShowAjaxCartPreloader = true;

                // загружает баннеры
                const banners = [
                    'bannersTop'
                ];

                let bannersProcessed = 0;
                try {
                    banners.forEach(function (typeBanners, index, array) {
                        fetch("/ajax/main/apiJson.php?action=" + typeBanners)
                            .then(response => response.json())
                            .then((data) => {
                                // наполняет данными объект
                                this.renderBanners(data, typeBanners);
                            })
                            .then(() => {
                                bannersProcessed++;
                                if (bannersProcessed === array.length) {
                                    // инициализирует слайдер-баннеров после загрузки всех элементов
                                    this.initSliderMain();
                                    // скрывает прелоадер баннеров
                                    // this.ui.isShowOffersPreloader = false;
                                }
                            })
                            .catch(error => {
                                // this.errorMessage = error;
                                console.error("Произошла ошибка при инициализации баннеров", error);
                                // this.isShowAjaxCartPreloader = false;
                            })
                    }, this);
                } catch (e) {
                    console.error("Произошла ошибка при инициализации баннеров", e);
                }

                // загружает все типы top-offers
                const topOffers = [
                    'topOffersHits',
                    'topOffersHots',
                    'topOffersNew',
                    'topOffersOnline',
                ];

                let itemsProcessed = 0;
                // для каждого запрашивает данные
                topOffers.forEach(function (typeTopOffers, index, array) {
                    fetch("/ajax/main/apiJson.php?action=" + typeTopOffers)
                        .then(response => response.json())
                        .then((data) => {
                            // наполняет данными объект
                            this.renderTopOffers(data, typeTopOffers);
                        })
                        .then(() => {
                            // отправляет маркетинговую информацию
                            this.marketingOnLoad(typeTopOffers);
                        })
                        .then(() => {
                            itemsProcessed++;
                            if (itemsProcessed === array.length) {
                                // инициализирует слайдер товаров после загрузки всех категорий элементов
                                console.log('topOffers: slider delay 1 sec');
                                setTimeout(this.initSliderProducts, 1);
                                // скрывает прелоадер топ-предложений
                                console.log('topOffers: preloader hide');
                                this.ui.isShowOffersPreloader = false;
                                // инициализирует загрузку данных избранного
                                this.loadFavoritesData();
                                // инициализирует загрузку данных акций
                                this.loadDiscountData();
                            }
                        })
                        .catch(error => {
                            // this.errorMessage = error;
                            console.error("Произошла ошибка при инициализации топ-предложений", error);
                            // this.isShowAjaxCartPreloader = false;
                        })
                }, this);

                // fetch("/ajax/main/apiJson.php?action=")
                //     .then(response => response.json()).then((data) => {
                //     this.renderData(data);
                //     // if (updateRR) {
                //     //     // первоначальная загрузка блока идет с таймаутом
                //     //     this.updateRRWithTimeOut();
                //     // }
                //     // this.ui.isShowAjaxCartPreloader = false;
                // })
                //     .catch(error => {
                //         this.errorMessage = error;
                //         console.error("Произошла ошибка в процессе выполнения загрузки главной страницы.", error);
                //         this.isShowAjaxCartPreloader = false;
                //     });
            },

            /**
             * Загружает данные избранного
             */
            loadFavoritesData: function () {
                try {
                    fetch("/ajax/user_favorites/apiJson.php?action=" + 'list')
                        .then(response => response.json())
                        .then((data) => {
                            // наполняет данными "избранное"
                            this.renderFavorites(data);
                        })
                        .catch(error => {
                            console.error("Произошла ошибка при инициализации избранного", error);
                        })
                } catch (e) {
                    console.error("Произошла ошибка при инициализации избранного", e);
                }
            },

            /**
             * Загружает данные об акциях
             */
            loadDiscountData: function () {
                try {
                    // Build formData object.
                    let formData = new FormData();
                    formData.append('get_action', 'Y');

                    const requestOptions = {
                        method: "POST",
                        body: formData
                    };
                    fetch("/ajax/getActionValue.php", requestOptions)
                        .then(response => response.json())
                        .then((data) => {
                            // наполняет данными "об акции"
                            this.renderDiscount(data);
                        })
                        .catch(error => {
                            console.error("Произошла ошибка при инициализации акций", error);
                        })
                } catch (e) {
                    console.error("Произошла ошибка при инициализации акций", e);
                }
            },

            /**
             * Срабаыватает при обновлении топ-предложений
             */
            onChangeTopOffers: function () {
                // TODO: тут может быть какая-то обработка...
            },

            // Ниже идут заглушки-костыли методов для блока RR.
            // TODO: ПЕРЕДЕЛАТЬ НОРМАЛЬНЫМ СПОСОБОМ т.к эти методы и их сигнатуры разработаны впервые для корзины,
            // и затем были переданы rr для реализации блока в корзине (см. cart.js), задачи отдельно делать код для rr не было.
            // А сейчас они тут просто потому, что этот же блок rr используют и на главной тоже (а может будут и на остальных страницах).
            // В целях облегчения дальнейней работы, в эти методы сейчас запрещается вставлять любые функции, кроме предназначенных для rr.

            /**
             * Данный метод в корзине вызывался после добавления товара из блока rr после нажатия на иконку "корзина"
             * Раньше он просто обновлял корзину.
             * Теперь о его предназначение может быть другое
             * @param param
             */
            loadData: function (param) {
                this.updateLittleCard();
            },

            /**
             * Обновляет маленькую корзину (для rr)
             */
            updateLittleCard: function () {
                $.get("/ajax/shop/littlecart.php?maxi2020=Y", function (data) {
                    $('#cart-quantity').html(data);
                    $('#cart-quantity-small').html(data);
                    // $.get("/ajax/shop/littlecart_small.php?maxi2020=Y", function (data) {
                    //     $('#cart-quantity-small').html(data);
                    // });
                    $.get("/ajax/shop/updateregion.php", function (data) {
                        $("#dropdownMenuLink").text(data);
                    });
                });
            },

            /**
             * Инициализирует ajax-запрос к API-корзины с определёнными параметрами (для rr)
             * NOTE: раньше этот кусок был скопирован из корзины, теперь мы ушли от обращения к апи корзины с главной, поэтому тут некоторое легаси
             *
             * @param action название действия - не используется!
             * @param options список параметров для действия
             * @param updateLittleCard обновлять ли маленькую корзину
             * @param updateRR обновлять ли блок RetailRocket
             * @param callbackSuccess функция для вызова в случае успеха
             * @param callBackError функция для вызова в случае ошибки
             */
            action: function (action, options = false, updateLittleCard = false, updateRR = false, callbackSuccess = null, callBackError = null) {

                // формирует параметры запроса
                let body = {
                    action: action,
                    options: options,
                };

                const requestOptions = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                };

                // показывает прелоадер
                // this.ui.isShowAjaxCartPreloader = true;

                fetch("/ajax/basket/addBasket.php?isModeSet=1", requestOptions)
                    .then(response => response.json())
                    .then((data) => {
                        // if (data.redirect) {
                        //     // TODO: иногда сервер хочет перезагрузить страницу.
                        //     //       нужно от этого, конечно, избавляться
                        //     window.location = data.url;
                        // }

                        // обновляет данные в объекте Vue
                        // this.renderData(data);

                        // скрывает прелоадер
                        // this.ui.isShowAjaxCartPreloader = false;
                        // если нужно, обновляет маленькую корзину
                        if (updateLittleCard) {
                            this.updateLittleCard();
                        }
                        // ну и rr тоже
                        if (updateRR) {
                            this.updateRR();
                        }

                        if (data.STATUS === "OK") {
                            // вызвать дополнительную функцию
                            if (callbackSuccess != null) {
                                callbackSuccess.call(this);
                            }
                        } else {
                            this.showModal("Ошибка изменения количества: " +  data.MESSAGE);
                            // вызвать дополнительную функцию
                            if (callBackError != null) {
                                callBackError.call(this);
                            }
                        }
                    })
                    .catch(error => {
                        // this.errorMessage = error;
                        this.showModal("Произошла ошибка в процессе выполнения запроса-действия к корзине!");
                        console.error("Корзина: ошибка выполнения запроса", error);
                        // вызвать дополнительную функцию
                        if (callBackError != null) {
                            callBackError.call(this);
                        }
                        // скрывает прелоадер
                        // this.ui.isShowAjaxCartPreloader = false;
                    });
            },

            // end of костыли для rr

            // слайдеры

            /**
             * Swiper slider для фотографий товаров и самих товаров
             */
            initSliderProducts: function () {
                if (!this.ui.isSliderProductsInit) {
                    console.log('topOffers: swiper init');
                    // товары слайдятся только на небольших экранах
                    if (window.innerWidth <= 1140 && window.innerWidth > 600) {
                        const sliderProducts = new Swiper('.products-slider', {
                            speed: 500,
                            observer: true,
                            slidesPerView: 3,
                            slidesPerGroup: 1,
                            stretch: 5,
                            observeParents: true,
                        });
                    } else if (window.innerWidth <= 600) {
                        const sliderProducts = new Swiper('.products-slider', {
                            speed: 500,
                            observer: true,
                            slidesPerView: 2.15,
                            slidesPerGroup: 1,
                            stretch: 5,
                            observeParents: true,
                        });
                    }

                    const sliderPhoto = new Swiper('.photo-slider', {
                        speed: 500,
                        observer: true,
                        loop: true,
                        observeParents: true,
                        pagination: {
                            el: '.photo-slider-pagination',
                            type: 'bullets',
                        },
                    });

                    this.ui.isSliderProductsInit = true;
                } else {
                    console.error('topOffers: swiper already init!');
                }
            },

            /**
             * Swiper slider main
             */
            initSliderMain: function () {
                console.log('banners: swiper init');
                const newMainSlider = new Swiper('#newmain-slider', {
                    speed: 500,
                    effect: 'fade',
                    loop: true,
                    fadeEffect: {
                        crossFade: true
                    },
                    pagination: {
                        el: '.newmain-slider-pagination',
                        type: 'bullets',
                    },
                    navigation: {
                        nextEl: '.newmain-slider-next',
                        prevEl: '.newmain-slider-prev',
                    },
                    autoplay: {
                        delay: 5000,
                    },
                });
            },

            // end of sliders

            // маркетинговые функции

            /**
             * Маркетинговый обработчик клика по топ-предложению
             * @param item
             */
            marketingProductClickTopoffers: function (item, type) {
                try {
                    const id = item.id;
                    const impressions_main_shop_topoffers_new = this.marketing[type].arImpressionsNew;
                    if (impressions_main_shop_topoffers_new[id].id > 0) {
                        console.log('marketing: productClick');
                        dataLayer.push({
                            "event": "productClick",
                            "ecommerce": {
                                "click": {
                                    "actionField": {"list": "Карточка товара"},
                                    "products": [impressions_main_shop_topoffers_new[id]]
                                }
                            },
                            'customerCity': window.customerCity
                        });

                        //(window["rrApiOnReady"] = window["rrApiOnReady"] || []).push(function() {
                        //try{ rrApi.view(impressions_main_shop_topoffers_new[id].id_element); } catch(e) {}
                        //});

                        // TrackId
                        tgCallEvent('product_view', this.marketing[type].allArTrId[id]);
                    }
                } catch (e) {
                    console.error('marketing: ' + e);
                }
            },

            /**
             * Создаёт маркетинговый слой после загрузки страницы
             * @param type
             */
            marketingOnLoad: function (type) {
                try {
                    const main_shop_topoffers_page_load_impressions = this.marketing[type].arImpressions;
                    if (main_shop_topoffers_page_load_impressions.length > 0) {
                        console.log('marketing: dataLayer ' + type + ' loaded');
                        dataLayer.push({
                            'ecommerce': {
                                'currencyCode': 'RUR',
                                'impressions': main_shop_topoffers_page_load_impressions
                            },
                            'customerCity': window.customerCity
                        });
                    } else {
                        console.error('marketing: no data for dataLayer ' + type);
                    }
                } catch (e) {
                    console.error('marketing: ' + e);
                }
            },

            /**
             * Маркетинговый обработчик добавления в корзину
             * @param item
             * @param type
             */
            marketingAdd2basketShopTopoffers: function (item, type) {
                try {
                    const id = item.id;
                    const impressions_main_shop_topoffers_new = this.marketing[type].arImpressionsNew;
                    const impressions_ArTrId = this.marketing[type].allArTrId;
                    //console.log(id);
                    //console.log(impressions_main_shop_topoffers_new);
                    //console.log(impressions_main_shop_topoffers_new[id]);

                    if (impressions_main_shop_topoffers_new[id].id > 0) {
                        console.log('marketing: product from ' + type + ' added to basket');
                        dataLayer.push({
                            'event': 'addToCart',
                            'ecommerce': {
                                'currencyCode': 'RUR',
                                'add': {
                                    'actionField': {'list': '<?//=$list?>'},
                                    "products": [impressions_main_shop_topoffers_new[id]]
                                }
                            },
                            'customerCity': window.customerCity
                        });

                        //console.log(impressions_main_shop_topoffers_new[id].id_element);
                        //rrApi.addToBasket(impressions_main_shop_topoffers_new[id].id_element);

                        // TrackId
                        //impressions_ArTrId[id].quantity = $("#inp_counter_tof_"+impressions_ArTrId[id].id).val();
                        // TODO: add real count
                        // impressions_ArTrId[id].quantity = $("#it_column_" + id).find(".number .counter").val();
                        impressions_ArTrId[id].quantity = item.count;
                        tgCallEvent('product_add', impressions_ArTrId[id]);
                        console.log('marketing: trackAd data', impressions_ArTrId[id]);
                    } else {
                        console.error('marketing: cannot find product from ' + type);
                    }

                    // Facebook Pixel Code
                    /*fbq('track', 'AddToCart', {
                        content_ids: impressions_ArTrId[id].id,
                        content_type: 'product',
                        value: impressions_ArTrId[id].price,
                        currency: 'USD'
                    });*/
                } catch (e) {
                    console.error('marketing: ' + e);
                }
            }
        }
    });

    const articleSlider = new Swiper('.article-slider', {
        speed: 500,
        slidesPerView: 3,
        stretch: 5,
        observer: true,
        spaceBetween: 30,
        navigation: {
            nextEl: '.article-slider-next',
            prevEl: '.article-slider-prev',
        },
        on: {
            slideChange: function (swiper) {
                if (swiper.activeIndex == 0) {
                    $('.article-slider-prev').hide();
                } else {
                    $('.article-slider-prev').show();
                }
            },
        },
    });

    function slideToStart() {
        articleSlider.slideTo(0);
    }

    if (window.innerWidth <= 1140) {
        const articleSlider = new Swiper('.article-slider', {
            speed: 500,
            slidesPerView: 3,
            observer: true,
            spaceBetween: 60,
        });
    }

    if (window.innerWidth <= 600) {
        const articleSlider = new Swiper('.article-slider', {
            speed: 500,
            observer: true,
            slidesPerView: 2,
            spaceBetween: 30,
        });
        const advertsSlider = new Swiper('#adverts-slider', {
            speed: 500,
            loop: true,
            pagination: {
                el: '.adverts-slider-pagination',
                type: 'bullets',
            },
        });
    }
}// if newmain
