function renderCard(tweet) {
  var newCard = document.createElement("tweet-to-guess");
  // newCard.setAttribute("id", "my-element-id");

  newCard.setAttribute("tweet-content", "");
  document.getElementsByClassName('container')[0].appendChild(newCard);

}





function renderQuestion() {
  $.ajax("./getNextQuestion").then(function() {

  });


}