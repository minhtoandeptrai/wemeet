/** @format */

setTimeout(() => {
  let id = sessionStorage.getItem('id');
  const callLoading = document.querySelector('#home-btn');
  callLoading.addEventListener('click', () => {
    const loadContainer = () => {
      showLoading();
      setTimeout(() => {
        const option = document.querySelector('.options');
        let div = document.createElement('div');
        div.className = 'home options';
        div.innerHTML = `
                <div class="home_container">
                    <div class="home_header">
                        <h2>Home</h2>
                    </div>
                    <div class="home_posting">
                        <div class="avatar">
                            <img src="${sessionStorage.getItem(
                              'img'
                            )}" alt="">
                        </div>
                        <div class="home_posting_main">
                            <div class="home_input">
                                <div class="input">
                                    <textarea name="" class="homeinput" id="textarea" cols="80" rows="0" placeholder="What're you thinking"></textarea>
                                </div>
                            </div>
                            <div class="home_posting_preview_img">
                                <div class="preview_container"></div>
                            </div>
                            <div class="home_action">
                                <div class="home_insert">
                                    <ul>
                                        <div class = "upload upload_img">
                                            <label class="up_img" for="up_img">
                                                <ion-icon name="image-outline"></ion-icon>
                                            </label>
                                            <input class = "inputImg" type="file" id="up_img">
                                        </div>
                                        <div class = "upload upload_icon"><ion-icon name="happy-outline"></ion-icon></div>
                                        <div class = "upload upload_location"><ion-icon name="location-outline"></ion-icon></div>
                                    </ul>
                                </div>
                                <div class="action_post">Post</div>
                            </div>
                        </div>
                    </div>
                   <div class="home_posting_item_container">
                       <div class="home_posting_wrapper"></div>
                   </div>
                   <div class="home_alert">
                        <div class="home_alert_wrapper">
                            <div  class="home_alert_container">
                                <span class="home_alert_content">You has posted</span>
                                <i class="fa-solid fa-circle-check"></i>
                            </div>
                            <p>See it in your profile!</p>
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
        hideLoading();
      }, 1000);
    };
    loadContainer();
    setTimeout(() => {
      actionPost();
    }, 1200);
  });
}, 500);
// post action, get value from input
function actionPost() {
  const action_post =
    document.querySelector('.action_post');
  action_post.addEventListener('click', () => {
    let content =
      document.querySelector('.homeinput').value;
    document.querySelector('.homeinput').value = '';
    if (content) {
      let object = {
        userID: sessionStorage.getItem('id'),
        username: sessionStorage.getItem('name'),
        posttime: 'just',
        postContent: `${content}`,
        postImg:
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
      };
      creathomePost(object);
    }
  });
  // add post to DB
  function creathomePost(data) {
    fetch('http://localhost:3000/userPosts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    showAlert();
  }
}
// show alert success message
function showAlert() {
  const alert = document.querySelector('.home_alert');
  alert.style.display = 'block';
  alert.querySelector(
    '.home_alert_wrapper'
  ).style.transform = 'translateY(0)';
  setTimeout(() => {
    alert.style.display = 'none';
  }, 2000);
}
