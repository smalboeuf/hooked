
const loadPosts = function () {
  //Get the amount of posts from the data base for a for loop
  //Or can just loop through the top 10

}


const loadComments = function() {
  //Load the top 10 comments
}

const loadOwnPage = function () {

}

const createPost = function(postData) {

  let postElement = $("<div>").addClass("hooked-post rounded");

  //Title div
  let titleElement = $("<div>").addClass("title");
  let titleSpan = $("<span>").addClass("titleSpan").text("Title");
  let usernameSpan = $("<span>").addClass("usernameSpan").text("Username");
  titleElement.append(titleSpan);
  titleElement.append(usernameSpan);
  postElement.append(titleElement);
  postElement.append("<hr>");

  //Post content
  let postContent = $("<div>").addClass("content");
  let postDescription = $("<span>").addClass("post-description").text("Description");
  let postContentSpan = $("<span>").addClass("post-content").text("Content: https://reddit.com/");
  postContent.append(postDescription);
  postContent.append(postContentSpan);
  postElement.append(postContent);
  postElement.append("<hr>");

  //Ratings
  let hookRatingsElement = $("<div>").addClass("hook-ratings");
  let ratingDiv = $("<div>").addClass("rating");
  let ratingInput = $("<input>").addType("number");
  ratingInput.attr("min", "0");
  ratingInput.attr("max", "5");
  ratingDiv.append(ratingInput);
  ratingDiv.append(" /5 Stars");
  let thumbsUpSpan = $("<span>").addClass("fa fa-thumbs-up");
  ratingDiv.append(thumbsUpSpan);
  hookRatingsElement.append(ratingDiv);
  postElement.append(hookRatingsElement);
  postElement.append("<hr>");

  //Add Comment
  let addCommentElement = $("<div>").addClass("addComment");
  let addCommentSpan = $("<span>").text("Add Comment: ");
  let commentBoxArea = $("<textarea>").attr("name", "comment");
  commentBoxArea.attr("id", "commentBox");
  commentBoxArea.attr("cols", "20");
  commentBoxArea.attr("rows", "10");
  let commentInputBox = $("<input>").attr("id", "addNewComment");
  commentInputBox.attr("type", "submit");
  commentInputBox.attr("value", "Hook a comment!");
  addCommentElement.append(addCommentSpan);
  addCommentElement.append(commentBoxArea);
  addCommentElement.append(commentInputBox);
  postElement.append(addCommentElement);

  //Comment Feed
  let commentFeedElement = $("<div>").addClass("commentFeed");
  let commentsSpan = $("<span>").text("Comments: ");

  commentFeedElement.append(commentsSpan);

  //We will then run a function to append all the comments here for the commentFeed
  //GENERATE COMMENTS
  for (let i = 0; i < AMOUNTOFCOMMENTS; i++) {
    commentFeedElement.append(createComment(COMMENTDATAFROMDATABASE));
  }

  postElement.append(commentFeedElement);


  return postElement;
}


const createComment = function (commentData) {
  //Create a comment element
  //Fill in appropriate parts with the comment
  //Send comment to the database

  let commentElement = $("<div>").addClass("comment");
  let usernameSpan = $("<span>").addClass("commentUsername").text("Username");
  let commentContentElement = $("<p>").addClass("commentContent").text(commentData);


  console.log(commentData);
  commentElement.append(usernameSpan);
  commentElement.append(commentContentElement);


  return commentElement;
}



$(document).ready(function() {
  $(".hookForm").hide();
});

//Adds new comment on click of the button
$(function() {
  $('#addNewComment').on('click', function(event) {
    event.preventDefault();

    let commentContent = $("#commentBox").val();

    //Make sure they can only comment if they are logged in

    if(commentContent){
      $(".commentFeed").prepend(createComment(commentContent));
      //COMMIT COMMENT TO DATABASE HERE
    } else {
      console.log("Please input a message to comment");
    }

    //Clearing the text area
    $("#commentBox").val("");

  });
});

$(function () {
  $("#createPostButton").on("click", function(event) {
    event.preventDefault();
    $("#createPostButton").hide();
    $(".hookForm").slideDown();
  })
});



