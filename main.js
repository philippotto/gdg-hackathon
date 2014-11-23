function renderCard(tweet) {
  var newCard = document.createElement("tweet-to-guess");
  // newCard.setAttribute("id", "my-element-id");
  // 
  newCard.setAttribute("tweet-content", "content");
  newCard.setAttribute("tweet-title", "title");
  newCard.setAttribute("tweet-image", "image");
  document.getElementsByClassName('tweet-container')[0].appendChild(newCard);

}

renderCard();





function renderQuestion() {
  $.ajax("./getNextQuestion").then(function() {

  });


}
