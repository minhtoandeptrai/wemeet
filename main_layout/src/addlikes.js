const body = document.querySelector('body')

const likeTop = $('.likes').offset().top
const likeLeft = $('.likes').offset().left
const getHearts = () =>{
    return new Promise(resolve =>{
        setTimeout(() =>{
            resolve(document.querySelectorAll('.select__options__match'))
        },10)
    })
}
    getHearts().then(matches =>{
        let matchTop = $('.select__options__match').offset().top
        let matchLeft = $('.select__options__match').offset().left
        matches.forEach( (match) => {
            match.addEventListener('click', (e) => {
                let div = document.createElement('div')
                div.className = "addlikes"
                div.innerHTML = `
                <i class="fa-solid fa-heart heart"></i>
                `
                body.appendChild(div)
                div.style.top = matchTop + "px"
                div.style.left = matchLeft + "px"
                div.style.transform = `translateY: 100%` 
                const wait = () =>
                {
                    body.removeChild(div)
                    match.style.userSelect = "none"
                    let quantity = document.querySelector('.likes').querySelector('.quantity')
                    let newQuantity = parseInt(quantity.textContent)
                    quantity.innerHTML = `<span data-count="0" class="quantity">${++newQuantity}</span>`;
                }
                function add (wait) {
                    div.style.top = likeTop + "px"
                    div.style.left = likeLeft + "px"
                    setTimeout(function () {
                        wait()
                    },1000)
                }
                setTimeout(function () {
                    add(wait)
                },100)
            })
        })
    })
