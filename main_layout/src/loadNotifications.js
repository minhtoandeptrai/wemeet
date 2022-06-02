/** @format */

setTimeout(() => {
  const callLoading = document.querySelector("#notifications-btn");
  callLoading.addEventListener("click", () => {
    const loadContainer = () => {
      showLoading();
      setTimeout(() => {
        const option = document.querySelector(".options");
        let div = document.createElement("div");
        div.className = "notifications options";
        div.innerHTML = `
                <div class="notifications_container">
                    <div class="notifications_header">
                        <h2>Notifications</h2>
                        <ion-icon name="settings-outline"></ion-icon>
                    </div>
                    <div class="notifications_options">
                        <div class="notifications_options_selection">
                            <div class="notifications_options_child">
                                <span>All
                                    <span class="notifications_line"></span>
                                </span>
                            </div>
                            <div class="notifications_options_child">
                                <span>Mentions
                                    <span class="notifications_line"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="notifications_wrapper">
                        <div class="notifications_wrapper_child">
                            <div class="notifications_item">
                                <div class="notifications_item_icon">
                                    <i class="fa-solid fa-paper-plane"></i>
                                </div>
                                <div class="notifications_item_content">
                                    <span>We recieved a notification</span>
                                </div>
                            </div>
                            <div class="notifications_item">
                                <div class="notifications_item_icon">
                                    <i class="fa-solid fa-paper-plane"></i>
                                </div>
                                <div class="notifications_item_content">
                                    <span>There was an attempt to log in to your account @${sessionStorage.getItem(
																			"name"
																		)} on 21 thg 5, 2022 that seems suspicious. Review it now.</span>
                                </div>
                            </div>
                            <div class="notifications_item">
                                <div class="notifications_item_icon">
                                    <i class="fa-solid fa-paper-plane"></i>
                                </div>
                                <div class="notifications_item_content">
                                    <span>Let's find your destiny love, there more interesting things for you</span>
                                </div>
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
        hideLoading();
      }, 1000);
    };
    loadContainer();
  });
}, 600);