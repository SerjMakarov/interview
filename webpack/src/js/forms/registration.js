import recapchaResize from './recapcha_resize';

const initRegister = () => {
    var register_form_data = new Array();
    var registrationApp = function () {
        this.emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.phonePattern = /^((8|\+7)[\- ]?)?(\(?[0-689]\d{2}\)?[\- ]?)?[\d\- ]{7,10}$/;
        this.passwordPattern = /^[a-zA-Z0-9-_@]{6,}$/;
    };

    registrationApp.prototype.sendPhisRegister = function () {
        var self = this;

        var param = $('.registration__form').serialize();



        var surname = $(".registration__input-surname").val();
        var name = $(".registration__input-name").val();
        var tabel_number = $(".registration__input-tabel-number").val();
        var apple_id = $(".registration__apple-id").val();
        var email = $(".registration__input-email").val();


        var rules = $(".registration__form").is(":checked");
        register_form_data['email'] = email;
        // register_form_data['phone'] = phone;
        var emailpattern = self.emailPattern,
            phonepattern = self.phonePattern,
            passwordpattern = self.passwordPattern;

        // if (!rules) {
        //     $("#register_phis_rules_text").removeClass("display-none");
        //     $("#register_phis_rules_text").show();
        // }
        // else {
        //     $("#register_phis_rules_text").addClass("display-none");
        //     $("#register_phis_rules_text").hide();
        // }

        if (!emailpattern.test(email)) {
            $("input.registration__input-email").addClass('error');
        }

        // if (!phonepattern.test(phone)) {
        //     $("input#register_phis_phone").addClass('error');
        // }




        if (rules && phonepattern.test(phone) == true
            && emailpattern.test(login) == true && passwordpattern.test(password) == true) {

            $.post(
                '/ajax/forms_maxi2020/doRegister.php?' + 'RND=' + Math.random(),
                param,
                function (data) {
                    if (data == 'success') {
                        $("#person-first").addClass("hidden");
                        $("#person-code").data('active_form', 'register_phis_form').removeClass("hidden");
                        //location.reload();


                        window.dataLayer = window.dataLayer || [];
                        dataLayer.push({
                            'event': 'Регистрация частного лица',
                            'customerCity': window.customerCity
                        });

                    }
                    else {
                        $("#regErrorMessage").html(data);
                        $("#regErrorMessage").show();
                    }
                }
            )
        } else {
            console.log('Здесь выводим ошибку валидации формы'); // заменить на уведомление пользователя в самой форме
        }
    };

    registrationApp.prototype.sendOrgRegister = function () {
        var self = this;

        var param = $('#register_org_form').serialize();



        var login = $("#register_org_login").val();
        var phone = $("#register_org_phone").val();
        var password = $("#register_org_password").val();
        var rules = $("#register_phis_rules_org").is(":checked");
        register_form_data['email'] = login;
        register_form_data['phone'] = phone;

        var emailpattern = self.emailPattern,
            phonepattern = self.phonePattern,
            passwordpattern = self.passwordPattern;

        if (!rules) {
            $("#register_phis_rules_text_org").removeClass("display-none");
            $("#register_phis_rules_text_org").show();
        }
        else {
            $("#register_phis_rules_text_org").addClass("display-none");
            $("#register_phis_rules_text_org").hide();
        }

        if (!emailpattern.test(login)) {
            $("input#register_org_login").addClass('error');
        }

        if (!phonepattern.test(phone)) {
            $("input#register_org_phone").addClass('error');
        }

        if (rules && phonepattern.test(phone) == true
            && emailpattern.test(login) == true && passwordpattern.test(password) == true) {
            $.post(
                '/ajax/forms_maxi2020/doRegister.php?' + 'RND=' + Math.random(),
                param,
                function (data) {
                    if (data == 'success') {
                        $("#company").addClass("hidden");
                        $(document).scrollTop(0);
                        $("#person-code").data('active_form', 'register_org_form').removeClass("hidden");

                        window.dataLayer = window.dataLayer || [];
                        dataLayer.push({
                            'event': 'Регистрация юридического лица',
                            'customerCity': window.customerCity
                        });
                    }
                    else {
                        $("#orgRegErrorMessage").html(data);
                        $("#orgRegErrorMessage").show();
                        $(document).scrollTop(0);
                    }
                }
            )
        } else {
            console.log('Здесь выводим ошибку валидации формы'); // заменить на уведомление пользователя в самой форме
        }
    };

    registrationApp.prototype.initValidation = function () {
        var self = this;
        jQuery.validator.addMethod("alphanumericru", function (value, element) {
            return this.optional(element) || /^[А-Яа-яЁё0-9\s]+$/.test(value);
        }, "Пожалуйста, вводите только буквы и цифры!");

        jQuery.validator.addMethod("alpharu", function (value, element) {
            return this.optional(element) || /^[А-Яа-яЁё\s]+$/.test(value);
        }, "Пожалуйста, вводите только буквы!");

        jQuery.validator.addMethod("alpharueng", function (value, element) {
            return this.optional(element) || /^[a-zA-ZА-Яа-яЁё\s]+$/.test(value);
        }, "Пожалуйста, вводите только буквы!");

        jQuery.validator.addMethod("alphanumericrueng", function (value, element) {
            return this.optional(element) || /^[a-zA-ZА-Яа-яЁё0-9\s]+$/.test(value);
        }, "Пожалуйста, вводите только буквы и цифры!");

        jQuery.validator.addMethod("passenmin", function (value, element) {
            return this.optional(element) || self.passwordPattern.test(value);
        }, "В пароле допускаются только латинские буквы, знаки _@ и цифры. Минимальная длина пароля 6 символов!");

        $("form#register_phis_form").validate({
            errorElement: "span",
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
                $(element).parent().addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                $(element).parent().removeClass(errorClass).addClass(validClass);
            }
        });


        var validator = $("form#register_org_form").validate({
            errorPlacement: function(error, element) {
                var $error = $(error);
                $(element).after($error)
                    .focus(function(){
                        $error.removeClass('display-none')
                    })
                    .blur(function(){
                        $error.addClass('display-none')
                    });
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
                $(element).parent().addClass(errorClass).removeClass(validClass);

            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                $(element).parent().removeClass(errorClass).addClass(validClass);

            }

        });

        var buyerType = $('#register_org_buyer_type'),
            account = $('#register_org_account'),
            peraccount = $('#register_org_peraccount'), foo = 123;

        $.validator.addMethod('required-account', function (value, element) {
            var buyerTypeValue = buyerType.val(),
                accountValue = $.trim(account.val()),
                peraccountValue = $.trim(peraccount.val());

            return buyerTypeValue == '6' || accountValue.length > 0 || peraccountValue.length > 0;
        }, "Заполните расчетный счет, либо лицевой.");

        $.validator.addMethod('required-koraccount', function (value, element) {
            var buyerTypeValue = buyerType.val(),
                accountValue = $.trim(account.val());

            value = $.trim(value);

            return value.length > 0 || (buyerTypeValue != '6' && accountValue.length == 0);
        }, "Это поле необходимо заполнить.!!!!!");

        account.on('input', function () {
            validator.element('#register_org_peraccount');
            validator.element('#register_org_koraccount');
        });

        peraccount.on('input', function () {
            validator.element('#register_org_account');
        });

        $('#register_org_buyer_type').on('change', function () {
            validator.element('#register_org_account');
            validator.element('#register_org_peraccount');
            validator.element('#register_org_koraccount');
        });

        var orgType = $('#register_org_type');

        $.validator.addMethod('required-org-type', function (value, element) {
            var orgTypeValue = orgType.val();
            return orgTypeValue.length > 0;
        }, "Необходимо выбрать из выпадающего списка.");

        orgType.on('input', function () {
            validator.element('#register_org_type_text');
        });
    };

    $(function () {
        var regApp = new registrationApp();
        regApp.init();

        $("#register_wrapper .reg-person").unbind("click");
        $("#register_wrapper .reg-company").unbind("click");
        $(document).on('click', '#reg_phis_submit', function (e) {
            e.preventDefault();
            regApp.initValidation();
            if ($('#register_phis_form').valid()) {
                regApp.sendPhisRegister();
            }
            return false;
        });

        $(document).on('click', '#reg_org_submit', function () {
            regApp.initValidation();
            if ($('#register_org_form').valid()) {
                regApp.sendOrgRegister();
            }
            return false;
        });

        $(document).on('click', '#code_send', function () {
            var activeForm = $("#person-code").data('active_form'),
                param = $('#' + activeForm).serialize();

            var code = $("#reg_code").val();
            $.get(
                '/ajax/forms_maxi2020/doRegister.php?check_code=' + code + "&" + 'RND=' + Math.random(), param,
                function (data) {
                    if (data == 'success') {
                        $("#person-code").data('active_form', '').addClass("hidden");
                        var email = $('#register_phis_login').val();
                        $('.final_step_email').html(register_form_data.email);
                        $("#person-final").removeClass("hidden");
                        $('body').append('<script>rrApiOnReady.push(function() {rrApi.setEmail("'+email+'"); rrApi.welcomeSequence("'+email+'");});</script>');

                    }
                    else {
                        $("#codeErrorMessage").html(data);
                        $("#codeErrorMessage").show();
                    }
                }
            )

            return false;
        });

        $(document).on('click', '.send-code-again-link', function () {
            $('#send-code-again-block').show();
        });

        $(document).on('submit', '#send-code-again-form', function (e) {
            e.preventDefault();
            var form_data = $(this).serialize();
            $.get(
                '/ajax/forms_maxi2020/doRegister.php?send_code_again=Y&email=' + register_form_data.email + '&phone=' + register_form_data.phone,
                form_data,
                function (data) {
                    if (data == 'success') {
                        $('#send-code-again-message-id').html('Код отправлен.');
                    }
                }
            )
        });


        $('#register_wrapper').on("click", '.link-pass', function (e) {
            if ($('#register_phis_password').is(":visible")) {
                if ($('#register_phis_password').attr('type') == 'password') {
                    $('#register_phis_password').attr('type', 'text');
                    $(this).text('скрыть');
                }
                else {
                    $('#register_phis_password').attr('type', 'password');
                    $(this).text('показать');
                }
            }

            else if ($('#register_org_password').is(":visible")) {
                if ($('#register_org_password').attr('type') == 'password') {
                    $('#register_org_password').attr('type', 'text');
                    $(this).text('скрыть');
                }
                else {
                    $('#register_org_password').attr('type', 'password');
                    $(this).text('показать');
                }
            }

            return false;
        });
    });

    // $(function () {
    //     alert( $('.js-jur-register-select').length);
    //     $('.js-jur-register-select').styler({
    //         selectSearch: true,
    //         selectSearchLimit: 20
    //     });
    //
    //     $('#register_org_form [name="REGISTER_ORG[BUYER_TYPE]"]').on('change', function () {
    //         // только для ПБОЮЛ длинна ИНН 12 знаков и ОКПО не обязательно для заполнения
    //         var byer_type = $(this).children('option:selected').val();
    //         if (byer_type == 2) {
    //             $('#register_org_form [name="REGISTER_ORG[INN]"]').attr({
    //                 'maxlength': '12',
    //                 'minlength': '12',
    //                 'placeholder': '123456789012'
    //             }).removeClass('error');
    //             $('#register_org_form [name="REGISTER_ORG[OKPO]"]').removeClass('required').removeClass('error');
    //         } else {
    //             $('#register_org_form [name="REGISTER_ORG[INN]"]').attr({
    //                 'maxlength': '10',
    //                 'minlength': '10',
    //                 'placeholder': '1234567890'
    //             }).removeClass('error');
    //             $('#register_org_form [name="REGISTER_ORG[OKPO]"]').addClass('required').removeClass('error');
    //         }
    //     });
    // });
};

export default initRegister;