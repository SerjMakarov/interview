<!--<template>-->
<!--  <div>-->
<!--    <div class="modal-cart__block">-->
<!--      <div class="modal-cart-h">-->
<!--        Доступное количество-->
<!--        {{ availableHyperText }}-->
<!--      </div>-->
<!--      <a href="#" class="close-icon" id="modal-stock-close" @click.prevent="$emit('modal-stock-close-event')"></a>-->
<!--    </div>-->
<!--    <div class="modal-cart__block modal-cart&#45;&#45;error">-->
<!--      Некоторые позиции отсутствуют {{ availableStoreText }} в необходимом количестве.-->
<!--      Пожалуйста, скорректируйте количество товаров в заказе в зависимости от доступного наличия {{-->
<!--        availableStoreText-->
<!--      }}.-->
<!--    </div>-->

<!--    <form method="post" id="modal-stock__form" action="/ajax/basket/apiJson.php">-->
<!--      <div id="stockContent" class="tab-content">-->

<!--        <div class="tab-mob">-->
<!--          <table>-->
<!--            <tr>-->
<!--              <td></td>-->
<!--            </tr>-->

<!--            <tr v-for="item in initialItems" class="modal-stock__product"-->
<!--                :class="{'disabled':(item.PRODUCT_STATUS == 'N')}">-->
<!--              <td>-->
<!--                <div class="td-inner td-inner&#45;&#45;line">-->
<!--                  &lt;!&ndash;                <svg class="icon-trash modal-stock__delete"-->
<!--                                           data-product-id="item.PRODUCT_ID">-->
<!--                  <use xlink:href="#icon-trash"></use>-->
<!--              </svg>&ndash;&gt;-->
<!--                  <label class="checkbox">-->
<!--                    <input type="checkbox"-->
<!--                           class="modal-stock__checkbox"-->
<!--                           true-value="Y"-->
<!--                           false-value="N"-->
<!--                           v-model="item.PRODUCT_STATUS">-->
<!--                    <span class="checkmark"></span>-->
<!--                  </label>-->
<!--                  <img :src="item.CATALOG.PREVIEW_PICTURE"-->
<!--                       v-show="item.CATALOG.PREVIEW_PICTURE != ''"-->
<!--                       class="tab-content__img"-->
<!--                       :alt="item.CATALOG.NAME">-->
<!--                  <a class="tab-content__name" :href="item.CATALOG.DETAIL_PAGE_URL">-->
<!--                    {{ item.CATALOG.NAME }}</a>-->
<!--                  <div class="units">-->
<!--                    <div class="units__mini modal-stock__minus"-->
<!--                         @click="minusQuantity(item)">—-->
<!--                    </div>-->
<!--                    <div class="units__mini">-->
<!--                      <input type="text"-->
<!--                             class="modal-stock__product-quantity"-->
<!--                             v-model="item.QUANTITY">-->
<!--                    </div>-->
<!--                    <div class="units__mini modal-stock__plus"-->
<!--                         @click="plusQuantity(item)">+-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->

<!--          </table>-->
<!--        </div>&lt;!&ndash; /tab-mob для мобильных устройств &ndash;&gt;-->

<!--        <div role="tabpanel" aria-labelledby="home-tab" class="tab-pane modal-cart__table fade show active">-->

<!--          <table>-->

<!--            <thead>-->
<!--            <tr>-->
<!--              <td>-->
<!--              </td>-->
<!--              <td v-for="storeItem in store" class="modal-stock__store-item"-->
<!--                  :class="{'td-error':matrix[storeItem.ID].isFull !== true}">-->
<!--                <div class="td-inner td-inner&#45;&#45;column">-->
<!--                  <svg class="icon-exc-mark">-->
<!--                    <use xlink:href="#icon-exc-mark"></use>-->
<!--                  </svg>-->
<!--                  <svg class="icon-check">-->
<!--                    <use xlink:href="#icon-check"></use>-->
<!--                  </svg>-->
<!--                  <a class="tab-content__adress" :href="'/shops/#'+storeItem.ID">{{ storeItem.STORE_ADDR }}</a>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--            </thead>-->

