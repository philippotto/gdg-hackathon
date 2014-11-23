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

      setTimeout(clearTask, 2000);
      console.log("clicked on question");
    });
    document.getElementsByClassName('choices')[0].appendChild(newCard);
  });
}

var currentTaskIndex = 0;
var timeoutId = null;

function renderTask() {
  // renderQuestion({text : "a special tweet text!!"});
  // renderChoices(["Philipp", "Sven", "Nico"], "Sven");
  // setTimeout(function() {

  // }, 0);
  // return;

  $.ajax("./next").then(function(data) {
    // solutionId
    // otherUsers
    // tweets

    if (data.tweets.length === 0) {
      renderTask();
      return;
    }

    renderChoices(data.otherUsers, data.solutionId);

    function renderNext (i) {
    	if (i == data.tweets.length) {
    		setTimeout(function() {
    			clearTask();
    		}, 3500);
    	}

    	if(i < data.tweets.length) {

	    		$("tweet-to-guess").remove();
		    	renderQuestion(data.tweets[i]);

			      $("tweet-to-guess").css({ "margin-left" : "100px"});
			      $("tweet-choice").css({ "margin-left" : "0"});


		    	timeoutId = setTimeout(function() {renderNext(i + 1)}, 3000)

    	}
    }

    renderNext(0);

    

    // renderQuestion(data.tweets[0]);


    
  });
}



renderTask();


function clearTask() {
	clearTimeout(timeoutId);

  $("tweet-to-guess").css({ "margin-left" : "-5000px"});
  $("tweet-choice").css({ "margin-left" : "5000px"});


  setTimeout(function() {
    $("tweet-to-guess").remove();
    $("tweet-choice").remove();

    renderTask();
  }, 1000);

}