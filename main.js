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
  content: "CATS! #KPPopUp is moving to Sydney! Pop in to The Lair at Metro Theatre (624 George St) starting tomorrow, Nov 21st-28th 10:00a-6:00p!",
  "title": "Katy Perry",
  "image": "https://pbs.twimg.com/profile_images/423542935368380416/ryEG2fNO_400x400.jpeg"
});

// renderCard({
//   content: "content",
//   "title": "title",
//   "image": "image"
// });

var newChoice = document.createElement("tweet-choice");

newChoice.setAttribute("image", "https://pbs.twimg.com/profile_images/423542935368380416/ryEG2fNO_400x400.jpeg");
newChoice.setAttribute("name", "Katy Perry");

document.getElementsByClassName('tweet-container')[0].appendChild(newChoice)

function renderQuestion() {
  $.ajax("./getNextQuestion").then(function() {

  });


}
