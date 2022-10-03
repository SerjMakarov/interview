import 'jquery-validation';
import './validation_messages.js';
import init_mask_register from './init_mask_register';
import initRegister from "./registration";
import recapchaResize from './recapcha_resize';
import Restore from "./restore_captcha";
//инициализировать только после загрузки

$(document).ready(function () {
    recapchaResize('.login_form');
    $(".js-login_wrapper #pass-recover").unbind("click");
    $(".js-login_wrapper .reg-person").unbind("click");
    $(".js-login_wrapper .reg-company").unbind("click");

    $(document).on("click", ".box-login", function (e) {
        if ($(e.target).is(".close-box") || $(e.target).is(".box-login")) {
            $('.box-login').addClass('hidden');
            $("#USER_LOGIN").removeClass('error');
            $("#USER_PHONE").removeClass('error');
            $("#USER_PASSWORD").removeClass('error');
            Restore.destroy();
        }
    });


    //init_mask_login();

    $(document).on("click", "#gtm_clickLogin", function (e) {
        if($('#login_form').find('#USER_PHONE').is(':disabled')){
            $('#login_form').find('#USER_LOGIN').focus();
        } else {
            $('#login_form').find('#USER_PHONE').focus();
        }
    });

    $('#USER_LOGIN').addClass('email checkPhoneMail');
    $('#USER_PHONE').addClass('mobPhone checkPhoneMail required');
    $('#USER_PASSWORD').addClass('required');
	/*** start перенести на бой  (js валидация требует телефон И emai) ***/
    var validator = $("#login_form").validate();
	/*** end перенести на бой  (js валидация требует телефон И emai) ***/
	/*
    $("#USER_PHONE").focus(function () {
        $("#USER_PHONE").addClass('required');
        isLoginValid = validator.element("#USER_LOGIN");
        if (!isLoginValid) {
            $("#USER_LOGIN").removeClass('required');
        }
        //$("#USER_LOGIN").val('');
        $(this).keypress(function (e) {
            $("#USER_LOGIN").val('');
        });
    });

    $("#USER_LOGIN").focus(function () {
        $("#USER_LOGIN").addClass('required');
		//eсли телефон не валидный и фокус на eamil то
        isPhoneValid = validator.element("#USER_PHONE");
        if (!isPhoneValid) {
            $("#USER_PHONE").removeClass('required');
        }

        //$("#USER_PHONE").val('');
        $(this).keypress(function (e) {
            $("#USER_PHONE").val('');
        });
    });
	*/

	$("#USER_LOGIN").prop('disabled', true);

	$(document).on("click", "#checkbox-0", function (e) {

		if ($('#USER_LOGIN').prop('disabled')) {
			$("#USER_PHONE").val('');
			$('#USER_LOGIN').prop('disabled', false);
			$('#USER_PHONE').prop('disabled', true);
			$("#USER_LOGIN").addClass('required');
			$("#USER_PHONE").removeClass('required');
			validator.element("#USER_PHONE");
			$("#USER_LOGIN").focus();
		} else {
			$("#USER_LOGIN").val('');
			$('#USER_PHONE').prop('disabled', false);
			$('#USER_LOGIN').prop('disabled', true);
			$("#USER_PHONE").addClass('required');
			$("#USER_LOGIN").removeClass('required');
			validator.element("#USER_LOGIN");
			$("#USER_PHONE").focus();
		}
	});

    $(document).on("click", "#login_submit", function (e) {
        // loginsend();
		/*** start перенести на бой  (js валидация требует телефон И emai) ***/
		// проверяем по отдельности телефон	и мыло
        var validator = $("#login_form").validate();
        var isLoginValid = validator.element("#USER_LOGIN");
        var isPhoneValid = validator.element("#USER_PHONE");
        var isPasswordValid = $("#USER_PASSWORD").valid();
        if (isPasswordValid && isLoginValid && isPhoneValid) {
			/*** end перенести на бой  (js валидация требует телефон И emai) ***/
            console.log('form is valid');
            $(".ajax-load-authorize").css("display", "block");
            var param = $('#login_form').serialize();
            $.post('/ajax/forms_maxi2020/doLogin.php?' + 'RND=' + Math.random(), param, function (data) {
                if (data == 'success') {
                    location.reload();
                } else {
                    // console.log(data); // заменить на уведомление пользователя в самой форме
                    $(".ajax-load-authorize").css("display", "none");
                    $('#authErrorMessage').html(data);
					grecaptcha.reset();
                }
            });
        } else {
            console.log('form is Invalid');
        }

        // var isValid = $('#login_form').valid();
        // if (isValid) {

        //  }
        return false;
    });



    $('#login_form').validate({
        errorPlacement: function (error, element) {
            var $error = $(error);
				$(element).after($error.addClass('display-none'))
						.focus(function () {
							$error.removeClass('display-none')
						})
						.blur(function () {
							$error.addClass('display-none')
						});
        }
    });

   // $('.js-login_wrapper').on("click", '#pass-recover', function (e) {
    $(document).on('click', '#pass-recover', function (e) {
        e.preventDefault();
        $(".js-repair_wrapper").load("/ajax/forms_maxi2020/doRestore.php", function (e) {
            $('.box-login').addClass('hidden');
            $('#password-first').removeClass('hidden');
            $('#restore_form').attr('action', $('#login_form').attr('action'));
            Restore.init();
            init_mask_restore();
        });
        return false;
    });
    $(document).on('click', '.reg-person', function (e) {
        $("#register_wrapper").load("/ajax/forms_maxi2020/doRegister.php", function (e) {
            $('.box-login').addClass('hidden');
            $('#person-first').removeClass('hidden');
            init_mask_register();
            initRegister();
            recapchaResize('.register_phis_form');
            Restore.destroy();
        });
        return false;
    });

    $(document).on('click', '.reg-company', function (e) {
        $("#register_wrapper").load("/ajax/forms_maxi2020/doRegister.php", function (e) {
            $('.box-login').addClass('hidden');
            $('#company').removeClass('hidden');
            init_mask_register();
            initRegister();
            recapchaResize('.register_org_form');
            Restore.destroy();
        });
        return false;
    });

});

