jQuery.noConflict();
(function ($) {
  $(function () {

    $(document).ready(function () {

      // si pantalla es mobile se agrega class de owl.carousel
      if (getWidth() < 768) {
        $('#carouselClientes').removeClass('row');
        $('#carouselClientes').addClass('owl-carousel owl-theme owl-carousel-clientes');
        // owl carousel -clientes
        $('.owl-carousel-clientes').owlCarousel({
          loop: true,
          margin: 10,
          nav: false,
          items: 1
        })
      }

      // page home
      if ($('.page-home')[0]) {
        $('footer').css('margin-top', '0');
      }
    });

  });
})(jQuery);

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
