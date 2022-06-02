/** @format */

const sideBarContainer = document.querySelector(".side__bar");
let id = sessionStorage.getItem("id");
fetch(`http://localhost:3000/user?id=${id}`)
	.then((res) => {
		return res.json();
	})
	.then((datas) => {
		datas.forEach((data) => {
			sessionStorage.setItem("img", data.avatar);
			sessionStorage.setItem("name", data.name);
			sessionStorage.setItem("followQty", data.following);
			let div = document.createElement("div");
			div.className = "side__bar__container";
			div.innerHTML = `
            <div class="mode">
                <ul>
                    <li id="home-btn" class ="sidebar-btn">
                        <ion-icon name="home-outline"></ion-icon></i>
                        <span>Home</span>
                    </li>
                    <li id="matching-btn" class="sidebar-btn">
                        <ion-icon name="heart-outline"></ion-icon>
                        <span>Matching</span>
                    </li>
                    <li id="profile-btn"  class="sidebar-btn">
                        <ion-icon name="person-outline"></ion-icon>
                        <span>Profile</span>
                    </li>
                    <li id="mess-btn"  class="sidebar-btn">
                        <ion-icon name="mail-unread-outline"></ion-icon>
                        <span>Messages</span></li>
                    <li id="explore-btn"  class="sidebar-btn">
                        <ion-icon name="crop-outline"></ion-icon>
                        <span>Explore</span>
                    </li>
                    <li id="notifications-btn"  class="sidebar-btn">
                        <ion-icon name="notifications-outline"></ion-icon>
                        <span>Notifications</span>
                    </li>
                </ul>
                <div class="account_menu">
                    <div class="account_menu_container">
                        <div class="account_ava">
                        <img src="${data.avatar}">
                        </div>
                        <div style="width: 80%; display: flex;justify-content: space-between; align-items: center;padding: 0 10px">
                            <div class="account_infor">
                                <span style="color:#000; font-weight:450; font-size: 1.5rem">${data.name}</span>
                            <span style="font-size:1.4rem">${data.nickname}</span>
                            </div>
                            <div id="load_more">
                            <i class="fa-solid fa-ellipsis" style="font-size: 1.5rem"></i>
                            </div>
                            <div class ="setting">
                            <div style=" padding: 10px;border-bottom: 1px solid #eee">
                                <div class="account_ava">
                                <img src="${data.avatar}">
                            </div>
                            </div>
                                <span id="log-out" style="font-size: 1.5rem ">Log out ${data.nickname}</span>
                                <span style="font-size: 1.5rem ">Add an Exist account</span>
                                <div class="arrow-down"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    `;
			sideBarContainer.appendChild(div);
		});
	})
	.then(() => {
		logOut();
		activeSidebarBtn();
		showLogOut();
	});

function activeSidebarBtn() {
	const sideBarBtn = document.querySelectorAll(".sidebar-btn");
	sideBarBtn.forEach((btn) => {
		btn.addEventListener("click", () => {
			const activedBtn = document.querySelector(".active");
			if (activedBtn) {
				activedBtn.classList.remove("active");
			}
			btn.classList.add("active");
		});
	});
}

function showLogOut() {
	const showBtn = document.querySelector("#load_more");
	const logOut = document.querySelector(".setting");
	console.log(logOut);
	console.log(showBtn);
	showBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		logOut.style.display = "flex";
	});
	document.addEventListener("click", () => {
		logOut.style.display = "none";
	});
}

function logOut() {
	const logOutBtn = document.querySelector("#log-out");
	logOutBtn.addEventListener("click", () => {
		window.location = "../../index.html";
	});
}
