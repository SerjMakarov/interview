window.init_phonemask = () => {
    var phone = $('.form_phone_input');
    var phoneregex = /^8\([0-689]\d{2}\)\d{3}-\d{2}-\d{2}$/;

    phone.inputmask("8(999)999-99-99", {
        //"clearIncomplete": true
    });

    phone.on("input", function(event) {
        var value = event.target.inputmask.unmaskedvalue();
        if (value.length === 1 && value === "7") {
            event.preventDefault();
            $(this).val('');
            $(this).focus();
        }
    });
    phone.on('paste', function (e) {
        e.preventDefault();
        var pasteData = e.originalEvent.clipboardData.getData('text');
        pasteData = pasteData.replace( /^\D+/g, '');
        pasteData = pasteData.replace(/^[+]?7{0,3}/, '');
        $(this).val(pasteData);
    });
    phone.on('input change paste keyup', function (e){
        if($(this).hasClass('required')){
            var val = this.value;
            if(phoneregex.test(val)){
                $(this).removeClass("error");
            }else{
                $(this).addClass("error");
            }
        }
    })
};

//export default init_phonemask;


$(document).ready(function () {
    init_phonemask();
    console.log('Test phonemask');
});
