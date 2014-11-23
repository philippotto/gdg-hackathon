function renderQuestion(tweet) {
  console.log("executed");
  var newCard = document.createElement("tweet-to-guess");
  // newCard.setAttribute("id", "my-element-id");

  newCard.setAttribute("content", tweet.text);


  document.getElementsByClassName('question')[0].appendChild(newCard);
}

function renderChoices(tweets, solutionId) {
  tweets.forEach(function(tweet) {
    var newCard = document.createElement("tweet-choice");
    newCard.setAttribute("name", "name");
    newCard.setAttribute("image", "image");
    newCard.setAttribute("name", tweet);
    $(newCard).click(function() {
      if (solutionId === tweet) {
        $(newCard).addClass("correct-choice");
      } else {
        $(newCard).addClass("wrong-choice");

      }
      console.log("clicked on question");
    });
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
    renderChoices(data.otherUsers, data.solutionId);
  });
}



renderTask();
