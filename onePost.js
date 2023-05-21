const apiPosts = 'https://gorest.co.in/public/v2/posts';
const apiComments = 'https://gorest.co.in/public/v2/comments';
const postDetailsDiv = document.querySelector('.post-details');
const postTitle = document.querySelector('.post-title');
const postBody = document.querySelector('.post-body');
const commentsList = document.querySelector('.comments-list');

function displayPostDetails(post) {
  postTitle.textContent = post.title;
  postBody.textContent = post.body;
}

async function loadPostDetails() {
  const postId = getPostId();
  const postResponse = await fetch(`${apiPosts}/${postId}`);
  const post = await postResponse.json();

  if (post) {
    displayPostDetails(post);
    loadComments(postId);
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Post not found';
    postDetailsDiv.appendChild(errorMessage);
  }
}

function getPostId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

async function loadComments(postId) {
  const commentsResponse = await fetch(`${apiComments}?post_id=${postId}`);
  const comments = await commentsResponse.json();

  if (comments.length === 0) {
    const noCommentsMessage = document.createElement('p');
    noCommentsMessage.textContent = 'No comments for this post';
    commentsList.appendChild(noCommentsMessage);
  } else {
    comments.forEach((comment) => {
      const commentItem = document.createElement('li');
      const commentName = document.createElement('h4');
      const commentBody = document.createElement('p');

      commentName.textContent = comment.name;
      commentBody.textContent = comment.body;

      commentItem.appendChild(commentName);
      commentItem.appendChild(commentBody);

      commentsList.appendChild(commentItem);
    });
  }
}

loadPostDetails();