function loginsend()
{
    var param = $('#login_form').serialize();
    var login = $("#USER_LOGIN").val();
    var phone = $("#USER_PHONE").val();
    var password = $("#USER_PASSWORD").val();

    var emailpattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    var phonepattern = /^((8|\+7)[\- ]?)?(\(?\[0-689]\d{2}\)?[\- ]?)?[\d\- ]{7,10}$/;
    var passwordpattern = /^[a-zA-Z0-9]*$/;

    if (!password || !passwordpattern.test(password))
    {
        $("#USER_PASSWORD").addClass('error');
    } else
    {
        $("#USER_PASSWORD").removeClass('error');
    }

    if (!login && !phone) {
        $("#USER_LOGIN").addClass('error');
        $("#USER_PHONE").addClass('error');
    } else
    {
        if (login != '' && phone == '')
        {
            if (!emailpattern.test(login))
            {
                $("#USER_LOGIN").addClass('error');
                $("#USER_PHONE").removeClass('error');
            } else
            {
                $("#USER_LOGIN").removeClass('error');
                $("#USER_PHONE").removeClass('error');
            }
        } else if (phone != '' && login == '')
        {
            if (!phonepattern.test(phone))
            {
                $("#USER_PHONE").addClass('error');
                $("#USER_LOGIN").removeClass('error');
            } else
            {
                $("#USER_PHONE").removeClass('error');
                $("#USER_LOGIN").removeClass('error');
            }
        }
    }

    if ((phonepattern.test(phone) == true || emailpattern.test(login) == true) && (passwordpattern.test(password) == true))
    {
        $.post(
                '/ajax/forms_maxi2020/doLogin.php?' + 'RND=' + Math.random(),
                param,
                function (data) {
                    if (data == 'success') {
                        location.reload();
                    } else {
                        console.log(data); // заменить на уведомление пользователя в самой форме
                    }
                }
        )
    } else {
        console.log('Здесь выводим ошибку валидации формы'); // заменить на уведомление пользователя в самой форме
    }
}

/*function init_mask_login()
{
    //$('#USER_PHONE, mobPhone').mask('8(999)999-99-99', {placeholder: "8(___)___-__-__"});
}*/


/*
function init_mask_login()
{
    $('#USER_PHONE, mobPhone').mask('8(999)999-99-99');
}

function init_mask_register() {
    $.mask.definitions['r'] = "[А-Яа-яЁё0-9- \s]";
    $('#register_phis_phone').mask('8(999)999-99-99');
    $('#register_org_phone').mask('8(999)999-99-99');
    $('#register_org_postindex').mask('999999');
}
*/

function init_mask_restore()
{
    $('#RESTORE_PHONE').mask('8(999)999-99-99');
}