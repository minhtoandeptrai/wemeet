/** @format */
setTimeout(() => {
  const id = sessionStorage.getItem('id');
  const callLoading =
    document.querySelector('#profile-btn');
  callLoading.addEventListener('click', () => {
    const loadContainer = () => {
      fetch(`http://localhost:3000/user?id=${id}`)
        .then((response) => {
          showLoading();
          return response.json();
        })
        .then((datas) => {
          setTimeout(() => {
            datas.forEach((data) => {
              const option =
                document.querySelector('.options');
              let div = document.createElement('div');
              div.className = 'profile options';
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
                                                    <div id="profile_match"  class="profile_follow profile_match">
                                                    <span class="matchingList_quantity"></span>
                                                    <span>Match</span>
                                                    </div>
                                                    <div id="profile_follower" class="profile_follow profile_follower">
                                                    <span class="followerList_quantity"></span>
                                                    <span>Follower</span>
                                                    </div>
                                                    <div id="profile_following" class="profile_follow profile_following">
                                                        <span class="followingList_quantity"></span>
                                                        <span>Following</span>
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
                                        <div class="follow_list" id="title" >
                                        <div class=" follow_list_wrapper ">
                                       
                                          <div class="follow_list_header ">
                                            <h2 class="follow_header_key key_following key_active"></h2>
                                            </h2>
                                            <i id = "follow_close" class="fa-solid fa-xmark"></i>
                                          </div>  
                                          <div class="follow_list_parent">
                                          <div class="follow_list_items">
                                            <div class="follow_item_container following_list_container "></div>
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
          }, 1000);
        })
        .then(() => {
          setTimeout(() => {
            editProfile();
            myPost();
            showInteracTions();
            hideContact();
            updateFollowCount('followingList');
            updateFollowCount('followerList');
            updateFollowCount('matchingList');
          }, 1100);
        });
    };

    loadContainer();
  });
  function editProfile() {
    const editBtn = document.querySelector(
      '.setup_profile'
    );
    editProfileSave();
    const editContainer =
      document.querySelector('.edit_profile');
    editBtn.addEventListener('click', () => {
      editContainer.style.display = 'block';
    });
    const cancle = document.querySelector('.edit_options');
    cancle.addEventListener('click', () => {
      editContainer.style.display = 'none';
    });
  }
  function myPost() {
    const postWrapper =
      document.querySelector('.post_wrapper');
    fetch(`http://localhost:3000/userPosts?userID=${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        data.forEach((item) => {
          let div = document.createElement('div');
          div.id = `${item.id}`;
          div.className = 'post_item';
          div.innerHTML = `
                            <div class="post_item_avatar">
                                <span>
                                    <img src="${sessionStorage.getItem(
                                      'img'
                                    )}" alt="">
                                </span>
                                </div>
                                <div class="post_item_main">
                                <div class="post_item_infor">
                                    <div class="post_item_infor_name">
                                        <span>${
                                          item.username
                                        }</span>
                                    </div>
                                    <div class="post_time">
                                        <span>${
                                          item.posttime
                                        }</span>
                                    </div>
																		<div class ="remove_post"><i class="fa-solid fa-xmark"></i></div>
                                </div>
                                <div class="post_item_content">
                                    <div class="post_caption">
                                        <span style="font-family:none">
                                        ${item.postContent}
                                        </span>
                                    </div>
                                    <div class="post_img">
                                        <img src="${
                                          item.postImg
                                        }" alt="">
                                    </div>
                                </div>
                                </div>
                            `;
          postWrapper.appendChild(div);
        });
      })
      .then(() => {
        removeProfilePost();
      });
  }
}, 500);
// check value input and edit
function editProfileSave() {
  const saveOption = document.querySelector('.save_option');
  saveOption.addEventListener('click', () => {
    let nameReplace = document.querySelector(
      '#form_edit_name'
    ).value;
    let nickNameReplace = document.querySelector(
      '#form_edit_nickname'
    ).value;
    let storyReplace = document.querySelector(
      '#form_edit_story'
    ).value;
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
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}
// show interactions container
function showInteracTions() {
  const contactList = document.querySelectorAll(
    '.profile_follow '
  );
  console.log(contactList);
  contactList.forEach((contact) => {
    contact.addEventListener('click', () => {
      document.querySelector('.follow_list').style.display =
        'flex';
      if (contact.id == 'profile_match') {
        document.querySelector(
          '.follow_header_key'
        ).textContent = 'Matched';
        loadFollowList(
          'matchingList',
          sessionStorage.getItem('id')
        );
      } else if (contact.id == 'profile_following') {
        document.querySelector(
          '.follow_header_key'
        ).textContent = 'Following';
        loadFollowList(
          'followingList',
          sessionStorage.getItem('id')
        );
      } else if (contact.id == 'profile_follower') {
        document.querySelector(
          '.follow_header_key'
        ).textContent = 'Follower';
        loadFollowList(
          'followerList',
          sessionStorage.getItem('id')
        );
      }
    });
  });
}
// close interactions container
function hideContact() {
  const closeBtn = document.querySelector('#follow_close');
  {
    closeBtn.addEventListener('click', () => {
      document.querySelector('.follow_list').style.display =
        'none';
      const followList = (document.querySelector(
        '.follow_item_container'
      ).innerHTML = ' ');
    });
  }
}
// load each interaction list
function loadFollowList(option, id) {
  // update quantity of list, defined in global.js
  updateFollowCount(option);
  const followList = document.querySelector(
    '.follow_item_container'
  );
  updateFollowCount(option);
  fetch(`http://localhost:3000/${option}?userID=${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((item) => {
        let div = document.createElement('div');
        div.className = 'follow_list_item';
        div.id = `${item.id}`;
        div.innerHTML = `
        <div class="follow_list_item_wrapper">
          <div class="follow_list_item_avatar">
            <img src="${item.avatar}" alt="">
          </div>
          <div class="follow_list_item_main">
            <span class="name" >${item.name}</span>
            <span class="nickname">${item.nickname}</span>
          </div>
          <div class="follow_list_item_remove">
            <span>Remove</span>
          </div>
        </div>
        `;
        followList.appendChild(div);
      });
    })
    .then(() => {
      removeFollowItem(option, id);
    });
}
// remove item from list
function removeFollowItem(option, id) {
  const list = document.querySelectorAll(
    '.follow_list_item'
  );
  console.log(list);
  list.forEach((item) => {
    item
      .querySelector('.follow_list_item_remove')
      .addEventListener('click', () => {
        console.log(item.id);
        fetch(
          `http://localhost:3000/${option}/${item.id}`,
          {
            method: 'DELETE',
          }
        ).then(() => {
          loadFollowList(option, id);
        });
      });
  });
}
function removeProfilePost() {
  let postList = document.querySelectorAll('.post_item');
  postList.forEach((post) => {
    post.addEventListener('click', (e) => {
      let id = post.id;
      fetch(`http://localhost:3000/userPosts/${id}`, {
        method: 'DELETE',
      });
      post.style.display = 'none';
    });
  });
}
