// Import Vue Range
import VueRangeSlider from '../components/vue-range-slider.js';

// Import Swiper and modules
import {Swiper, Navigation, Pagination, Scrollbar, Controller, EffectFade, Autoplay} from 'swiper';

// закомментировано, т.к. вызывает ошибку ФОЗ
// const VueInputMask = require('vue-inputmask').default;
// Vue.use(VueInputMask);

// Install modules
Swiper.use([Navigation, Pagination, Scrollbar, Controller, EffectFade, Autoplay]);

// создаёт объект Vue только в каталоге
if (document.getElementById("newcatalog2022")) {
    // NOTE: название такое же, как у корзины, чтобы работал блок rr.
    // TODO: конечно же, это нужно переименовать во что-то другое, и сделать для блока rr свой собственный объект.
    window.$vmcart = new Vue({
        el: '#newcatalog2022',
        data: {
            // модальное коно с картой
            modalMap: false,
            // текущий таб журнала
            currentNewsTab: 'all',
            // нижний блок с текстом lvl1__article-body
            IsArticle: false,
            // выпадающие списки(селекты)
            selectShopList: false,
            selectCostList: false,
            // элементы-кружочки с выбранными фильтрами
            isChoiceFilterItems: true,
            choiceFilterItems: [
                {
                    name: "Дрель",
                    show: true
                },
                {
                    name: "DAEWOO",
                    show: true
                },
                {
                    name: "Цена: от 50 до 999 999",
                    show: true
                },
            ],
            // адреса в модальном окне карты
            addressMapList: [
                {
                    id: 0,
                    name: 'Богатырский пр., 15',
                    active: true
                },
                {
                    id: 1,
                    name: 'Выборгское ш., 503/2',
                    active: false
                },
                {
                    id: 2,
                    name: 'Гражданский пр., 18А',
                    active: false
                },
                {
                    id: 3,
                    name: 'Дальневосточный пр., 16/2',
                    active: true
                },
                {
                    id: 4,
                    name: 'Дунайский пр., 64',
                    active: true
                },
                {
                    id: 5,
                    name: 'Ленинский пр., 101 Ж',
                    active: true
                },
                {
                    id: 6,
                    name: 'Московский пр., 131',
                    active: true
                },
                {
                    id: 7,
                    name: 'Передовиков пр., 18/2',
                    active: true
                },
                {
                    id: 8,
                    name: 'Пулковское ш., 17/1',
                    active: true
                },
                {
                    id: 9,
                    name: 'Тельмана ул., 31',
                    active: true
                },
                {
                    id: 10,
                    name: 'Уральская ул., 1Л',
                    active: true
                },
                {
                    id: 11,
                    name: 'Энгельса ул., 154',
                    active: true
                },
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
            // фильтр
            filter: {
                // range перетягивание цены
                rangeValue: [6070, 15000],
                isRangeCost: true,
                // категории фильтров
                catFilterShop: true,
                catFilterType: true,
                catFilterTypeDop: false,
                catFilterMark: true,
                catFilterColor: true,
                catFilterColorDop: false,
            },
            // (товары) lvl 1
            category1: [
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
            ],
            category2: [
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
            ],
            category3: [
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
            ],
            // lvl2 ,3,4, searchResult products for example
            products: [
                {
                    id: null,
                    online: true,
                    super: true,
                    hit: true,
                    new: true,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
                {
                    id: null,
                    online: false,
                    super: false,
                    hit: false,
                    new: false,
                    price: "17 290",
                    type: null,
                    isFavorite: false,
                    isCompare: false,
                    name: "Дрель-шуруповерт BOSCH UniversalImpact 18В Li-Ion 1,5Ач 2 аккумулятора ударная",
                    code: "0603130020",
                    oldPrice: "999 499",
                    discount: "16",
                    priceFormatted: "17 290",
                    measure: "шт",
                    rating: "4.7",
                    count: 1,
                    btn: {
                        cart: true,
                        price: true,
                        choice: false,
                        choiceMob: false,
                        mobQuant: false,
                        isProcessing: false,
                    },
                    detailURL: '#',
                    images: [
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                        {
                            src: "/local/templates/maxi2020/img/catal_good.png"
                        },
                    ]
                },
            ],
            // элементы сортировки
            isSortMobBlock: false,
            sortItems: [
                {
                    name: 'Сначала дешевле',
                    check: true
                },
                {
                    name: 'Сначала дороже',
                    check: false
                },
                {
                    name: 'По новизне',
                    check: false
                },
                {
                    name: 'По популярности',
                    check: false
                },
                {
                    name: 'По размеру скидки',
                    check: false
                },
            ],
            // элементы моб фильтра
            isFilterMobBlock: false,
            // блоки внутри моб фильтра
            filterMobBlock: {
                main: true,
                category: false,
                shop: false,
                productType: false,
                mark: false,
                color: false
            },
            // пункты в категориях моб фильтра
            categoryList: [
                {
                    name: 'Светильники',
                    amount: 2
                },
                {
                    name: 'Дрели',
                    amount: 11
                },
                {
                    name: 'Трубы',
                    amount: 11
                },
                {
                    name: 'Дрель - шуруповерт + УШМ',
                    amount: 0
                },
                {
                    name: 'Шторы',
                    amount: 100
                },
            ],
            currentShop: 'Выбрать магазин',
            addressList: [
                {
                    name: 'Богатырский пр., 15',
                    amount: 122
                },
                {
                    name: 'Выборгское ш., 503/2',
                    amount: 323
                },
                {
                    name: 'Гражданский пр., 18А',
                    amount: 132
                },
                {
                    name: 'Дальневосточный пр., 16/2',
                    amount: 0
                },
                {
                    name: 'Дунайский пр., 64',
                    amount: 8
                },
                {
                    name: 'Ленинский пр., 101 Ж',
                    amount: 17
                },
                {
                    name: 'Московский пр., 131',
                    amount: 132
                },
                {
                    name: 'Передовиков пр., 18/2',
                    amount: 100
                },
                {
                    name: 'Пулковское ш., 17/1',
                    amount: 19
                },
                {
                    name: 'Тельмана ул., 31',
                    amount: 2
                },
                {
                    name: 'Уральская ул., 1Л',
                    amount: 96
                },
                {
                    name: 'Энгельса ул., 154',
                    amount: 45
                },
            ],
            currentSort: 'Сначала дешевле',
            sortList: [
                {
                    name: 'Сначала дешевле',
                },
                {
                    name: 'Сначала дороже',
                },
                {
                    name: 'По новизне',
                },
                {
                    name: 'По популярности',
                },
                {
                    name: 'По скидке',
                },
            ],
            typeList: [
                {
                    name: 'Винтоверт',
                    amount: 1123
                },
                {
                    name: 'Гайковерт АКК',
                    amount: 894
                },
                {
                    name: 'Гравер',
                    amount: 345
                },
                {
                    name: 'Дрель безударная',
                    amount: 34
                },
                {
                    name: 'Дрель',
                    amount: 789
                },
            ],
            marksList: [
                {
                    name: 'AEG',
                    amount: 98
                },
                {
                    name: 'BLACK & DECKER',
                    amount: 137
                },
                {
                    name: 'BOSH',
                    amount: 14
                },
                {
                    name: 'DAEWOO',
                    amount: 87
                },
                {
                    name: 'DEWALT',
                    amount: 16
                },
                {
                    name: 'DREMEL',
                    amount: 5
                },
                {
                    name: 'EINHELL',
                    amount: 5
                },
                {
                    name: 'HAMMER',
                    amount: 5
                },
                {
                    name: 'HAMMMERFLEX',
                    amount: 2
                },
                {
                    name: 'EINHELL',
                    amount: 5
                },
                {
                    name: 'HiKOKI',
                    amount: 98
                },
                {
                    name: 'MAKITA',
                    amount: 231
                },
                {
                    name: 'EINHELL',
                    amount: 5
                },
                {
                    name: 'MATRIX',
                    amount: 43
                },
                {
                    name: 'EINHELL',
                    amount: 5
                },
                {
                    name: 'METABO',
                    amount: 0
                },
                {
                    name: 'RETVERG',
                    amount: 19
                },
                {
                    name: 'ВИХРЬ',
                    amount: 7
                },
                {
                    name: 'ДИОЛД',
                    amount: 7
                },
                {
                    name: 'ДИФМАШ',
                    amount: 7
                },
            ],
            colorList: [
                {
                    name: 'Бежевый',
                    amount: 98
                },
                {
                    name: 'Белый',
                    amount: 137
                },
                {
                    name: 'Голубой',
                    amount: 14
                },
                {
                    name: 'Желтый',
                    amount: 87
                },
                {
                    name: 'Зеленый',
                    amount: 16
                },
                {
                    name: 'Красно-коричневый',
                    amount: 5
                },
                {
                    name: 'Красный',
                    amount: 12
                },
                {
                    name: 'Серый',
                    amount: 94
                },
                {
                    name: 'Синий',
                    amount: 2
                },
            ],
            // табы для отображения товаров lvl 2,3,4
            isCol: true,
            isTable: false,
        },
        /**
         * Vue lifecycle hook. Called synchronously after the instance is created.
         */
        created() {
            // инициализация переменных для перетягивания цены - range
            this.rangeMin = 0
            this.rangeMax = 21070
            this.rangeEnableCross = false
            this.rangeHeight = 4

            // инициализирует обработчик клика по оверлею: скрытие некоторых модальных окон, если те открыты
            $('.overlay').click((e) => {
                if (this.isSortMobBlock) {
                    this.isSortMobBlock = false;
                    $('.overlay').removeClass("overlay_show");
                }
                else if (this.isFilterMobBlock) {
                    this.isFilterMobBlock = false;
                }
                else if (this.modalMap) {
                    this.modalMap = false;
                    $('.overlay').removeClass("overlay_show");
                }
                else if(this.selectShopList) {
                    this.selectShopList = false;
                    $('.overlay').removeClass("overlay_transparent");
                }
                else if(this.selectCostList) {
                    this.selectCostList = false;
                    $('.overlay').removeClass("overlay_transparent");
                }
            });
        },
        mounted() {
        },
        computed: {
            // считаем количество элементов products для распределения в .row (bootstrap4) и
            //  формирования класса col-4 col3 col-6 в зависимости от результата
            rowElementsCount() {
                if(window.innerWidth <= 910 && window.innerWidth > 880) {
                    return 4;
                }
                else if(window.innerWidth <= 700) {
                    return 2;
                }
                else {
                    return 3;
                }
            },
        },
        watch: {

        },
        methods: {
            /**
             * Изменения при нажатии табов журнала
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
             * Изменение отображение товаров на уровнях lvl 2,3,4 верт/гориз
             * @param name
             */
            changeDisplay: function (name) {
                switch (name) {
                    case 'col':
                        this.isTable = false;
                        this.isCol = true;
                        break;
                    case 'table':
                        this.isTable = true;
                        this.isCol = false;
                        break;
                }
            },
            /**
             * Добавляет товар в корзину (одну единицу)
             * @param item
             */
            addBasket: function (item) {
                // проверяет, что товар ещё не добавляется, чтобы препятствовать повторному клику по кнопке.
                // if (item.btn.isProcessing !== true) {
                //     // помечает товар, как обрабатывающийся
                //     item.btn.isProcessing = true;
                //     this.ajaxAddBasket(item);
                // } else {
                //     console.log('Повторное нажатие на "добавить в корзину", пока запрос не обработан');
                // }
                this.showChoiceBlock(item);
            },
            /**
             * Увеличивает или уменьшает кол-во товара в корзине
             * @param item
             * @param operation
             */
            changeCount: function (item, operation) {
                // проверяет, что еще не запущена обработка (чтобы не допускать кликов в процессе запроса)
                //if (item.btn.isProcessing) return false;

                //clearTimeout(item.timeoutAjax);
                //let useTimeout = true;

                switch (operation) {
                    case 'plus':
                        item.count++
                        break;
                    case 'minus':
                        if (item.count > 0) {
                            item.count--;
                        }
                        if (item.count === 0) {
                            this.showCartBlock(item);
                            // useTimeout = false;
                            // удалить без таймаута
                            // this.ajaxUpdateBasket(item);
                            item.count = 1;
                        }
                        break;
                    default:
                        break;
                }

                // запустить с таймаутом
                //if (useTimeout) {
                //    item.timeoutAjax = setTimeout(this.ajaxUpdateBasket, 2000, item);
                // }
            },
            /**
             * Показывает блок "добавить в корзину"
             * @param item
             */
            showCartBlock: function (item) {
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

            },
            /**
             * Показывает блок изменения кол-ва товаров в корзине (после добавления одного товара).
             * В зависимости от разрешения экрана, показывает основную или мобильную версию
             * @param item
             */
            showChoiceBlock: function (item) {
                // скрывает кнопку "добавить в корзину"
                item.btn.cart = false;
                // в зависимости от ширины блока
                if (window.innerWidth <= 600) {
                    // для мобильных
                    // скрыть цену
                    item.btn.price = false;
                    // показать мобильный "выбиратор"
                    item.btn.choiceMob = true;
                    // скрывает десктопный "выбиратор"
                    item.btn.choice = false;
                    // скрывает кнопку "показать изменение кол-ва"
                    item.btn.mobQuant = false;
                } else {
                    // показать обычный "выбиратор"
                    item.btn.choice = true;
                    // скрывает мобильный "выбиратор"
                    item.btn.choiceMob = false;
                }

            },
            /**
             * Обработчик клика на кнопке "показать окно изменения кол-ва" (отображается только на на мобильных)
             * @param item
             */
            mobQuantClick: function (item) {
                // показывает блок "изменить кол-во", а затем по таймауту возвращает всё обратно
                this.showChoiceBlock(item);
                //item.timeoutAjaxChangeCount = setTimeout(this.showCartBlock, 2000, item);
                setTimeout(this.showCartBlock, 2000, item);
            },
            /**
             * Показывает блоки категорий в фильтре.
             *
             * @param item
             */
            openFilterCategory: function (name) {
                switch (name) {
                    case 'catFilterShop':
                        this.filter.catFilterShop ? this.filter.catFilterShop = false : this.filter.catFilterShop = true;
                        break;
                    case 'catFilterType':
                        this.filter.catFilterType ? this.filter.catFilterType = false : this.filter.catFilterType = true;
                        break;
                    case 'catFilterMark':
                        this.filter.catFilterMark ? this.filter.catFilterMark = false : this.filter.catFilterMark = true;
                        break;
                    case 'catFilterColor':
                        this.filter.catFilterColor ? this.filter.catFilterColor = false : this.filter.catFilterColor = true;
                        break;
                }

            },
            /**
             * Это открытие моб блока с сортировкой
             */
            openSortMobBlock: function () {
                this.isSortMobBlock = true;
                $('.overlay').addClass("overlay_show");
            },
            /**
             * Это открытие/скрытие моб блока с фильтром
             */
            changeFilterMobBlock: function () {
                this.isFilterMobBlock ? this.isFilterMobBlock = false : this.isFilterMobBlock = true;
            },
            /**
             * Это открытие модального окна с картой
             */
            openMapModal: function () {
                this.modalMap = true;
                $('.overlay').addClass("overlay_show");
            },
            /**
             * Это скрытие модального окна с картой
             */
            closeMapModal: function () {
                this.modalMap = false;
                $('.overlay').removeClass("overlay_show");
            },
            /**
             * Это открытие в моб фильтре разных блоков
             */
            openFilterMobBlockInner: function (name) {
                this.filterMobBlock.main = false;
                switch (name) {
                    case 'category':
                        this.filterMobBlock.category = true;
                        break;
                    case 'shop':
                        this.filterMobBlock.shop = true;
                        break;
                    case 'productType':
                        this.filterMobBlock.productType = true;
                        break;
                    case 'mark':
                        this.filterMobBlock.mark = true;
                        break;
                    case 'color':
                        this.filterMobBlock.color = true;
                        break;
                }
            },
            /**
             * Это скрытие в моб фильтре разных блоков и возвращение к главному
             */
            closeFilterMobBlockInner: function (name) {
                switch (name) {
                    case 'category':
                        this.filterMobBlock.category = false;
                        break;
                    case 'shop':
                        this.filterMobBlock.shop = false;
                        break;
                    case 'productType':
                        this.filterMobBlock.productType = false;
                        break;
                    case 'mark':
                        this.filterMobBlock.mark = false;
                        break;
                    case 'color':
                        this.filterMobBlock.color = false;
                        break;
                }
                this.filterMobBlock.main = true;
            },
            /**
             * Это открытие/скрытие списков select-ов в каталоге
             * @param name
             */
            openSelect: function (name) {
                switch (name) {
                    case 'selectShopList':
                        this.selectShopList ? this.selectShopList = false : this.selectShopList = true;
                        if(this.selectShopList) {
                            $('.overlay').addClass("overlay_transparent");
                        }
                        break;
                    case 'selectCostList':
                        this.selectCostList ? this.selectCostList = false : this.selectCostList = true;
                        if(this.selectCostList) {
                            $('.overlay').addClass("overlay_transparent");
                        }
                        break;
                }
            },
            /**
             * удаление кружков-выбранных фильтров
             * @param name
             */
            deleteFilterItem: function (item) {
                item.show = false;
                // если удалили все кружочки, то скрываем и родителя ибо у него отступ ненужный
                let isAllDel = true;
                this.choiceFilterItems.forEach(el => {
                    if(el.show == true) {
                        isAllDel = false;
                        return;
                    }
                });
                if(isAllDel) {
                    this.isChoiceFilterItems = false;
                }
            },
            /**
             * очистить все - удалить все кружки-выбранные фильтры
             */
            deleteAllFilterItems: function () {
                this.choiceFilterItems.forEach(el => {
                    el.show = false;
                });
                this.isChoiceFilterItems = false;
            },
            /**
             * при нажатии на пункт выпадашки с адресом - вписать адрес в главное поле
             */
            changeAddress: function (name) {
                this.currentShop = name;
                $('.overlay').removeClass("overlay_transparent");
            },
            /**
             * при нажатии на пункт выпадашки с сортировкой - вписать сортировку в главное поле
             */
            changeSort: function (name) {
                this.currentSort = name;
                $('.overlay').removeClass("overlay_transparent");
            },
            // забираем адрес с карты при нажатии на кнопку выбрать и переносим его в поле
            chooseMapShop: function (text) {
              this.currentShop = text;
              this.closeMapModal();
            },
        }
    });

    // Слайдеры

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
    }
    else if (window.innerWidth <= 600) {
        const sliderProducts = new Swiper('.products-slider', {
            speed: 500,
            observer: true,
            slidesPerView: 2.35,
            slidesPerGroup: 1,
            stretch: 5,
            observeParents: true,
        });
    };

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

    // модальное окно - карта и все что с ней связано

    // инициализация объекта и необходимые для работы скрипта глобальные переменные
    ymaps.ready(function () {
        var mapCatalog22 = new ymaps.Map('mapCatalog22', {
                center: [59.939098, 30.315868], // Спб
                zoom: 10,
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search'
            }),
            // создаем коллекции серых и красных  меток
            shopCollection = new ymaps.GeoObjectCollection(null,
                {
                iconLayout: 'default#imageWithContent',
                iconImageSize: [42, 52],
                iconImageOffset: [-24, -24],
                iconContentOffset: [15, 15],
            }),
            // создаем объект адресов с коррдинатами для меток, адресами для хинтов и картинкой
            mapShops = [
                { coords:[60.001586, 30.263981], text: 'Богатырский пр., 15', url: '/local/templates/maxi2020/img/catalog-map-icon-red.png'},
                { coords: [60.102275, 30.254495], text: 'Выборгское ш., 503/2', url: '/local/templates/maxi2020/img/catalog-map-icon-gray.png' },
                { coords: [60.002561, 30.384244], text: 'Гражданский пр., 18А', url: '/local/templates/maxi2020/img/catalog-map-icon-gray.png' },
                { coords:[59.908362, 30.451675], text: 'Дальневосточный пр., 16/2' , url: '/local/templates/maxi2020/img/catalog-map-icon-red.png' },
                { coords:[59.846057, 30.421878], text: 'Дунайский пр., 64', url: '/local/templates/maxi2020/img/catalog-map-icon-red.png' },
                { coords:[59.850861, 30.228300], text: 'Ленинский пр., 101 Ж', url: '/local/templates/maxi2020/img/catalog-map-icon-red.png' },
                { coords:[59.884347, 30.316138], text: 'Московский пр., 131', url: '/local/templates/maxi2020/img/catalog-map-icon-red.png' },
                { coords:[59.946910, 30.457883], text: 'Передовиков пр., 18/2', url: '/local/templates/maxi2020/img/catalog-map-icon-red.png' },
                { coords:[59.828844, 30.316111], text: 'Пулковское ш., 17/1', url: '/local/templates/maxi2020/img/catalog-map-icon-red.png' },
                { coords:[59.891015, 30.477385], text: 'Тельмана ул., 31', url: '/local/templates/maxi2020/img/catalog-map-icon-red.png' },
                { coords:[59.951745, 30.267485], text: 'Уральская ул., 1Л', url: '/local/templates/maxi2020/img/catalog-map-icon-red.png' },
                { coords:[60.059090, 30.335029], text: 'Энгельса ул., 154', url: '/local/templates/maxi2020/img/catalog-map-icon-red.png' },
            ];
            // заполняем коллекции
            for (var i = 0, l = mapShops.length; i < l; i++) {
                //redIcons.add(new ymaps.Placemark(redShops[i]));
                var point = mapShops[i];
                shopCollection.add(new ymaps.Placemark(
                    point.coords, {
                        hintContent: point.text
                    },
                    {
                        iconImageHref: point.url,
                    }
                ));
            }
            // добавляем на карту
            mapCatalog22.geoObjects
                .add(shopCollection);
            // добавляем клики на полученне метки
            // При клике выбираем магазин в списке, приближаем zoom к нему на карте
            shopCollection.events.add('click', function (e) {
                var index = shopCollection.indexOf(e.get('target')),
                coords = shopCollection.get(index).geometry.getCoordinates();
                highlightShop(index);
                mapCatalog22.setCenter(coords, 12);
                scrollToShop(index);
            });

            // выделяем магазин соотв метке на которую нажали
            function highlightShop(index) {
                $('.newcatalog2022__modal-map-shopList-item').removeClass('hightlight');
                $(`#addr_${index}`).addClass('hightlight');
            }
            // прокрутка к нужному магазину в списке
            function scrollToShop(index) {
                var scrollSize = 0;
                if(index >= 7) scrollSize = 300;
                document.getElementById('shopMapScrollbar').scrollTop = scrollSize;
            }

    });


}// if newcatalog
