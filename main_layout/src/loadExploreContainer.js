/** @format */

setTimeout(() => {
  const explore = document.querySelector("#explore-btn");
  explore.addEventListener("click", (e) => {
    const option = document.querySelector(".options");
    const loadContainer = () => {
      let div = document.createElement("div");
      div.className = "blog options";
      div.innerHTML = `
                <div class="blog__container">
                <div class="blog_wrapper">
                    </div>
                </div>
            `;
      if (option) {
        main_container.removeChild(option);
        main_container.appendChild(div);
      } else {
        main_container.appendChild(div);
      }
      return new Promise((resolve) => {
        resolve();
      });
    };
    loadContainer().then(() => {
      fetch("http://localhost:3000/posts")
        .then((res) => {
          showLoading();
          return res.json();
        })
        .then((data) => {
          const blogWrapper = document.querySelector(".blog_wrapper");
          data.forEach((post) => {
            setTimeout(() => {
              let div = document.createElement("div");
              div.className = "blog_item";
              div.id = `${post.id}`;
              div.innerHTML = `
                    <div class="blog_item_avatar">
                    <span>
                        <img src="${post.img}" alt="">
                    </span>
                    </div>
                    <div class="blog_item_main">
                    <div class="blog_item_infor">
                        <div class="blog_item_infor_name">
                            <span>${post.name}</span>
                            <span class ="age"><i class="fa-solid fa-venus"></i>${
															post.age
														}</span>
                        </div>
                        <div class="blog_time">
                            <span>${post.time}</span>
                        </div>
                    </div>
                    <div class="blog_item_content">
                        <div class="blog_caption">
                            <span style="font-family:none">${
															post.description
														}</span>
                        </div>
                        <div class="blog_img">
                            <img src="${post.img}" alt="">
                        </div>
                    </div>
                    <div class="blog_contact">
                        <div class="blog_contact_status blog_contact_like">
                            <span><i class="fa-regular fa-heart"></i></span>
                        </div>
                        <div class="blog_contact_status blog_contact_comment">
                            <span><i class="fa-regular fa-comment"></i></span>
                        </div>
                    </div>
                    <div class="comment_to_blog">
                        <div class="comment_to_blog_wrapper">
                            <div class="your_avatar">
                                <img src="${sessionStorage.getItem(
																	"img"
																)}" alt="">
                            </div>
                            <div class="text_to">
                                <input type="text" placeholder="Type to comment...">
                                <i class="fa-solid fa-paper-plane"></i>
                            </div>
                        </div>
                    </div>
                    <div class="comment_container">
                        <div class="comment_list">
                        </div>
                    </div>
                    </div>
                    `;
              blogWrapper.appendChild(div);
              hideLoading();
            }, 1000);
          });
        })
        //load comment
        .then(() => {
          setTimeout(() => {
            const blogItem = document.querySelectorAll(".blog_item");
            blogItem.forEach((item) => {
              const id = item.id;
              addPostLike(item);
              const list = item.querySelector(".comment_list");
              render(list, id);
              openCommentBlock();
              getValueInputComment();
              // react to post
              function addPostLike(item) {
                const likeBtn = item
                  .querySelector(".blog_contact_status")
                  .querySelector(".fa-heart");
                likeBtn.addEventListener("click", () => {
                  likeBtn.classList.toggle("fa-solid");
                });
              }
            });
            // open comment write UI
            function openCommentBlock() {
              blogItem.forEach((item) => {
                let btn = item.querySelector(".blog_contact_comment");
                btn.addEventListener("click", () => {
                  item.querySelector(".comment_to_blog").style.display =
                    "block";
                });
              });
            }
            //get value from input
            function getValueInputComment() {
              blogItem.forEach(function(cmt) {
                const sending = cmt.querySelector(".fa-paper-plane");
                sending.addEventListener("click", function(e) {
                  let values = cmt.querySelector("input").value;
                  cmt.querySelector("input").value = "";
                  if (values) {
                    let data = {
                      postID: cmt.id,
                      author: sessionStorage.getItem("name"),
                      content: values,
                      avatar: sessionStorage.getItem("img"),
                    };
                    postCmtToAPI(data, cmt);
                  }
                });
              });
              // post comment to DB
              function postCmtToAPI(data, cmt) {
                fetch(`http://localhost:3000/commentList`, {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                  })
                  .then((res) => {
                    return res.json();
                  })
                  .then((item) => {
                    let list = cmt.querySelector(".comment_list");
                    function updateComment(item, list) {
                      const div = document.createElement("div");
                      div.className = "comment_item";
                      div.innerHTML = `
                                        <div class="avatar">
                                        <img src="${item.avatar}" alt="">
                                    </div>
                                    <div class="comment_content">
                                        <div class="comment_user">
                                            <div class="main_comment">
                                                <span>${item.author}</span>
                                                <span class="main_content">${item.content}</span>
                                            </div>
                                            <ul class="comment_status">
                                                <li>Just</li>
                                                <li>Likes</li>
                                                <li>Reply</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="comment_heart">
                                        <i class="fa-regular fa-heart"></i>
                                    </div>
                                    `;
                      list.appendChild(div);
                    }
                    updateComment(item, list);
                  });
              }
            }
            // render comment at first
            function render(list, id) {
              fetch(`http://localhost:3000/commentList?postID=${id}`)
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  data.forEach((item) => {
                    const div = document.createElement("div");
                    div.className = "comment_item";
                    div.innerHTML = `
                    <div class="avatar">
                    <img src="${item.avatar}" alt="">
                </div>
                <div class="comment_content">
                    <div class="comment_user">
                        <div class="main_comment">
                            <span>${item.author}</span>
                            <span class="main_content">${item.content}</span>
                        </div>
                        <ul class="comment_status">
                            <li>Just</li>
                            <li>Likes</li>
                            <li>Reply</li>
                        </ul>
                    </div>
                </div>
                <div class="comment_heart">
                    <i class="fa-regular fa-heart"></i>
                </div>
                `;
                    list.appendChild(div);
                    updateList(div);
                  });
                });
            }

          
          }, 1000);
        });
    });
    const showLoading = () => {
      loading.style.display = "flex";
    };
    const hideLoading = () => {
      loading.style.display = "none";
    };
  });
}, 600);
// react to comment
function updateList(div) {
  let commentHeart = div.querySelector(".fa-heart");
  commentHeart.addEventListener("click", function(e) {
    this.classList.toggle("fa-solid");
  });
}


