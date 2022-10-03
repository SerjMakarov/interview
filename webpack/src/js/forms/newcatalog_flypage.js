import {Swiper, Navigation, Pagination, Scrollbar, Controller} from 'swiper';

Swiper.use([Navigation, Pagination, Scrollbar, Controller]);

if (document.getElementById("newcatalog2022_flypage")) {
    // Vue
    window.$vmcart = new Vue({
        el: '#newcatalog2022_flypage',
        data: {
            // информация о товаре
            product: {
                // код ксс товара
                code: null,
                // наименование
                name: null,
                // количество товара
                count: 0,
                // признак, что товар в корзине
                isInCart: false,
                ui: {
                    // признак, что процесс добавления/изменения корзины уже идёт
                    isProcessing: false,
                    // показывать ли блок "добавление в корзину"
                    isShowAddBasket: true,
                    // показывать ли блок "изменение количества"
                    isShowChangeBasket: false,
                },
            },

            // форма "уведомить о снижении цены"
            formPriceDown: {
                error: null,
                email: null,
                isShowResult: false,
                isProcessing: false,
            },

            formCalculator: {
                count: 0,
            },

            user: {
                email: null,
            },

            // доступность товара в магазинах
            availableStoreCount: 0,

            // блоки табов
            isOpenDescription: false,
            isOpenCharacter: false,
            isOpenCalc: false,
            isOpenAvailable: false,
            isOpenReview: false,
            isOpenSert: false,
            isDescrArrowDown: true,
            isCharArrowDown: true,
            isCalcArrowDown: true,
            isAvalArrowDown: true,
            isRevArrowDown: true,
            isSertArrowDown: true,
        },
        created: function () {
            // устанавливает доступность из глобальной переменной
            // TODO: брать из апи.
            this.availableStoreCount = vueAvailableStoreCount;
            // устанавливает код ксс из глобальной переменной
            this.product.code = vueKcc;
            this.product.name = vueName;
            this.user.email = vueEmail;
            this.formPriceDown.email = this.user.email;
        },
        methods: {
            /**
             * Обработчик изменения табов
             * @param name
             */
            changeBlock: function (name) {
                switch (name) {
                    case 'description':
                        if (this.isOpenDescription) {
                            this.isOpenDescription = false;
                            this.isDescrArrowDown = true;
                        } else {
                            this.isOpenDescription = true;
                            this.isDescrArrowDown = false;
                        }
                        break;
                    case 'character':
                        if (this.isOpenCharacter) {
                            this.isOpenCharacter = false;
                            this.isCharArrowDown = true;
                        } else {
                            this.isOpenCharacter = true;
                            this.isCharArrowDown = false;
                        }
                        break;
                    case 'calc':
                        if (this.isOpenCalc) {
                            this.isOpenCalc = false;
                            this.isCalcArrowDown = true;
                        } else {
                            this.isOpenCalc = true;
                            this.isCalcArrowDown = false;
                        }
                        break;
                    case 'available':
                        if (this.isOpenAvailable) {
                            this.isOpenAvailable = false;
                            this.isAvalArrowDown = true;
                        } else {
                            this.isOpenAvailable = true;
                            this.isAvalArrowDown = false;
                        }
                        break;
                    case 'review':
                        if (this.isOpenReview) {
                            this.isOpenReview = false;
                            this.isRevArrowDown = true;
                        } else {
                            this.isOpenReview = true;
                            this.isRevArrowDown = false;
                        }
                        break;
                    case 'sert':
                        if (this.isOpenSert) {
                            this.isOpenSert = false;
                            this.isSertArrowDown = true;
                        } else {
                            this.isOpenSert = true;
                            this.isSertArrowDown = false;
                        }
                        break;
                }
            },

            /**
             * Функция склонения в зависимости от количества (копи-паста из корзины)
             *
             * @param number количество
             * @param words массив склонений, например ["бонус", "бонуса", "бонусов"]
             * @param onlyEnding возвращать только окончание (без цифры)
             *
             * @returns {string} строку типа "1 бонус"
             */
            declOfNum: function (number, words, onlyEnding = false) {
                let prefix = onlyEnding ? '' : number + ' ';
                return prefix + words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
            },

            /**
             * Обработчик клика на кнопке "добавить в корзну"
             * Добавляет товар в корзину (одну единицу - по умолчанию, или сколько укажет пользователь на втором шаге)
             * Практически копи-паста с главной страницы
             */
            addBasket: function () {
                console.log('Корзина: добавление в корзину');
                // проверяет, что товар ещё не добавляется, чтобы препятствовать повторному клику по кнопке.
                if (this.product.ui.isProcessing !== true) {
                    if (this.product.count === 0) {
                        this.product.count = 1;
                    }
                    // вариант 1.
                    // показывает блок указания кол-ва товаров
                    // показывает сразу, до реального добавления, чтобы пользователь сразу мог добавить несколько товаров (ну такой он быстрый)
                    // если это убрать, то нужно убирать и вызов добавления по тайм-ауту ниже.
                    // this.showChoiceBlock();
                    //
                    // // по таймауту запускает функцию добавления товара в корзину
                    // this.product.timeoutAjaxAddBasket = setTimeout(this.ajaxAddBasket, 1000);

                    // вариант 2.
                    // блокирует изменение кол-ва товара в корзине, пока он не добавится.
                    // сразу запускает функцию добавления товара в корзину, которая показывает блок изменения кол-ва после запроса.
                    this.ajaxAddBasket();

                } else {
                    console.error('Корзина: повторное нажатие на "добавить в корзину", пока запрос не обработан');
                }
            },

            /**
             * Осуществляет ajax-запрос добавления товара в корзину
             * В случае успеха вызывает функцию показа блока изменения кол-ва
             */
            ajaxAddBasket() {
                // помечает товар, как обрабатывающийся
                this.product.ui.isProcessing = true;

                let quantity = this.product.count;
                let kcc = this.product.code;

                if (!kcc) {
                    console.error('Код товара не установлен!');
                }

                fetch("/ajax/basket/addBasket.php?quantity=" + quantity + "&kcc=" + kcc)
                    .then(response => response.json())
                    .then((data) => {
                        // анализирует ответ сервера
                        // console.log(data);
                        if (data.STATUS === "OK") {
                            this.product.isInCart = true;
                            // показывает представление товара в зависимости от состояния
                            this.showCartBlock();
                            // обновляет маленькую корзину
                            this.loadData(false);
                            // TODO: вызывает маркетинговые события о добавлении в корзину товара из топ-предложений
                            // this.marketingAdd2basketShopTopoffers(item, item.type);
                        } else {
                            this.product.isInCart = false;
                            this.product.count = 0;
                            // показывает представление товара в зависимости от состояния
                            this.showCartBlock();
                            this.showModal('Ошибка добавления в корзину: ' + data.MESSAGE);
                        }
                        this.product.ui.isProcessing = false;

                    })
                    .catch(error => {
                        // this.errorMessage = error;
                        this.product.ui.isProcessing = false;
                        this.product.isInCart = false;
                        this.product.count = 0;
                        // показывает обычное представление товара в зависимости от состояния
                        this.showCartBlock();

                        console.error("Корзина: произошла ошибка при добавлении в корзину.", error);
                        // this.isShowAjaxCartPreloader = false;
                    })
            },

            /**
             * Показывает блок изменения кол-ва товаров в корзине
             * Данная функция нужна на первом шаге, когда товар ещё не в корзине, чтобы можно добавить две штуки.
             */
            showChoiceBlock: function () {
                // скрывает кнопку "добавить в корзину"
                this.product.ui.isShowAddBasket = false;
                // показывает обычный "выбиратор"
                this.product.ui.isShowChangeBasket = true;
            },

            /**
             * Показывает блок товара в зависимости от его состояния (в корзине, не в корзине)
             */
            showCartBlock: function () {
                if (this.product.isInCart === false) {
                    // товар не в корзине
                    console.log('Отрисовка товара: не в корзине')

                    // показывает блок "добавить в корзину"
                    this.product.ui.isShowAddBasket = true;

                    // на компьютерах
                    console.log('Отрисовка товара: десктоп');

                    // скрывает обычный "выбиратор"
                    this.product.ui.isShowChangeBasket = false;

                } else {
                    // товар в корзине
                    console.log('Отрисовка товара: в корзине');

                    //  скрывает блок "добавить в корзину"
                    this.product.ui.isShowAddBasket = false;

                    // на компьютерах
                    console.log('Отрисовка товара: десктоп');

                    // показывает обычный "выбиратор"
                    this.product.ui.isShowChangeBasket = true;
                }
            },

            /**
             * Увеличивает или уменьшает кол-во товара в корзине
             * @param operation
             */
            changeCount: function (operation = null) {
                // проверяет, что еще не запущена обработка (чтобы не допускать кликов в процессе запроса)
                if (this.product.ui.isProcessing) {
                    console.error('Корзина: попытка кликнуть на изменение кол-ва в процессе запроса');
                    return false;
                }

                if (this.product.isInCart) {
                    // элемент в корзине. действует по логике "изменение существующего количества"
                    console.log('Корзина: изменение количества ранее добавленного товара');
                    // TODO: реализовать это в апи бекенда

                    clearTimeout(this.product.timeoutAjaxChangeCount);
                    let useTimeout = true;

                    if (this.product.count === '') {
                        // обрабатывает ситуацию, когда почему-то у элемента нет количества
                        this.product.count = 1;
                    }

                    switch (operation) {
                        case 'plus':
                            this.product.count++
                            break;
                        case 'minus':
                            if (this.product.count > 0) {
                                this.product.count--;
                            }
                            if (this.product.count === 0) {
                                this.product.isInCart = false;
                                this.showCartBlock();
                                useTimeout = false;
                                // удалить без таймаута
                                this.ajaxUpdateBasket();
                            }
                            break;
                        default:
                            break;
                    }

                    // запустить с таймаутом
                    if (useTimeout) {
                        this.product.timeoutAjaxChangeCount = setTimeout(this.ajaxUpdateBasket, 2000);
                    }
                } else {
                    // элемент не в корзине, увеличивает-уменьшает кол-во, добавляет по тайм-ауту
                    console.log('Корзина: изменение кол-ва перед добавлением.');

                    // приостанавливает имеющееся добавление
                    clearTimeout(this.product.timeoutAjaxAddBasket);
                    let useTimeout = true;

                    switch (operation) {
                        case 'plus':
                            this.product.count++
                            break;
                        case 'minus':
                            if (this.product.count > 0) {
                                this.product.count--;
                            }
                            if (this.product.count === 0) {
                                console.log('Корзина: отмена добавления товара в корзину.');
                                // отменяет добавление товара в корзину
                                this.showCartBlock();
                                useTimeout = false;
                            }
                            break;
                        default:
                            break;
                    }

                    // по-таймауту запускает функцию добавления товара в корзину
                    if (useTimeout) {
                        this.product.timeoutAjaxAddBasket = setTimeout(this.ajaxAddBasket, 1000);
                    }
                }
            },

            /**
             * Осуществляет ajax-запрос на изменение кол-ва товаров в корзине
             * TODO: объединить в одну логику с добавлением?
             */
            ajaxUpdateBasket: function () {
                this.product.ui.isProcessing = true;
                let callbackSuccess = () => {
                    this.product.ui.isProcessing = false;
                    if (this.product.count === 0) {
                        this.product.isInCart = false;
                    }
                    this.showCartBlock();
                };
                let callbackError = () => {
                    this.product.ui.isProcessing = false;
                };
                $vmcart.action("ChangeProductQuantity", {
                    'quantity': this.product.count,
                    "kss": this.product.code
                }, true, false, callbackSuccess, callbackError);
                //rrApi.recomAddToCart(itemId, { suggester: suges, methodName: alg });
            },

            /**
             * Форма "Узнать о снижении цены"
             */
            sendPriceDown: function () {
                this.formPriceDown.error = null;
                if (!this.validateEmail(this.formPriceDown.email)) {
                    console.log("Узнать о снижении цены: введен некорректный адрес электронной почты");
                    this.formPriceDown.error = "Введен некорректный адрес электронной почты";
                } else {
                    console.log('Узнать о снижении цены: аякс-запрос...');
                    this.formPriceDown.isProcessing = true;
                    try {
                        // формирует параметры запроса
                        let body = {
                            "SKU_ID": this.product.code,
                            "ITEM": this.product.name,
                            "EMAIL": this.formPriceDown.email
                        };

                        const requestOptions = {
                            method: "POST",
                            body: JSON.stringify(body),
                            headers: {
                                // Добавляем необходимые заголовки
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        };

                        fetch("/ajax/priceDrop.php", requestOptions)
                            .then(response => response.json())
                            .then((data) => {
                                // анализирует ответ сервера
                                // console.log(data);
                                if (data.status === "success") {
                                    this.formPriceDown.isShowResult = true;
                                    this.formPriceDown.isProcessing = false;
                                    console.log('Узнать о снижении цены: аякс-запрос успешен.');
                                } else {
                                    this.formPriceDown.error = "К сожалению, сервис временно недоступен, попробуйте позже.";
                                    this.formPriceDown.isProcessing = false;
                                    console.error('Узнать о снижении цены: аякс-запрос неуспешен.');
                                }
                            })
                            .catch(error => {
                                this.showModal("Узнать о снижении цены: ошибка выполнения запроса. ".error);
                                console.error("Узнать о снижении цены: ошибка выполнения запроса.", error);
                            });
                    } catch (e) {
                        console.error('Узнать о снижении цены: ошибка', e);
                        this.formPriceDown.error = e;
                        this.formPriceDown.isProcessing = false;
                    }
                }
            },

            /**
             * Валидирует электропочту (вспомогательная функция)
             * @param email
             * @returns {boolean}
             */
            validateEmail: function(email) {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },

            // TODO: убрать эту копипасту!

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
                        // if (updateRR) {
                        // пока такой функции нет, ничего не обновляем.
                        //     this.updateRR();
                        // }

                        if (data.STATUS === "OK") {
                            // вызвать дополнительную функцию
                            if (callbackSuccess != null) {
                                callbackSuccess.call(this);
                            }
                        } else {
                            this.showModal("Ошибка изменения количества: " + data.MESSAGE);
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

            // end of костыли для rr
        }
    });

    /**
     * Код компонента "избранное"
     */
    BX.ready(function () {
        var CFav = new BX.WSMFavorites({
            'link': 'addFav',
            'fav_text': 'В избранном',
            'fav_class': 'in-favorites',
            'success': function () {
                console.log('Избранное: загружает список...');
                BX.ajax({
                    url: '/ajax/shop/favorites.php',
                    method: 'POST',
                    dataType: 'HTML',
                    async: true,
                    data: {},
                    onsuccess: function (data) {
                        // TODO: обновить количество в хедере (когда такой же функционал будет на новой главной)
                        // TODO: заверстать всплывающий блок "избранного" (когда такой же функционал будет на новой главной)
                        // ниже идёт код из старого шаблона.
                        var parentClass = $('.box-toolbar.box-toolbar-like').parent();
                        parentClass.html($('.box-toolbar.box-toolbar-like', $(data)).parent().html());
                        $('#toolbar-like-head').text($('#favirites_right_count').val());
                    },
                    onfailure: function () {
                        console.error('Избранное: ошибка загрузки списка');
                    }
                });
            }
        });
    });


    let tabs = document.querySelector('.flypage__product-tabs .swiper-wrapper');
    const tabContent = new Swiper('.flypage__product-essence', {
        speed: 0,
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        allowTouchMove: false,
        on: {
            slideChange: function (swiper) {
                tabs.children[swiper.previousIndex].classList.remove('flypage__product-tabs-active');
                tabs.children[swiper.activeIndex].classList.add('flypage__product-tabs-active');
                tabButtons.slideTo(swiper.activeIndex);
            }
        }
    });

    const tabButtons = new Swiper('.flypage__product-tabs', {
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        on: {
            tap: function (swiper, event) {
                if (event.target.classList.contains('swiper-slide') && !event.target.classList.contains('flypage__product-tabs-active')) {
                    event.target.parentElement.querySelector('.flypage__product-tabs-active').classList.remove('flypage__product-tabs-active');
                    event.target.classList.add('flypage__product-tabs-active');
                    tabContent.slideTo(swiper.clickedIndex);
                }
            },
            slideChange: function (swiper) {
                tabs.children[swiper.previousIndex].classList.remove('flypage__product-tabs-active');
                tabs.children[swiper.activeIndex].classList.add('flypage__product-tabs-active');
                tabButtons.slideTo(swiper.activeIndex);
                tabContent.slideTo(swiper.activeIndex);
            }
        }
    });

    $('.flypage__product-body-base').mousemove(function (e) {
        var amountMovedX = 100 * ((e.pageX + 1) / $(document).width()) - 0;
        var amountMovedY = 200 * ((e.pageY + 1) / $(window).height()) - 168;
        $(this).css('background-position', amountMovedX + 'px ' + amountMovedY + 'px');
    });
    $('.flypage__product-body-base').mouseout(function (e) {
        $(this).css('background-position', 'center');
    });
    document.querySelector('.flypage__product-essence-available-display-map').onclick = function () {
        document.querySelectorAll('.flypage__product-essence-available-adress').forEach((item) => {
            item.style.display = 'none';
        });
        document.querySelector('.flypage__product-essence-available-display-map').classList.add('flypage__product-essence-available_checked');
        document.querySelector('.flypage__product-essence-available-display-list').classList.remove('flypage__product-essence-available_checked');
        document.querySelector('.flypage__product-essence-available-map').style.display = 'block';
    }
    document.querySelector('.flypage__product-essence-available-display-list').onclick = function () {
        document.querySelectorAll('.flypage__product-essence-available-adress').forEach((item) => {
            item.style.display = 'flex';
        });
        document.querySelector('.flypage__product-essence-available-display-map').classList.remove('flypage__product-essence-available_checked');
        document.querySelector('.flypage__product-essence-available-display-list').classList.add('flypage__product-essence-available_checked');
        document.querySelector('.flypage__product-essence-available-map').style.display = 'none';
    }
    document.querySelector('.flypage__product-essence-review-button').onclick = function () {
        $('html, body').animate({scrollTop: 0}, 'slow')
        document.querySelector('.flypage__product-review-form').style.display = 'block'
        document.querySelector('.flypage__product-review-form-overlay').style.display = 'block'
    }

    /**
     * Открытие формы "Уведомить о снижении цены"
     */
    document.querySelector('.flypage__product-body-order-bottom-pricedown').onclick = function () {
        $('html, body').animate({scrollTop: 0}, 'slow')
        document.querySelector('#flypage__pricedown').style.display = 'block'
        document.querySelector('.flypage__product-review-form-overlay').style.display = 'block'
    }

    /**
     * Закрытие формы "Уведомить о снижении цены" по клику на оверлей
     */
    document.querySelector('.flypage__product-review-form-overlay').onclick = function () {
        document.querySelector('.flypage__product-review-form').style.display = 'none'
        document.querySelector('#flypage__pricedown').style.display = 'none'
        document.querySelector('.flypage__product-review-form-overlay').style.display = 'none'
    }

    /**
     * Закрытие формы "Уведомить о снижении цены" по клику на крестик
     * NOTE: Учитывая, что у нас есть две формы с одинаковыми css-классами, неясно, корректно ли это будет работать.
     */
    document.querySelector('#flypage__pricedown-close img').onclick = function () {
        document.querySelector('.flypage__product-review-form').style.display = 'none'
        document.querySelector('.flypage__product-review-form-overlay').style.display = 'none'
    }
    document.querySelector('#flypage__pricedown-close img').onclick = function () {
        document.querySelector('#flypage__pricedown').style.display = 'none'
        document.querySelector('.flypage__product-review-form-overlay').style.display = 'none'
    }
}
