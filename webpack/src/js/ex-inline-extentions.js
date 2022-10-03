$(document).ready(function() {
    const $dataContainer = $('.js-data-container');

    (function () {
        $.ajax({
            type: 'POST',
            url: '/ajax/usr.php',
            data: '',
            success: function(success){
                document.cookie = "usrBitrixSet=flag; path=/;";
            }
        });
    })();

    (function () {
        const authErrorMessage = $dataContainer.data('auth-error-message');
        if (authErrorMessage === 'null') {
            return;
        }
        $('#authErrorMessage, #authErrorMessage_mobile').text(authErrorMessage);
        const screen_width = $(window).width();
        if(screen_width < 768) {
            $('.topbar_xs_right .xs_user').addClass('active');
            $(document).click(function(event) {
                if ($(event.target).closest('.xs_user').length == 0 &&  !$(event.target).hasClass('xs_user')) {
                    $('.topbar_xs_right .xs_user').removeClass('active');
                }
            });
        } else {
            $('.account .login').click();
        }
    })();

    (function retailRocketApi() {
        const init = () => {
            window.rrPartnerId = "5693c2f665bf19391c0a979c";
            window.rrApi = {};
            window.rrApiOnReady = window.rrApiOnReady || [];
            window.rrApi.addToBasket = window.rrApi.order = window.rrApi.categoryView = window.rrApi.view =
                window.rrApi.recomMouseDown = window.rrApi.recomAddToCart = function() {};
            (function(d) {
                var ref = d.getElementsByTagName('script')[0];
                var apiJs, apiJsId = 'rrApi-jssdk';
                if (d.getElementById(apiJsId)) return;
                apiJs = d.createElement('script');
                apiJs.id = apiJsId;
                apiJs.async = true;
                apiJs.src = "//cdn.retailrocket.ru/content/javascript/tracking.js";
                ref.parentNode.insertBefore(apiJs, ref);
            }(document));
        };
        init();
    })();

    (function (h) {
        function k() {
            var a = function (d, b) {
                if (this instanceof AdriverCounter)d = a.items.length || 1, a.items[d] = this, b.ph = d, b.custom && (b.custom = a.toQueryString(b.custom, ";")), a.request(a.toQueryString(b)); else return a.items[d]
            };
            a.httplize = function (a) {
                return (/^\/\//.test(a) ? location.protocol : "") + a
            };
            a.loadScript = function (a) {
                try {
                    var b = g.getElementsByTagName("head")[0], c = g.createElement("script");
                    c.setAttribute("type", "text/javascript");
                    c.setAttribute("charset", "windows-1251");
                    c.setAttribute("src", a.split("![rnd]").join(Math.round(1E6 * Math.random())));
                    c.onreadystatechange = function () {
                        /loaded|complete/.test(this.readyState) && (c.onload = null, b.removeChild(c))
                    };
                    c.onload = function () {
                        b.removeChild(c)
                    };
                    b.insertBefore(c, b.firstChild)
                } catch (f) {
                }
            };
            a.toQueryString = function (a, b, c) {
                b = b || "&";
                c = c || "=";
                var f = [], e;
                for (e in a)a.hasOwnProperty(e) && f.push(e + c + escape(a[e]));
                return f.join(b)
            };
            a.request = function (d) {
                var b = a.toQueryString(a.defaults);
                a.loadScript(a.redirectHost + "/cgi-bin/erle.cgi?" + d + "&rnd=![rnd]" + (b ? "&" + b : ""))
            };
            a.items = [];
            a.defaults = {tail256: document.referrer || "unknown"};
            a.redirectHost = a.httplize("//ad.adriver.ru");
            return a
        }

        var g = document;
        "undefined" === typeof AdriverCounter && (AdriverCounter = k());
        new AdriverCounter(0, h)
    })
    ({"sid": 197627, "bt": 62, "custom": {"153": "user_id"}});


    // ymaps??

    (function () {

    })();
});

