$(document).ready(function() {
  getQuote();
  $('.trigger').click(function() {
      getQuote();
  })
});

let tweetLink = "https://twitter.com/intent/tweet?text=";
let quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

$.ajaxSetup({ cache: false })

function getQuote() {
  $('.quote').html($('<div>').addClass('spinner'));
  $('.author').html('');
  $.getJSON(quoteUrl, createTweet);
}

function createTweet(input) {
  let data = input[0];
  let quoteText = $(data.content).text().trim();
  let quoteAuthor = data.title;

  if (!quoteAuthor.length) {
      quoteAuthor = "Unknown author";
  }

  let tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
  
  if (tweetText.length > 140) {
    getQuote();
  } else {
    let tweet = tweetLink + encodeURIComponent(tweetText);
  
    $('.quote').text(quoteText);
    $('.author').text("Author: " + quoteAuthor);
    $('.tweet').attr('href', tweet);
  }
}