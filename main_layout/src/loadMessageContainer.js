setTimeout( ()=>{
    const callLoading = document.querySelector('#mess-btn')
    callLoading.addEventListener('click',() =>{
        const loadContainer = () =>{
            showLoading()
            setTimeout(()=>{
                const option = document.querySelector('.options')
                let div = document.createElement('div')
                div.className = 'message options'
                div.innerHTML =
                `
                <div class="message_container">
                    <div class="message_header">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <div class="message_header_title">
                                <h2>Message</h2>
                            </div>
                            <div class="message_header_tool">
                                <ion-icon name="settings-outline"></ion-icon>
                                <ion-icon name="mail-outline"></ion-icon>
                            </div>
                        </div>
                    </div>
                    <div class="message_container_main">
                        <h1>Welcome to your inbox!</h1>
                        <div class="write_message">
                            <span>Write a message</span>
                        </div>
                    </div>
                </div>
                `
                if(option)
                {
                    main_container.removeChild(option)
                    main_container.appendChild(div)
                }
                else
                {
                    main_container.appendChild(div)
                }
                hideLoading()
            },1000)
        }
        loadContainer()
    })
},600)
