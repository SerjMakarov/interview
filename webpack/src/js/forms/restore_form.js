import 'jquery-validation';
import init_mask_register from './init_mask_register';
import Restore from "./restore_captcha";

$(document).ready(function(){
    $("#restore_wrapper .reg-person").unbind( "click" );
    $("#restore_wrapper .reg-company").unbind( "click" );

    $(document).on('click', '#restore_submit',function(){
        restoresend();
        return false;
    });

    // $(document).on('click', '.reg-person',function(e){
    //     $("#register_wrapper").load("/ajax/forms_maxi2020/doRegister.php", function(e) {
    //         $('.box-login').addClass('hidden');
    //         $('#person-first').removeClass('hidden');
    //         init_mask_register();
    //     });
    //     return false;
    // });
    //
    // $(document).on('click', '.reg-company',function(e){
    //     $("#register_wrapper").load("/ajax/forms_maxi2020/doRegister.php", function(e) {
    //         $('.box-login').addClass('hidden');
    //         $('#company').removeClass('hidden');
    //         init_mask_register();
    //     });
    //     return false;
    // });
});

function restoresend()
{
    var param = $('#restore_form').serialize();

    var login = $("#RESTORE_LOGIN").val();
    var phone = $("#RESTORE_PHONE").val();
    var old_login = $("#RESTORE_OLD_LOGIN").val();

    var emailpattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    var phonepattern = /^((8|\+7)[\- ]?)?(\(?[0-689]\d{2}\)?[\- ]?)?[\d\- ]{7,10}$/;
    var loginpattern = /[a-zA-Z_-]$/;

    let restoreButton = $('#restore_submit');
    let restoreButtonText = $(restoreButton).text();

    if(!login && !phone && !old_login){
        $("#RESTORE_LOGIN").addClass('error');
        $("#RESTORE_PHONE").addClass('error');
        $("#RESTORE_OLD_LOGIN").addClass('error');
    }
    else
    {
        if(login != '' && phone == '' && old_login == '')
        {
            if(!emailpattern.test(login))
            {
                $("#RESTORE_LOGIN").addClass('error');
                $("#RESTORE_PHONE").removeClass('error');
                $("#RESTORE_OLD_LOGIN").removeClass('error');
            }
            else
            {
                $("#RESTORE_LOGIN").removeClass('error');
                $("#RESTORE_PHONE").removeClass('error');
                $("#RESTORE_OLD_LOGIN").removeClass('error');
            }
        }
        else if(phone != '' && login == '' && old_login == '')
        {
            if(!phonepattern.test(phone))
            {
                $("#RESTORE_PHONE").addClass('error');
                $("#RESTORE_LOGIN").removeClass('error');
                $("#RESTORE_OLD_LOGIN").removeClass('error');
            }
            else
            {
                $("#RESTORE_LOGIN").removeClass('error');
                $("#RESTORE_PHONE").removeClass('error');
                $("#RESTORE_OLD_LOGIN").removeClass('error');
            }
        }
        else if(phone == '' && login == '' && old_login != '')
        {
            if(!loginpattern.test(old_login))
            {
                $("#RESTORE_OLD_LOGIN").addClass('error');
                $("#RESTORE_PHONE").removeClass('error');
                $("#RESTORE_LOGIN").removeClass('error');
            }
            else
            {
                $("#RESTORE_LOGIN").removeClass('error');
                $("#RESTORE_PHONE").removeClass('error');
                $("#RESTORE_OLD_LOGIN").removeClass('error');
            }
        }
    }

    if ((phonepattern.test(phone) == true || emailpattern.test(login) == true || loginpattern.test(old_login)== true))
    {
        $(restoreButton).text('Подождите...');
        $(restoreButton).attr("disabled", true);

        $.post(
            '/ajax/forms_maxi2020/doRestore.php?' + 'RND=' + Math.random(),
            param ,
            function(data){
                var result = jQuery.parseJSON(data);
                if (result.message == 'success') {
                    //location.reload();
                    $('.box-login').addClass('hidden');
                    $('#password-second').removeClass('hidden');
                    $('#e-mail').html(result.email);
                    Restore.resetReCaptcha();
                } else {
                    //$("input#register_org_login").addClass('error');
                    $("#restoreErrorMessage").html(result.message);
                    $("#restoreErrorMessage").show();
                    Restore.resetReCaptcha();
                    //console.log(data); // заменить на уведомление пользователя в самой форме
                }

                $(restoreButton).text(restoreButtonText);
                $(restoreButton).attr("disabled", false);
            }
        );

    }else{
        $("#restoreErrorMessage").html("Неверно заполнено");
        $("#restoreErrorMessage").show();
    }
}
