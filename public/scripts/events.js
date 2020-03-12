
$(document).ready(function () {
  $(".hookForm").hide();

  $(function () {
    $("#createPostButton").on("click", function (event) {
      event.preventDefault();
      $("#createPostButton").hide();
      $(".hookForm").slideDown();
    })
  });


  $('.addRatingSubmit').on("click", function(event) {
    event.preventDefault();
  });


});

const makeNewRating = function (postId, element) {


  const ratingNumb = $(element).siblings(".ratingValue").val();

  let postData;
  $.ajax({
    method: 'POST',
    url: `http://localhost:8080/posts/${postId}/rating/${ratingNumb}`,
    data: postData
  }).done(() => {
    $.ajax({
      method: 'GET',
      url: `http://localhost:8080/posts/${postId}/rating`,
      data: postData
    }).done( result => {
      const averageRatings = $(element).parents('.rate-post').parents('.ratingInputs').siblings('.rating').children('.avgRating');
      averageRatings.text("Rating: " + result.round);
      $('.ratingInputs').hide();
    }
    );
    }
  );
}



const addNewComment = function (username, postId) {
  let commentContent = $("#commentBox").val();

  //Make sure they can only comment if they are logged in

  if (commentContent) {

    $(".commentFeed").prepend(createComment(commentContent, username, postId));
  } else {
    console.log("Please input a message to comment");
  }

  //Clearing the text area
  $("#commentBox").val("");
}

const processPost = function () {
  let postData;
  $.ajax({
    method: 'POST',
    url: '',
    data: postData
  }).done(
    result => {
      createPost(result);
    }
  );

}


const setUsername = function (userId, element) {
  let postData;
  $.ajax({
    method: 'GET',
    url: `http://localhost:8080/user/${userId}/`,
    data: postData
  })
    .done((result) => renderUsername(result, element));
}

const renderUsername = function (userObj, element) {
  element.text(userObj.username);
}


const loadPosts = function (postArray) {
  for (let i = 0; i < postArray.length; i++) {
    $(".hooked-feed").append(createPost(postArray[i], postArray[i].id));
  }
}

// const addToPosts = function ()
const getComments = function (postId, commentsElement) {

  let postData;
  $.ajax({
    method: 'GET',
    url: `http://localhost:8080/user/${postId}/comments`,
    data: postData
  })
    .done((result) => renderComments(result, commentsElement));
}

// Get average rating for a post
const getAvgRating = function (postId) {

  $.ajax({
    method: "GET",
    url: `http://localhost:8080/posts/${postId}/rating`,

  })
    .done((result) => renderRatings(result.avg));
}

const renderRatings = function (avg) {
  $(".avgRating").text(avg)
  console.log(avg);
}


const loadOwnPage = function () {
  //TO get a user who is logged in's data
  //req.session.userId
}

