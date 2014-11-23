function renderQuestion(tweet) {
  console.log("executed");
  var newCard = document.createElement("tweet-to-guess");
  // newCard.setAttribute("id", "my-element-id");

  newCard.setAttribute("content", tweet.content);
  newCard.setAttribute("title", tweet.title);
  newCard.setAttribute("image", tweet.image);
  document.getElementsByClassName('question')[0].appendChild(newCard);
}

function renderChoices(tweets) {
  tweets.forEach(function(tweet) {
    var newCard = document.createElement("tweet-to-guess");
    // newCard.setAttribute("id", "my-element-id");

    newCard.setAttribute("content", tweet.content);
    newCard.setAttribute("title", tweet.title);
    newCard.setAttribute("image", tweet.image);
    document.getElementsByClassName('choices')[0].appendChild(newCard);
  });
}

renderQuestion({
  content: "content",
  title: "title",
  image: "image"
});

renderChoices([{
  content: "content",
  title: "title",
  image: "image"
},
{
  content: "content",
  title: "title",
  image: "image"
},
{
  content: "content",
  title: "title",
  image: "image"
}]);

function renderTask() {
  $.ajax("./getNextQuestion").then(function() {

  });


}
