import jQuery from "jquery";

export const animationOnScroll = (distance = 250) => {
    var wWidth = jQuery(window).width();
    console.log(distance)
    jQuery('.animation, .navbar').each(function () {
        if ((jQuery(this).isInViewport(distance) || wWidth < 768) && !(jQuery(this).hasClass('el_in_viewport'))) {
            jQuery(this).addClass('el_in_viewport');
        }
    });

    jQuery(window).scroll(function () {
        jQuery('.animation').each(function () {
            if (jQuery(this).isInViewport(distance) && !(jQuery(this).hasClass('el_in_viewport'))) {
                jQuery(this).addClass('el_in_viewport');
            }
        });
    });
}
