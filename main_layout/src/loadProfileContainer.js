/** @format */

setTimeout(() => {
  let id = sessionStorage.getItem("id");
  const callLoading = document.querySelector("#profile-btn");
  callLoading.addEventListener("click", () => {
    const loadContainer = () => {
      fetch(`http://localhost:3000/user?id=${id}`)
        .then((response) => {
          showLoading();
          return response.json();
        })
        .then((datas) => {
          setTimeout(() => {
            datas.forEach((data) => {
              const option = document.querySelector(".options");
              let div = document.createElement("div");
              div.className = "profile options";
              div.innerHTML = `
                                    <div class="edit_profile">
                                        <div class="edit_profile_container">
                                            <div class="edit_image">
                                                <div class="edit_image_container">
                                                    <div class="edit_avatar">
                                                        <img src="${data.avatar}" alt="">
                                                        <input type="file" id="upload_edit_avatar" hidden>
                                                        <label class="pen_edit" for="upload_edit_avatar">
                                                            <i class="fa-solid fa-pen"></i> 
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="edit_main">
                                                <div class="edit_main_header">
                                                    <div class="title">
                                                        <h3>Personal Detail</h3>
                                                    </div>
                                                    <div class="edit_options">
                                                        <div class="edit_option cancel_option">
                                                            <span>
                                                                Cancle
                                                            </span>
                                                        </div>
                                                        <div class="edit_option save_option">
                                                            <span>
                                                                Save
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="edit_name_main">
                                                    <div class="edit_main_container">
                                                        <div class="edit_element edit_name">
                                                            <label for="">Your Name</label>
                                                            <input id="form_edit_name" type="text" placeholder="Your name is...">
                                                        </div>
                                                        <div class="edit_element edit_username">
                                                            <label for="">Username</label>
                                                            <input id="form_edit_nickname" type="text" placeholder="How I call you?">
                                                        </div>
                                                        <div class="edit_element about_me">
                                                            <label for="">Story</label>
                                                            <textarea id="form_edit_story" placeholder="Tell me something about" name="" id="edit_about_me" cols="30" rows="1"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="profile_container">
                                        <div class="profile_header">
                                            <div class="profile_header_background"></div>
                                            <div class="profile_header_main">
                                                <div class="profile_item profile_header_avatar">
                                                    <div class="avatar">
                                                        <img src="${data.avatar}" alt="">
                                                    </div>
                                                    <div class="setup_profile">Edit profile</div>
                                                </div>
                                                <div class="profile_information">
                                                    <div class="profile_item profile_name">
                                                        <span id="profile_name">
                                                            ${data.name}
                                                        </span>
                                                        <span id="nickname">
                                                            ${data.nickname}
                                                        </span>
                                                    </div>
                                                    <div class="profile_item profile_join">
                                                        <i class="fa-solid fa-calendar-days"></i>
                                                        <span> Joined May 2020</span>
                                                    </div>
                                                    <div class="profile_status">
                                                        <div class="profile_follow profile_following">
                                                            <span class="profile_follow_quantity">${data.following}</span>
                                                            <span>Following</span>
                                                        </div>
                                                        <div class="profile_follow profile_follower">
                                                            <span class=" profile_follow_quantity">${data.follower}</span>
                                                            <span>Follower</span>
                                                        </div>
                                                    </div>
                                                    <div class="profile_aboutme">
                                                        <span>"${data.quotes}"</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="profile_main">
                                            <ul id="posts_new">
                                                <li>My Posts</li>
                                            </ul>
                                            <div class="posts_container">
                                                <div class="post_wrapper">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `;
              if (option) {
                main_container.removeChild(option);
                main_container.appendChild(div);
              } else {
                main_container.appendChild(div);
              }
            });
            hideLoading();
          }, 0);
        })
        .then(() => {
          setTimeout(() => {
            editProfile();
            mypost();
          }, 200);
        });

      function editProfile() {
        const editBtn = document.querySelector(".setup_profile");
        editProfileSave();
        const editContainer = document.querySelector(".edit_profile");
        editBtn.addEventListener("click", () => {
          editContainer.style.display = "block";
        });
        const cancle = document.querySelector(".edit_options");
        cancle.addEventListener("click", () => {
          editContainer.style.display = "none";
        });
      }
    };

    loadContainer();
  });

  function mypost() {
    const postWrapper = document.querySelector(".post_wrapper");
    fetch(`http://localhost:3000/userPosts?userID=${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        data.forEach((item) => {
          let div = document.createElement("div");
          div.className = "post_item";
          div.innerHTML = `
                            <div class="post_item_avatar">
                                <span>
                                    <img src="${sessionStorage.getItem(
																			"img"
																		)}" alt="">
                                </span>
                                </div>
                                <div class="post_item_main">
                                <div class="post_item_infor">
                                    <div class="post_item_infor_name">
                                        <span></span>
                                    </div>
                                    <div class="post_time">
                                        <span></span>
                                    </div>
                                </div>
                                <div class="post_item_content">
                                    <div class="post_caption">
                                        <span style="font-family:none">
                                        ${item.postContent}
                                        </span>
                                    </div>
                                    <div class="post_img">
                                        <img src="${item.postImg}" alt="">
                                    </div>
                                </div>
                                </div>
                            `;
          postWrapper.appendChild(div);
        });
      });
  }
}, 500);

function editProfileSave() {
  const saveOption = document.querySelector(".save_option");
  saveOption.addEventListener("click", () => {
    let nameReplace = document.querySelector("#form_edit_name").value;
    let nickNameReplace = document.querySelector("#form_edit_nickname").value;
    let storyReplace = document.querySelector("#form_edit_story").value;
    if (nameReplace) {
      let object = {
        name: nameReplace,
      };
      replace(object);
    }
    if (nickNameReplace) {
      let object = {
        nickname: nickNameReplace,
      };
      replace(object);
    }
    if (storyReplace) {
      let object = {
        quotes: storyReplace,
      };
      replace(object);
    }
  });

  function replace(data) {
    fetch(`http://localhost:3000/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}