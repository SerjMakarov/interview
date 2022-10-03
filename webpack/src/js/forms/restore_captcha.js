let Restore = {};

Restore.captchaId = false;
Restore.isNeedCaptcha = false;
Restore.captchaElId = 'g-recaptcha-restore';

Restore.resetReCaptcha = function () {
    console.log("restore.recaptcha reset captcha: " + Restore.captchaId);
    grecaptcha.reset(Restore.captchaId);
}

Restore.addRecaptcha = function (el) {
    console.log('restore.recaptcha addRecaptcha');
    setTimeout(function () {
        let recaptchaKey = "6LfoY3QUAAAAAI06L5xPQBMIp6E8jshNt1xcbz1F";
        Restore.captchaId = grecaptcha.render(el, {
            'sitekey': recaptchaKey
        });
    }, 0);
}

/**
 * Инициализирует капчу восстановления пароля
 */
Restore.init = function () {
    console.log('restore.recaptcha init');
    if ($('#' + Restore.captchaElId).length > 0) {
        Restore.isNeedCaptcha = true;
        if (Restore.captchaId === false) {
            Restore.addRecaptcha(Restore.captchaElId);
        }
    } else {
        console.log('restore.recaptcha element container with #' + Restore.captchaElId + ' not found');
    }
}

Restore.destroy = function() {
    console.log('restore.recaptcha destroy');
    if (Restore.isNeedCaptcha === true) {
        Restore.captchaId = false;
    }
}

export default Restore;