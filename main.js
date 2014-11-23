function renderQuestion(tweet) {
  console.log("executed");
  var newCard = document.createElement("tweet-to-guess");
  // newCard.setAttribute("id", "my-element-id");

  newCard.setAttribute("content", tweet.text);
  newCard.setAttribute("clickHandler", function() {
    console.log("clicked on question");
  });

  document.getElementsByClassName('question')[0].appendChild(newCard);
}

function renderChoices(tweets) {
  tweets.forEach(function(tweet) {
    var newCard = document.createElement("tweet-choice");
    newCard.setAttribute("name", "name");
    newCard.setAttribute("image", "image");
    newCard.setAttribute("content", tweet);
    document.getElementsByClassName('choices')[0].appendChild(newCard);
  });
}

var currentTaskIndex = 0;

function renderTask() {
  $.ajax("./next").then(function(data) {
    // solutionId
    // otherUsers
    // tweets

    if (data.tweets.length === 0) {
      renderTask();
      return;
    }

    renderQuestion(data.tweets[0]);
    renderChoices(data.otherUsers);
  });
}



renderTask();
