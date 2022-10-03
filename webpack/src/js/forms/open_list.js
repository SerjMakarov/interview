$(document).ready(function(){
    $('body').click((e) => {
        var btnOpen = $('#openList'),
            btnClose = $('#closeList'),
            overlay = $('.overlay'),
            listDisplay = $("#boxList").css("display");
        if ((listDisplay == "block" && e.target == btnClose[0]) || (listDisplay == "block" && e.target == overlay[0]) ) {
            e.preventDefault();
            overlay.removeClass("overlay_show");
            $("#boxList").fadeOut("fast");
            return false;
        } else if (e.target == btnOpen[0] && listDisplay == "none") {
            e.preventDefault();
            overlay.addClass("overlay_show");
            $("#boxList").fadeIn("fast");
            return false;
        }
    });
    $(document).on('click', '.overlay_show', function () {
        $('#mobmenu').click();
    });
    $('#mobmenu').on('change', function(){
        if(this.checked) {
            $(".overlay").addClass("overlay_show");
            $(".overlay").addClass("overlay_show_menu");
            $("html").addClass("prevent-scroll");
        } else {
            $(".overlay").removeClass("overlay_show");
            setTimeout(function () {
                $(".overlay").removeClass("overlay_show_menu");
            }, 1000);

            $("html").removeClass("prevent-scroll");
        }
    });
})
