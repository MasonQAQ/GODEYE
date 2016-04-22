$('.nav').navScroll({
  mobileDropdown: true,
  mobileBreakpoint: 768,
  scrollSpy: true
});

$('.click-me').navScroll({
  navHeight: 0
});

$('.nav').on('click', '.nav-mobile', function (e) {
  e.preventDefault();
  $('.nav ul').slideToggle('fast');
});