const createPost = function (postData, postId) {

  let postElement = $("<div>").addClass("hooked-post rounded");


  //Title div
  let titleElement = $("<div>").addClass("title");
  let titleSpan = $("<span>").addClass("titleSpan").text(postData.title);
  let usernameSpan = $("<span>").addClass("usernameSpan").text("Username");
  titleElement.append(titleSpan);
  titleElement.append(usernameSpan);
  postElement.append(titleElement);
  postElement.append("<hr>");

  //Post content
  let postContent = $("<div>").addClass("content");
  let postDescription = $("<span>").addClass("post-description").text(postData.description);
  let postContentSpan = $("<span>").addClass("post-content").text(postData.content);
  postContent.append(postDescription);
  postContent.append(postContentSpan);
  postElement.append(postContent);
  postElement.append("<hr>");

  //Ratings
  let hookRatingsElement = $("<div>").addClass("hook-ratings");
  let ratingDiv = $("<div>").addClass("rating");
  let ratingInput = $("<input>").attr("type", "number");
  ratingInput.attr("min", "0");
  ratingInput.attr("max", "5");
  ratingDiv.append(ratingInput);
  ratingDiv.append(" /5 Stars");
  let thumbsUpDiv = $("<div>");
  let thumbsUpSpan = $("<span>").addClass("fa fa-thumbs-up");
  thumbsUpSpan.attr("onclick", `likePost(${postId}, this)`);
  let numbOfLikesSpan = $("<span>").addClass("numbOfLikes").text(24);

  thumbsUpDiv.append(thumbsUpSpan);
  thumbsUpDiv.append(numbOfLikesSpan);

  hookRatingsElement.append(ratingDiv);
  hookRatingsElement.append(thumbsUpDiv);
  postElement.append(hookRatingsElement);
  postElement.append("<hr>").addClass("tempHr");


  //Add Comment
  let addCommentElement = $("<div>").addClass("addComment");
  let addCommentSpan = $("<span>").text("Add Comment: ");
  let commentBoxArea = $("<textarea>").attr("name", "comment");
  commentBoxArea.attr("id", "commentBox");
  commentBoxArea.attr("cols", "20");
  commentBoxArea.attr("rows", "10");
  let commentInputBox = $("<button>").attr("id", "addNewComment");
  commentInputBox.attr("type", "submit");
  commentInputBox.append("Hook a comment!");


  addCommentElement.append(addCommentSpan);
  addCommentElement.append(commentBoxArea);
  addCommentElement.append(commentInputBox);
  postElement.append(addCommentElement);

  //Comment Feed
  let commentFeedElement = $("<div>").addClass("commentFeed");
  let commentsSpan = $("<span>").text("Comments: ");

  commentFeedElement.append(commentsSpan);

  //GENERATE COMMENTS
  postElement.append(commentFeedElement);

  //CALL GET COMMENTS AND USE DATA FROM AJAX
  amountOfLikes(postId, numbOfLikesSpan);
  setUsername(postData.user_id, usernameSpan);
  getComments(postId, commentFeedElement);

  return postElement;
}

const createComment = function (commentData, username, postId) {
  //Create a comment element
  //Fill in appropriate parts with the comment
  //Send comment to the database

  let commentElement = $("<div>").addClass("comment");
  let usernameSpan = $("<span>").addClass("commentUsername").text(username + ":");
  let commentContentElement = $("<p>").addClass("commentContent").text(commentData);

  commentElement.append(usernameSpan);
  commentElement.append(commentContentElement);
  setUsername(commentData.user_id, usernameSpan);

  //MUST COMMIT COMMENT TO THE DATABASE

  let postData;
  $.ajax({
    method: 'POST',
    url: `http://localhost:8080/user/${postId}/comments/${commentData}`,
    data: postData
  })
  return commentElement;
}


const amountOfLikes = function (postId, element) {
  let postData;
  $.ajax({
    method: 'GET',
    url: `http://localhost:8080/${postId}/likes`,
    data: postData
  }).done((result) => renderLikes(result, element));
}

const renderLikes = function (amountOfLikes, element) {
  element.text(amountOfLikes.love);
}

const likePost = function (postId, element) {
  $(element).toggleClass("toggleBlue");
  $(element).siblings(".numbOfLikes").toggleClass("toggleBlue");
  // $(".numbOfLikes").toggleClass("toggleBlue");

  //Increment 1 to the amount of likes this post has
  //After render it again


  if (!$(element).siblings(".numbOfLikes").hasClass("toggleBlue")) {

    let postData;
    $.ajax({
      method: 'POST',
      url: `http://localhost:8080/${postId}/decreaseLikes`,
      data: postData
    }).done(() => {
      amountOfLikes(postId, $(element).siblings(".numbOfLikes"))
    });

  } else {


    let postData;
    $.ajax({
      method: 'POST',
      url: `http://localhost:8080/${postId}/increaseLikes`,
      data: postData
    }).done(() => {
      console.log("testing again");
      amountOfLikes(postId, $(element).siblings(".numbOfLikes"))
    });
  }
}



