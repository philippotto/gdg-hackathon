function renderQuestion(tweet) {
  console.log("executed");
  var newCard = document.createElement("tweet-to-guess");
  // newCard.setAttribute("id", "my-element-id");

  newCard.setAttribute("content", tweet.text);


  document.getElementsByClassName('question')[0].appendChild(newCard);
}

function renderChoices(tweets, solutionId) {
  var correctDiv;
  var showCorrect = function() {
    correctDiv.addClass("correct-choice");
  }

  tweets.forEach(function(tweetObj) {
    var newCard = document.createElement("tweet-choice");
    newCard.setAttribute("image", tweetObj.profile_image_url);
    console.log("tweet",  tweetObj.name);
    newCard.setAttribute("name", tweetObj.name);
    if (solutionId === tweetObj.screen_name) {
      correctDiv = $(newCard);
    }

    $(newCard).click(function() {
      if (solutionId === tweetObj.screen_name) {
        $(newCard).addClass("correct-choice");
      } else {
        $(newCard).addClass("wrong-choice");
        showCorrect();
      }

      setTimeout(clearTask, 1500);
      console.log("clicked on question");
    });
    document.getElementsByClassName('choices')[0].appendChild(newCard);
  });
}

var currentTaskIndex = 0;

var currentPromise = 0;
var promises = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function() {
  return $.ajax("./next");
})


function renderTask() {
  // renderQuestion({text : "a special tweet text!!"});
  // renderChoices(["Philipp", "Sven", "Nico"], "Sven");
  // setTimeout(function() {

  // }, 0);
  // return;
  if (currentPromise == promises.length) {
    currentPromise = 0;
  }
  promises[currentPromise++].then(function(data) {
    // solutionId
    // otherUsers
    // tweets

    if (data.tweets.length === 0) {
      renderTask();
      return;
    }

    renderQuestion(data.tweets[0]);
    renderChoices(data.otherUsers, data.solutionId);
    setTimeout(function() {
      $("tweet-to-guess").css({ "margin-left" : "0"});
      $("tweet-choice").css({ "margin-left" : "0"});

    }, 100);
  });
}



renderTask();


function clearTask() {
  $("tweet-to-guess").css({ "margin-left" : "-5000px"});
  $("tweet-choice").css({ "margin-left" : "5000px"});

  setTimeout(function() {
    $("tweet-to-guess").remove();
    $("tweet-choice").remove();

    setTimeout(function() {
      renderTask();
    }, 100)
  }, 1000);

}