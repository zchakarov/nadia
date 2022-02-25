import jQuery from "jquery";

jQuery.fn.isInViewport = function () {
    let elementTop = jQuery(this).offset().top;
    let elementBottom = elementTop + jQuery(this).outerHeight();
    let viewportTop = jQuery(window).scrollTop();
    let viewportBottom = viewportTop + jQuery(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom - 150;
};
