const accordeon = (selector) => {
    const inner = () => {
        const $container = $(selector);
        $container.find('dl').each(function(i, e) {
            const $element = $(e);
            const $head = $element.find('dt');
            const $body = $element.find('dd');
            $body.slideUp(0);
            $head.on('click', function() {
                if ($body.is(':visible')) {
                    $body.slideUp();
                    $head.removeClass('active');
                } else {
                    $body.slideDown();
                    $head.addClass('active');
                }
            })
        });

        $(".accordeon dd").hide().prev().click(function() {
            $(this).parents(".accordeon").find("dd").not(this).slideUp().prev().removeClass("active");
            $(this).next().not(":visible").slideDown().prev().addClass("active");
        });
    };
    return inner;
};

export default accordeon;