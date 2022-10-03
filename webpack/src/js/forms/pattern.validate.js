$(document).ready(function () {
    jQuery.validator.addMethod("mobPhone", function(value, element) {
        var isValid = false;
        isValid = /^((8|\+7)[\- ]?)?(\(?[0-689]\d{2}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value);
        return this.optional(element) || isValid;
    }, "Пожалуйста, введите корректный номер телефона");

    jQuery.validator.addMethod("string", function(value, element) {
        return /^[A-Za-zА-Яа-яёЁ -._]*$/.test(value);
    });

    jQuery.validator.addMethod("phoneNumber", function(value, element) {
        return /^((8|\+7)[\- ]?)?(\(?[0-689]\d{2}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value);
    });
});