<!--            <tbody>-->
<!--            <tr v-for="item in initialItems" class="modal-stock__product"-->
<!--                :class="{'disabled':(item.PRODUCT_STATUS == 'N')}">-->
<!--              <td>-->
<!--                <div class="td-inner td-inner&#45;&#45;line">-->
<!--                  <label class="checkbox">-->
<!--                    <input type="checkbox"-->
<!--                           class="modal-stock__checkbox" checked="checked"-->
<!--                           v-model="item.PRODUCT_STATUS"-->
<!--                           true-value="Y"-->
<!--                           false-value="N"-->
<!--                    >-->
<!--                    <input type="hidden"-->
<!--                           class="modal-stock__checkbox"-->
<!--                           :name="'status['+item.ID+']'"-->
<!--                           v-model="item.PRODUCT_STATUS">-->
<!--                    <span class="checkmark"></span>-->
<!--                  </label>-->
<!--                  &lt;!&ndash;                                          <svg class="icon-trash modal-stock__delete"&ndash;&gt;-->
<!--                  &lt;!&ndash;                                               data-product-id="item.PRODUCT_ID">&ndash;&gt;-->
<!--                  &lt;!&ndash;                                              <use xlink:href="#icon-trash"></use>&ndash;&gt;-->
<!--                  &lt;!&ndash;                                          </svg>&ndash;&gt;-->
<!--                  <img :src="item.CATALOG.PREVIEW_PICTURE"-->
<!--                       v-show="item.CATALOG.PREVIEW_PICTURE != ''"-->
<!--                       class="tab-content__img"-->
<!--                       :alt="item.CATALOG.NAME"/>-->
<!--                  <a class="tab-content__name" :href="item.CATALOG.DETAIL_PAGE_URL">-->
<!--                    {{ item.CATALOG.NAME }}</a>-->
<!--                  <div class="units">-->
<!--                    <div class="units__mini modal-stock__minus"-->
<!--                         @click="minusQuantity(item)">—-->
<!--                    </div>-->
<!--                    <div class="units__mini">-->
<!--                      <input type="text"-->
<!--                             class="modal-stock__product-quantity"-->
<!--                             :name="'count['+item.ID+']'"-->
<!--                             v-model="item.QUANTITY">-->
<!--                    </div>-->
<!--                    <div class="units__mini modal-stock__plus"-->
<!--                         @click="plusQuantity(item)">+-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </td>-->

<!--              <td v-for="storeItem in store" class="modal-stock__store-amount"-->
<!--                  :class="{'td-error&#45;&#45;red':(storeItem.AMOUNT[item.PRODUCT_ID] < item.QUANTITY), 'td-error':matrix[storeItem.ID].isFull !== true}">-->
<!--                {{ storeItem.AMOUNT[item.PRODUCT_ID] }}-->
<!--                &lt;!&ndash;                {{ storeItem.AMOUNT[item.PRODUCT_ID] ?? 0 }}&ndash;&gt;-->
<!--              </td>-->

<!--            </tr>-->
<!--            </tbody>-->

<!--          </table>-->

<!--        </div>&lt;!&ndash; // tabpanel для десктопов &ndash;&gt;-->
<!--      </div>&lt;!&ndash;  stockContent&ndash;&gt;-->

<!--      <div class="modal-cart__block modal-cart__right modal-cart__save">-->
<!--        <input type="hidden" name="refresh" value="Y">-->
<!--        <button type="submit" @click="saveStock" class="btn btn-cart btn-action-main" :disabled="isSaveDisabled">{{saveText}}-->
<!--        </button>-->
<!--      </div>-->
<!--    </form>-->

