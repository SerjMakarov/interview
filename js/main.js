var app = new Vue({
    el: '#app',
    data: {
        btnAndroid: 'android',
        btnApple: 'apple',
        activeInputAppleID: false,
        dataUser: {},
        boxs: [
            {
                id: 1,
                title: 'Вход',
                isActive: true,
                isDeactivate: false,
                checked_1: true,
                requests: {
                    checkbox_1: {id:1, checked: true, req:'Не удается авторизоваться'},
                    checkbox_2: {id:2, checked: false, req:'Не удается зарегистрироваться'},
                    checkbox_3: {id:3, checked: false, req:'Не удается выбрать город'},
                    checkbox_4: {id:4, checked: false, req:'Другое'},
                }
            },
            // {
            //     id: 2,
            //     title: 'Главная страница',
            //     isActive: true,
            //     isDeactivate: false,
            //     requests: {
            //         checkbox_1: 'Не отображаются баннеры',
            //         checkbox_2: 'Не перейти в другие разделы',
            //         checkbox_3: 'Не отображаются товары',
            //         checkbox_4: 'Не добавляются товары в корзину',
            //         checkbox_5: 'Другое',
            //     }
            // },
            // {
            //     id: 3,
            //     title: 'Поиск',
            //     isActive: true,
            //     isDeactivate: false,
            //     requests: {
            //         checkbox_1: 'Не удается найти товар',
            //         checkbox_2: 'Не работает поиск',
            //         checkbox_3: 'Не сканирует штрих код',
            //         checkbox_4: 'Не удается с поиска перейти на выбранный товар',
            //         checkbox_5: 'Другое',
            //     }
            // },
            // {
            //     id: 4,
            //     title: 'Каталог',
            //     isActive: true,
            //     isDeactivate: false,
            //     requests: {
            //         checkbox_1: 'Проблемы с каталогом товаров',
            //         checkbox_2: 'Не работает фильтр',
            //         checkbox_3: 'Не работает сортировка',
            //         checkbox_4: 'Неправильная стоимость товара',
            //         checkbox_5: 'Другое',
            //     }
            // },
            // {
            //     id: 5,
            //     title: 'Карточка товара',
            //     isActive: true,
            //     isDeactivate: false,
            //     requests: {
            //         checkbox_1: 'Неправильная стоимость товара',
            //         checkbox_2: 'Неправильное описание товара',
            //         checkbox_3: 'Некорректные свойства товаров',
            //         checkbox_4: 'Не добавляется товар в корзину',
            //         checkbox_5: 'Другое',
            //     }
            // },
            // {
            //     id: 6,
            //     title: 'Корзина',
            //     isActive: true,
            //     isDeactivate: false,
            //     requests: {
            //         checkbox_1: 'Неправильная стоимость товара',
            //         checkbox_2: 'Неправильный размер скидок',
            //         checkbox_3: 'Не применяются скидки',
            //         checkbox_4: 'Не применяются бонусы',
            //         checkbox_5: 'Не применяются промокоды',
            //         checkbox_6: 'Не могу выбрать товар',
            //         checkbox_7: 'Не могу удалить товар',
            //     }
            // },
            // {
            //     id: 7,
            //     title: 'Форма оформления заказа',
            //     isActive: true,
            //     isDeactivate: false,
            //     requests: {
            //         checkbox_1: 'Не получается оформить заказ',
            //         checkbox_2: 'Неправильная стоимость товара',
            //         checkbox_3: 'Неправильная стоимость заказа',
            //         checkbox_4: 'Неправильная стоимость доставки',
            //         checkbox_5: 'Некорректная работа  яндекс-карты или геолокации',
            //         checkbox_6: 'Другое',
            //     }
            // },
            // {
            //     id: 8,
            //     title: 'Личный кабинет',
            //     isActive: true,
            //     isDeactivate: false,
            //     requests: {
            //         checkbox_1: 'Не удается привязать карту Максидом',
            //         checkbox_2: 'Не удается применить карту Максидом к заказу',
            //         checkbox_4: 'Другое',
            //     }
            // },
            // {
            //     id: 9,
            //     title: 'Другое',
            //     isActive: true,
            //     isDeactivate: false,
            //     requests: {
            //         checkbox_1: 'Не загрузилась страница',
            //         checkbox_2: 'Медленная работа приложения',
            //         checkbox_3: 'Опечатка на странице',
            //         checkbox_4: 'Не нажимается кнопка',
            //         checkbox_5: 'Другое',
            //     }
            // },
        ],
        inputs: [
            {
                id:1,
                checked: true,
            }
        ],
    },
    methods: {
        redirect: function (event, btn) {
            event.preventDefault();
            switch (btn) {
                case this.btnAndroid:
                    window.location.href = '/registration/index.php';
                    localStorage.activeInputAppleID = false;
                    break;
                case this.btnApple:
                    console.log(this.btnApple);
                    window.location.href = '/registration/index.php';
                    localStorage.activeInputAppleID = true;
                    break;
            }
        },
        getValue() {
            this.dataUser.surname = this.surname,
            this.dataUser.name = this.name,
            this.dataUser.tabel_number = this.tabel_number,
            this.dataUser.apple_id = this.apple_id,
            this.dataUser.email = this.email,
                console.log(this.dataUser);
        },
        push(event){
            event.preventDefault();
            this.ajaxPush(this.dataUser);
            console.log('push');
        },
        ajaxPush(data) {
            let init = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data)
            }

            fetch("/ajax/registration.php", init)
                .then(response => response.json())
                .then((data) => {
                    // анализирует ответ сервера
                    console.log(data);
                    if(data){
                        window.location.href = '/interview/index.php'
                    }

                    // if (data.STATUS === "OK") {
                    //     item.isInCart = true;
                    //     // показывает обычное представление товара в зависимости от состояния
                    //     this.showCartBlock(item);
                    //     // обновляет маленькую корзину
                    //     $vmcart.loadData(false);
                    //     // вызывает маркетинговые события о добавлении в корзину товара из топ-предложений
                    //     this.marketingAdd2basketShopTopoffers(item, item.type);
                    // } else {
                    //     item.isInCart = false;
                    //     item.count = 0;
                    //     // показывает обычное представление товара в зависимости от состояния
                    //     this.showCartBlock(item);
                    //     this.showModal('Ошибка добавления в корзину: ' + data.MESSAGE);
                    // }
                    // item.btn.isProcessing = false;
                })
                .catch(error => {
                    // this.errorMessage = error;
                    // item.btn.isProcessing = false;
                    // item.isInCart = false;
                    // item.count = 0;
                    // показывает обычное представление товара в зависимости от состояния
                    // this.showCartBlock(item);

                    console.error("Ошибка: получения данных", error);
                    // this.isShowAjaxCartPreloader = false;
                })
        },
        hiddenBox(data){
            for(box of this.boxs){
                if(data === box.id){
                    box.isDeactivate == true ? box.isDeactivate = false : box.isDeactivate = true
                    box.isActive == false ? box.isActive = true : box.isActive = false
                }
            }
        },
        checkBox(data){
            for(box of this.boxs){
                for(req in box.requests){
                        console.log(req.id);
                    // console.log(data);
                }

                // if(data === input.id){
                //     input.checked == true ? input.checked = false : input.checked = true
                // }
            }
        },
    },
    mounted() {
        if (localStorage.activeInputAppleID) {
            this.activeInputAppleID = JSON.parse(localStorage.activeInputAppleID);
        }
    },
    watch: {
        checkedInput: function(){

        }
    }
})