setTimeout(() => {
    const callLoading = document.querySelector('#matching-btn')
    callLoading.addEventListener('click', () => {
        const loadContainer = () => {
            const option = document.querySelector('.options')
            console.log(option)
            let div = document.createElement('div')
            div.className = 'people options'
            div.innerHTML = `
                <div class="people__container">
                <div class="people_wrapper"></div>
                </div>
            `
            if (option) {
                main_container.removeChild(option)
                main_container.appendChild(div)
            } else {
                main_container.appendChild(div)
            }
            return new Promise((resolve) => {
                resolve()
            })
        }
        loadContainer()
            .then(function() {
                fetch("http://localhost:3000/people")
                    .then(res => {
                        showLoading()
                        return res.json()
                    })
                    .then((data) => {
                        const people_wrapper = document.querySelector('.people_wrapper');
                        data.forEach(function(user) {
                            setTimeout(() => {
                                let div = document.createElement("div")
                                div.className = "people__item"
                                div.innerHTML = `
                                <div class="slide__picture__container">
                                <div class="arrow_slide">
                                <span class="arrow_wrapp arrow_back" id="arrow_prev">
                                <i class="fa-solid fa-angle-left"></i>
                                </span>
                                <span class="arrow_wrapp arrow_next"  id="arrow_next">
                                <i class="fa-solid fa-angle-right"></i>
                                </span>
                                </div>
                                <div class="slide_outside">
                                <div class="main__slide" id="album_slide">
                                <div class="imgs"><img class="slide__item" data-count="0" src="${user.img[0]}" alt=""></div>
                                <div class="imgs"><img class="slide__item" data-count="0" src="${user.img[1]}" alt=""></div>
                                <div class="imgs"><img class="slide__item" data-count="0" src="${user.img[2]}" alt=""></div>
                                <div class="imgs"><img class="slide__item" data-count="0" src="${user.img[3]}" alt=""></div>
                                <div class="imgs"><img class="slide__item" data-count="0" src="${user.img[4]}" alt=""></div>
                                </div>
                                </div>
                                </div>
                                <div class="information__container">
                                <div class="information__main">
                                <div class="infor__header">
                                <div class="infor__name">
                                <div class="name__age__location">
                                <span class="people__name">${user.username}, ${user.age}</span>
                                <span class="location"><i class="fa-solid fa-location-dot"></i> ${user.farFrom}km from you</span>
                                </div>
                                </div>
                                <div class="select__options">
                                <div class=" select__option select__options__match">
                                <i class="fa-solid fa-heart-circle-plus"></i>
                                </div>
                                <div class="select__option select__options__next">
                                <i class="fa-solid fa-xmark"></i>
                                </div>
                                </div>
                                </div>
                                <div class="aboutyou">
                                <p>${user.selfIntroduce}</p>
                                </div>
                                <div class="passion">
                                <span>Passions</span>
                                <div class="passion__container">
                                <ul>
                                <li>#${user.passion_1}</li>
                                <li>#${user.passion_2}</li>
                                </ul>
                                </div>
                                </div>
                                </div>
                                </div>
                            `
                                people_wrapper.appendChild(div)

                                hideLoading()
                            }, 1000)
                        })
                    })
                    .then(() => {
                        setTimeout(() => {
                            sliderShow()
                            addFollow()
                            moveSlide()
                        }, 1200)
                    })
            })
    })
}, 500)

function sliderShow() {
    const container = document.querySelector('.people_wrapper');
    let index = 0;
    const getPeople = new Promise(
        function(resolve) {
            setTimeout(() => {
                let list = document.querySelectorAll('.people__item')
                console.log(list)
                list.forEach(function(item) {
                    console.log(item)
                })
                resolve(list)
            }, 10);
        })
    getPeople.then(function(data) {
        nextPeople(data);
    })
    const nextPeople = (data) => {
        const listLength = data.length
        data.forEach(function(item) {
            const next = item.querySelector('.select__options')
            next.addEventListener('click', function() {
                ++index;
                if (index < listLength) {
                    container.style.transform = `translateX(${-100 * index}%)`
                } else {
                    index = listLength
                }
            })
        })
    }
}

function moveSlide() {
    let list = document.querySelectorAll('.people__item')
    list.forEach(function(item) {
        let next = item.querySelector('.arrow_next')
        let back = item.querySelector('.arrow_back')
        let leng = item.querySelectorAll('img').length
        const mainSlide = item.querySelector('.main__slide')
        let index = 0;
        next.addEventListener('click', function(e) {
            ++index
            if (index < leng) {
                mainSlide.style.transform = `translateX(${-100 * index}%)`
            } else {
                index = leng - 1
            }
        })
        back.addEventListener('click', function(e) {
            --index
            if (index >= 0) {
                mainSlide.style.transform = `translateX(${-100 * index}%)`
            } else {
                index = 0
            }
        })
    })
}

function addFollow() {
    const list = document.querySelectorAll('.people__item')
    list.forEach((item) => {
        item.querySelector('.select__options__match').addEventListener('click', (e) => {
            updateFollow()
        })
    })
}