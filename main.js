function renderCard(tweet) {
  var newCard = document.createElement("tweet-to-guess");
  // newCard.setAttribute("id", "my-element-id");
  //
  newCard.setAttribute("content", tweet.content);
  newCard.setAttribute("title", tweet.title);
  newCard.setAttribute("image", tweet.image);
  document.getElementsByClassName('tweet-container')[0].appendChild(newCard);
}

renderCard({
  content: "content",
  "title": "title",
  "image": "image"
});

renderCard({
  content: "content",
  "title": "title",
  "image": "image"
});

function renderQuestion() {
  $.ajax("./getNextQuestion").then(function() {

  });


}
