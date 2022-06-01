const loginItems = document.querySelectorAll('.login__item')

function doIt(item) {
    let ids = item.querySelector('span').id
    window.location = 'main_layout/src/index.html'
    formMain.style.display = 'none'
    sessionStorage.setItem('id', ids)
    console.log(ids)
}
loginItems.forEach((item) => {
    item.addEventListener('click', () => {
        console.log(item)
        doIt(item)
    })
})