<!--    &lt;!&ndash;    <? // отправляем событие в GA РЕДЕЛАТЬ НА VUE-->
<!--    //if (isset($_REQUEST["ga_event"]) && $_REQUEST["ga_event"] == "Y") {-->
<!--    //-->
<!--    //    $paramsStockIsNull = array();-->
<!--    //    foreach ($arResult["basket"]["items"] as $item) {-->
<!--    //-->
<!--    //        $itStockIsNull = array();-->
<!--    //        $prdIsStocks = array();-->
<!--    //        $itStockIsNull = array(-->
<!--    //            "prd_id" => $item["ID"],-->
<!--    //            "prd_code" => $item["CATALOG"]["CODE"],-->
<!--    //            "prd_name" => $item["CATALOG"]["NAME"],-->
<!--    //            "prd_count" => $item["QUANTITY"],-->
<!--    //        );-->
<!--    //-->
<!--    //        foreach ($arResult["basket"]["store"] as $store) {-->
<!--    //            if (isset($store["AMOUNT"][$item["PRODUCT_ID"]])) {-->
<!--    //                $prdIsStocks[] = array(-->
<!--    //                    //"id"=>'',-->
<!--    //                    "name" => $store["STORE_ADDR"],-->
<!--    //                    "count" => $store["AMOUNT"][$item["PRODUCT_ID"]]-->
<!--    //                );-->
<!--    //            }-->
<!--    //        }-->
<!--    //        $itStockIsNull["stocks"] = $prdIsStocks;-->
<!--    //        $paramsStockIsNull[] = $itStockIsNull;-->
<!--    //    } ?>-->
<!--    &lt;!&ndash;&ndash;&gt;-->
<!--    &lt;!&ndash;    &ndash;&gt;<?// if (!empty($paramsStockIsNull)) {-->
<!--    //        ?>-->
<!--    &lt;!&ndash;        <script>&ndash;&gt;-->
<!--    &lt;!&ndash;            var stockIsNull = &ndash;&gt;<?//=CUtil::PhpToJSObject($paramsStockIsNull)?>-->
<!--    //                //window.dataLayer = window.dataLayer || [];-->
<!--    //                dataLayer.push({-->
<!--    //                    'event': 'Stock Is Null',-->
<!--    //                    'stockisnull': {-->
<!--    //                        'actionField': stockIsNull,-->
<!--    //                    },-->
<!--    //                    'customerCity': window.customerCity-->
<!--    //                });-->
<!--    //        </script>-->
<!--    //    <?// } ?>-->
<!--    <?// } ?>&ndash;&gt;-->

<!--  </div>-->

<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "cartStockPopup",-->
<!--  props: {-->
<!--    initialRepresentationId: {-->
<!--      default: 8,-->
<!--      type: [Number, String]-->
<!--    },-->
<!--    store: {-->
<!--      default: {},-->
<!--      type: Object,-->
<!--    },-->
<!--    initialItems: {-->
<!--      default: {},-->
<!--      type: Object,-->
<!--    }-->
<!--  },-->
<!--  data: () => ({-->
<!--    saveText: 'Сохранить корзину',-->
<!--    isSaveDisabled: false,-->
<!--    // REPRESENTATION_ID: this.initialRepresentationId,-->
<!--    //store: this.initialStore,-->
<!--  }),-->
<!--  created() {-->
<!--    // this.items = this.transformItems();-->
<!--    // defApi.get('api/pages/landing')-->
<!--    //     .then((res) => {-->
<!--    //       this.page = res.data.body;-->
<!--    //     });-->
<!--  },-->
<!--  mounted() {-->

<!--  },-->

<!--  methods: {-->
<!--    /*-->
<!--this.init = function (callback) {-->
<!--    let label = 'init this';-->
<!--    console.time(label);-->

<!--    basket.startModal();-->
<!--    this.show();-->
<!--    this.onHiddenQuantityChange();-->
<!--    this.onPlusMinisClick();-->
<!--    this.onQuantityChange();-->
<!--//    this.ondDeleteButtonClick();-->
<!--    this.onStatusCheckboxChange();-->
<!--    this.onHiddenStatusChange();-->
<!--    this.onSave();-->
<!--    this.applyStyleAll();-->

<!--    $('html, body').animate({-->
<!--        scrollTop: $("#modal-stock").offset().top-->
<!--    }, 1000);-->

<!--    console.timeEnd(label);-->
<!--}-->
<!--*/-->
<!--    // /**-->
<!--//  * Обработка события по клику на кнопке "удалить"-->
<!--//  */-->
<!--// this.ondDeleteButtonClick = function () {-->
<!--//     $('.modal-stock__delete').click(function (e) {-->
<!--//         let productId = $(this).data('product-id');-->
<!--//         this.deleteProduct(productId);-->
<!--//     });-->
<!--// }-->

<!--// /**-->
<!--//  * Удаляет строку товара-->
<!--//  * @param productId-->
<!--//  */-->
<!--// this.deleteProduct = function (productId) {-->
<!--//     $(".modal-stock__product[data-product-id='" + productId + "']").remove();-->
<!--//     this.applyStyleAll();-->
<!--// }-->

<!--    // $(".modal-stock__product-quantity").on("keydown", function (e) {-->
<!--    //     if (e.which == 38) {-->
<!--    //         eventPlusHandler(e, this);-->
<!--    //     }-->
<!--    //-->
<!--    //     if (e.which == 40) {-->
<!--    //         eventMinusHandler(e, this);-->
<!--    //     }-->
<!--    // });-->

<!--    plusQuantity: function (item) {-->
<!--      if (item.PRODUCT_STATUS == "Y") {-->
<!--        item.QUANTITY++;-->
<!--      }-->
<!--    },-->

<!--    minusQuantity: function (item) {-->
<!--      if (item.PRODUCT_STATUS == "Y" && item.QUANTITY > 1) {-->
<!--        item.QUANTITY&#45;&#45;;-->
<!--      }-->
<!--    },-->

<!--    saveStock: function () {-->
<!--      this.isSaveDisabled = true;-->
<!--      this.saveText = 'Подождите...';-->
<!--      $('#modal-stock__form').submit();-->
<!--    },-->
<!--  },-->

