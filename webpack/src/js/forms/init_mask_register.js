const init_mask_register = () => {
    //удаляем тк в новом плагине нет метода mask.definitions
    //$.mask.definitions['r'] = "[А-Яа-яЁё0-9- \s]";
    /*$('#register_phis_phone').mask('8(999)999-99-99', {placeholder: "8(___)___-__-__"});
    $('#register_org_phone').mask('8(999)999-99-99', {placeholder: "8(___)___-__-__"});*/
    init_phonemask()
    $('#register_org_postindex').mask('999999', {placeholder: "______"});
};

export default init_mask_register;
