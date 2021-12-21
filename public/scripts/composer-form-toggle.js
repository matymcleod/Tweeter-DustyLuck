$(document).ready(function() {
  
  const $body = $(document).find('body');
  const $newTweetSection = $body.find('section.new-tweet');
  const $formToggleButton = $($body.find('nav')).find('div');
  const $scrollUpButton = $body.find('button.scroll-up');
  const $textArea = $newTweetSection.find('textarea');

  $newTweetSection.addClass('hide');
  $scrollUpButton.hide();

  $formToggleButton.on('click', function() {
    $newTweetSection.removeClass('hide');
    $formToggleButton.addClass('hide');
    $textArea.focus();
  });

  $(document).on('scroll', function() {
    $scrollUpButton.show();
    $formToggleButton.addClass('hide');

    if ($(this).scrollTop() == 0) {
      if ($newTweetSection.hasClass('hide')) {
        $formToggleButton.removeClass('hide');
      } else {
        $formToggleButton.addClass('hide');
      }
      $scrollUpButton.hide();
    }
  });

  $scrollUpButton.on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, 300);
    $newTweetSection.removeClass('hide');
    $formToggleButton.addClass('hide');
    $textArea.focus();
  });

});