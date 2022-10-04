var app = new Vue({
    el: '#app',
    data: {
        btnAndroid: 'android',
        btnApple: 'apple',
        activeInputAppleID: false,
        dataUser: {},
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