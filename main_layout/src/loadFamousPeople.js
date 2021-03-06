/** @format */

const whotofollow_wrapper = document.querySelector(
  '.whotofollow_wrapper'
);
const whotofollow = document.querySelector('.whotofollow');
// started to load information
const loadFamousPeople = () => {
  fetch('http://localhost:3000/well_know')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((people) => {
        let div = document.createElement('div');
        div.className = 'whotofollow_item';
        div.innerHTML = `
                    <div class="follow_container">
                        <div class="follow_ava">
                            <img  src="${people.avatar}" alt="">
                        </div>
                        <div>
                            <div class="follow_name">
                                <span >${people.name}</span>
                            </div>
                            <div class="follow_key">
                                <span >${people.nickname}</span>
                            </div>
                        </div>
                    </div>
                        <button class="follow">
                            <span>
                                Follow
                            </span>
                        </button>`;

        whotofollow_wrapper.appendChild(div);
      });
    })
    .then(() => {
      followAction();
    });
};
loadFamousPeople();
// get event follow
function followAction() {
  const followItems = document.querySelectorAll(
    '.whotofollow_item'
  );
  followItems.forEach((item) => {
    const btn = item.querySelector('.follow');
    btn.addEventListener('click', () => {
      whotofollow_wrapper.removeChild(item);
      let id = sessionStorage.getItem('id');
      let obj = {
        userID: id,
        name: `${
          item
            .querySelector('.follow_name')
            .querySelector('span').textContent
        }`,
        nickName: `${
          item
            .querySelector('.follow_key')
            .querySelector('span').textContent
        }`,
        avatar: `${item.querySelector('img').src}`,
      };
      addToFollowList(obj);
    });
  });
}
// add information who user follow to DB
function addToFollowList(obj) {
  fetch('http://localhost:3000/followingList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  }).then(() => {
    showAlertFollow();
    updateFollowCount('followingList');
  });
}
// alert follow success message
function showAlertFollow() {
  const alert = document.querySelector('.alert_follow');
  alert.style.display = 'block';
  alert.querySelector(
    '.alert_follow_container'
  ).style.transform = 'translateY(0)';
  setTimeout(() => {
    alert.style.display = 'none';
  }, 500);
}
