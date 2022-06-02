/** @format */

const loading = document.querySelector(".loading");
const main_container = document.querySelector(".main_container");
const showLoading = () => {
  loading.style.display = "flex";
};
const hideLoading = () => {
  loading.style.display = "none";
};
function updateFollowCount(option) {
  let id = sessionStorage.getItem('id');
  fetch(`http://localhost:3000/${option}?userID=${id}`)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      document.querySelector(`.${option}_quantity`).textContent = data.length
  })
}