<!--  computed: {-->
<!--    storeText: function () {-->
<!--      if (this.store.length > 1) {-->
<!--        return 'магазинах';-->
<!--      } else {-->
<!--        return 'магазине';-->
<!--      }-->
<!--    },-->
<!--    hyperText: function () {-->
<!--      if (this.store.length > 1) {-->
<!--        return 'гипермаркетах';-->
<!--      } else {-->
<!--        return 'гипермаркете';-->
<!--      }-->
<!--    },-->
<!--    availableStoreText: function () {-->
<!--      if (this.REPRESENTATION_ID == 8) {-->
<!--        return 'на складе';-->
<!--      } else {-->
<!--        return 'в ' + this.storeText;-->
<!--      }-->
<!--    },-->
<!--    availableHyperText: function () {-->
<!--      if (this.REPRESENTATION_ID == 8) {-->
<!--        return 'на складе';-->
<!--      } else {-->
<!--        return 'в ' + this.hyperText;-->
<!--      }-->
<!--    },-->

<!--    /**-->
<!--     * Количество заказываемых товаров, ключ - ID товара (а не ID записи в корзине)-->
<!--     *-->
<!--     * @returns {{}}-->
<!--     */-->
<!--    itemsQuantity: function () {-->
<!--      let items = {};-->

<!--      for (let key in this.initialItems) {-->
<!--        let PRODUCT_ID = this.initialItems[key].PRODUCT_ID;-->
<!--        // скопировать элемент в ключ - PRODUCT_ID-->
<!--        items[PRODUCT_ID] = {QUANTITY: 0, PRODUCT_STATUS: 'Y'};-->
<!--        items[PRODUCT_ID]['QUANTITY'] = this.initialItems[key].QUANTITY;-->
<!--        items[PRODUCT_ID]['PRODUCT_STATUS'] = this.initialItems[key].PRODUCT_STATUS;-->
<!--      }-->

<!--      return items;-->
<!--    },-->

<!--    /**-->
<!--     * Матрица наличия по магазинам-->
<!--     */-->
<!--    matrix: function () {-->
<!--      let matrix = {};-->

<!--      for (let STORE_ID in this.store) {-->
<!--        let isFull = true;-->

<!--        // проходимся по товарам магазина...-->
<!--        // если их остатки больше заказываемых пользователем (или статус товара дизейблед), данный товар проходит, пропускаем.-->
<!--        // если все товары проходят (нет отложенных), то помечаем данный магазин, как ОК.-->
<!--        // вообще это можно сделать и в вычисляемом свойстве (прописать товару остатки??)-->
<!--        for (let PRODUCT_ID in this.store[STORE_ID].AMOUNT) {-->
<!--          // в массив наличия передаются лишние товары, их пропускаем и не учитываем, иначе вылезают ошибки типа undefined.-->
<!--          if (!this.itemsQuantity[PRODUCT_ID]) {-->
<!--            continue;-->
<!--        }-->

<!--          if (this.itemsQuantity[PRODUCT_ID].PRODUCT_STATUS == "Y" && this.store[STORE_ID].AMOUNT[PRODUCT_ID] < this.itemsQuantity[PRODUCT_ID].QUANTITY) {-->
<!--            isFull = false;-->
<!--            // console.log(this.items[PRODUCT_ID].CATALOG.NAME, 'меньше!!!');-->
<!--          } else {-->
<!--            // console.log('больше!!!');-->
<!--          }-->
<!--        }-->

<!--        matrix[STORE_ID] = {-->
<!--          isFull: isFull-->
<!--        };-->
<!--      }-->
<!--      return matrix;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->