import jQuery from "jquery";

export const animationOnScroll = () => {
    var wWidth = jQuery(window).width();

    jQuery('.animation, .navbar').each(function () {
        if ((jQuery(this).isInViewport() || wWidth < 768) && !(jQuery(this).hasClass('el_in_viewport'))) {
            jQuery(this).addClass('el_in_viewport');
        }
    });

    jQuery(window).scroll(function () {
        jQuery('.animation').each(function () {
            if (jQuery(this).isInViewport() && !(jQuery(this).hasClass('el_in_viewport'))) {
                jQuery(this).addClass('el_in_viewport');
            }
        });
    });
}
