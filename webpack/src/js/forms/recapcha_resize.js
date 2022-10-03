const recapchaResize = (selector) => {
    console.log({
        selector
    });
    const $parent = $(selector);
    const $capcha = $parent.find('.g-recaptcha');
    const width = $capcha.parent().outerWidth();
    if (width < 302) {
        // const scale = width / 302;
        const scale = 0.7;
        console.log({
            width,
            scale
        });
        $capcha.css('transform', 'scale(' + scale + ')');
        $capcha.css('-webkit-transform', 'scale(' + scale + ')');
        $capcha.css('transform-origin', '0 0');
        $capcha.css('-webkit-transform-origin', '0 0');
        $capcha.fadeOut();
    }
};

export default recapchaResize;

