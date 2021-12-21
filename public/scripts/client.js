/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const loadTweets = function(tweetContent) {

    $.ajax({
      url: '/tweets',
      method: 'GET'
      })
      .done((tweets) => {
        renderTweets(tweets, tweetContent);
      })
      .fail((error) => console.log(`Error: ${error.responseJSON.error}`))
      .always(() => console.log('The tweet GET request was made!'));
  };
  
  loadTweets();
  
  const createTweetElement = function(tweet) {
    const date = $.timeago(tweet.created_at);
    
    const $newTweet = $('<article>').addClass('tweet');
    const $header = $('<header>');
    const $headerDiv = $('<div>');
    const $profileAvatar = $('<img>').attr('src', `${tweet.user.avatars}`);
    const $nameSpan = $('<span>').text(`${tweet.user.name}`);
    const $handleSpan = $('<span>').text(`${tweet.user.handle}`);
    const $content = $('<p>').text(`${tweet.content.text}`);
    const $footer = $('<footer>');
    const $dateCreatedSpan = $('<span>').text(`${date}`);
    const $footerDiv = $('<div>');
    const $flagIcon = $('<i>').addClass('fas fa-flag');
    const $retweetIcon = $('<i>').addClass('fas fa-retweet');
    const $likeIcon = $('<i>').addClass('fas fa-heart');
  
    $newTweet.append($header, $content, $footer);
    $header.append($headerDiv, $handleSpan);
    $headerDiv.append($profileAvatar, $nameSpan);
    $footer.append($dateCreatedSpan, $footerDiv);
    $footerDiv.append($flagIcon, $retweetIcon, $likeIcon);
  
    return $newTweet;
  };
  
  const renderTweets = function(tweets, tweetContent) {
    const $tweetsContainer = $('section#tweets-container');
    
    for (const tweet of tweets) {

      // if there's new tweet content, only post the tweet that is new
      if (tweetContent !== undefined && tweetContent === tweet.content.text) {
        $tweetsContainer.prepend(createTweetElement(tweet));
      } else if (tweetContent === undefined) {
        $tweetsContainer.prepend(createTweetElement(tweet));
      }

    }
  };

  const createErrorMsgElement = function(message) {
    const $form = $($($(document).find('body')).find('section.new-tweet')).find('form');
    const $label = $($form).find('label');
    const $labelDiv = $('<div>').addClass('label-div');
    const $errorDiv = $('<div>').addClass('error-div');
    const $errorMsg = $('<span>').html(`<i class="fas fa-exclamation-triangle"></i> ${message}`);

    $form.prepend($labelDiv);
    $labelDiv.append($label, $errorDiv);
    $errorDiv.append($errorMsg);
  };

  $('form').on('submit', function(event) {
    event.preventDefault();
    const $data = $(this).serialize();
    const $textArea = $(this).children('textarea');
    const $tweetContent = $textArea.val();
    
    // tweet character-limit error messages
    if ($tweetContent.replaceAll(' ', '') === '' || $tweetContent === null || $tweetContent.length === 0) {
      $('div.error-div').remove();
      return createErrorMsgElement('You can\'t post an empty tweet!');
    } else if ($tweetContent.length > 140) {
      $('div.error-div').remove();
      return createErrorMsgElement(`${$tweetContent.length} characters?? keep it under 140 🙏`);
    }

    // remove error if tweet passes conditionals
    $('div.error-div').remove();
    
    // clear textarea and reset counter
    $textArea.val('');
    $($(this).find('output.counter')).text('140');

    $.ajax({
      url: '/tweets', 
      method: 'POST',
      data: $data
      })
      .done(() => {
        loadTweets($tweetContent);
      })
      .fail((error) => console.log(`Error: ${error.responseJSON.error}`))
      .always(() => console.log('The tweet POST request was made!'));
  });

});