//init range slider
$(document).ready(function(){
    /**
     * Функция добавления товара в корзину,
     * просто скопированная из /local/templates/maxidom/js/store.js
     *
     * Сделано для одной из версий блока rr (видимо для корзины)
     *
     * TODO: Сейчас блок rr в корзине новый, нужно понять, где используется этот код, и удалить.
     * см. 96a3800452ccdb632ab6588e853ca628d4ce2ab3
     */
    $(document).on('click', '.button.button-cart:not(.submits)', function(e){
        $(document).on('click', function() {$('.popup-box-cart').addClass('hidden')});
        $(document).on('click', '.popup-box-cart', function(event) {event.stopPropagation();});
        var btnCart = $(this);
        var th_text = btnCart.text();

        console.log(th_text);

        if(!$(this).is('.btn-cart-disabled')){
            btnCart.attr('disabled', 'disabled').addClass('btn-cart-disabled').text('Подождите...');

            $price_once = btnCart.parent().find(".popup-box-cart #once_item_price").html();
            $priceOld_once = btnCart.parent().find(".popup-box-cart #once_item_price_old").html();
            $quant = 1;
            var foundIn=$($(this).parent().parent());
            var foundItem=$('.number .counter', foundIn);
            var measureRatio=parseInt(typeof($(this).attr('minquant'))!='undefined' ? $(this).attr('minquant') : 1);

            if (foundItem.length>0 && parseInt(foundItem.val())>0) {
                $quant = foundItem.val();
            }
            $price = ($price_once * $quant).mdPriceFormat();
            $priceOld = 0;
            if ($priceOld_once > 0) {
                $priceOld = ($priceOld_once * $quant).mdPriceFormat();
				console.log('пересчитываем старую цену, теперь она ' + $priceOld);
            }
            $mQuant = measureRatio*$quant;
            $itemId = $(this).attr('repid');

            var ajaxParams = {
                quantity: $mQuant
            };

            if($itemId != '' && $itemId != undefined){
                ajaxParams.id = $itemId;
            }

            // проверим наличие атрибута
            if($(this).hasClass('btn_rr') && ($(this).attr('data-repkcc') != '' && $(this).attr('data-repkcc') != undefined)){
                ajaxParams.kcc = $(this).attr('data-repkcc');
            }

            var $newQuantity = parseInt($('#cart-quantity').text())+parseInt($quant);
            BX.ajax.loadJSON(
                "/ajax/basket/addBasket.php",
                ajaxParams,
                function(arResult){

                    //console.log('BX.ajax.loadJSON');
                    //console.log(arResult);
                    //console.log("button.button-cart:not");

                    if ('object' == typeof(arResult)) {
                        if ('OK' == arResult.STATUS) {

                            // для малого магазина
                            if($('*').is('#toolbar-clear-basket')) {
                                var count_cart = $("#toolbar-clear-basket").text();
                                $("#toolbar-clear-basket").text(Number(count_cart) + ajaxParams.quantity);
                            }
                            else {
                                $("#maxi_right_toolbar").append('<a href="#" title="Очистить корзину" class="toolbar-clear_basket" id="toolbar-clear-basket">1</a>');
                            }
                            // -----------------------

                            $.get("/ajax/shop/littlecart.php?maxi2020=Y", function(data){
                                //console.log("sss");
                                //BX.onCustomEvent('on_basket_small_cart_quantity', {status:'ok'});
                                // --------------------------------------
                                BX.ajax({
                                    url:      '/ajax/shop/littlecart_small.php?maxi2020=Y',
                                    method:   'POST',
                                    dataType: 'html',
                                    data:'',
                                    processData: true,
                                    onsuccess: function(cart_count){
                                        $("a.header__basket-m").text(cart_count);
                                    },
                                    onfailure: function(){}
                                });
                                // --------------------------------------

                                $('a.header__basket-link #cart-quantity').html(data);
                                btnCart.removeClass('btn-cart-disabled').addClass('btn-cart-added').text('Добавлено');
                                setTimeout(function(){
                                    btnCart.removeAttr('disabled').removeClass('btn-cart-added').text(th_text);//'В корзину'
                                },2000);

                                btnCart.parent().find(".popup-box-cart .count span").html($quant);
                                btnCart.parent().find(".popup-box-cart .price span").html($price);
                                if ($priceOld) {
                                    btnCart.parent().find(".popup-box-cart .price-older").html($priceOld);
                                }
                                btnCart.parent().find(".popup-box-cart").removeClass("hidden");
                            });
                        } else {
                            btnCart.removeClass('btn-cart-disabled').addClass('btn-cart-adderror').text(arResult.MESSAGE);
                            setTimeout(function(){
                                btnCart.removeAttr('disabled').removeClass('btn-cart-adderror').text(th_text);
                            },2000)
                        }
                    }
                }
            );
        }else{

            e.preventDefault();
        }

    });
});