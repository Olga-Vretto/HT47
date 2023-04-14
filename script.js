const input = document.querySelector("#input");
const searchBtn = document.querySelector("#search-btn");
const postBlock = document.querySelector("#post");
const commentsBlock = document.querySelector("#comments");

searchBtn.addEventListener("click", () => {
  const idValue = input.value;
  if (idValue >= 1 && idValue <= 100) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${idValue}`)
      .then((response) => response.json())
      .then((post) => {
        postBlock.innerHTML = `
        <h2 class="post-title">${post.title}</h2>
        <p>${post.body}</p>`;

        const commentsBtn = document.createElement("button");
        commentsBtn.classList.add("comments-btn");
        commentsBtn.textContent = "Comments";

        commentsBtn.addEventListener("click", () => {
          fetch(
            `https://jsonplaceholder.typicode.com/posts/${idValue}/comments`
          )
            .then((response) => response.json())
            .then((comments) => {
              comments.forEach((comment) => {
                const commentEl = document.createElement("div");
                commentEl.classList.add("comment");
                commentEl.innerHTML = `
                    <h4 class="comment-title"> ~ ${comment.name}</h4>
                    <p>${comment.body}</p>`;
                commentsBlock.append(commentEl);
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
        postBlock.append(commentsBtn);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert(`Please enter post ID (from 1 to 100)!`);
  }
});
