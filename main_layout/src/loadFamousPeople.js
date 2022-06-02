const whotofollow_wrapper = document.querySelector('.whotofollow_wrapper')
const whotofollow = document.querySelector('.whotofollow')
const loadFamousPeople = () => {
    fetch('http://localhost:3000/well_know')
        .then(res => {
            return res.json()
        })
        .then(data => {
            data.forEach((people) => {
                let div = document.createElement('div');
                div.className = 'whotofollow_item'
                div.innerHTML = `
                    <div class="follow_container">
                        <div class="follow_ava">
                            <img src="${people.avatar}" alt="">
                        </div>
                        <div>
                            <div class="follow_name">
                                <span>${people.name}</span>
                            </div>
                            <div class="follow_key">
                                <span>${people.nickname}</span>
                            </div>
                        </div>
                    </div>
                        <button class="follow">
                            <span>
                                Follow
                            </span>
                        </button>`

                whotofollow_wrapper.appendChild(div)
            })
        })
        .then(() => {
            followAction()
        })
}
loadFamousPeople()

function followAction() {
    const followItems = document.querySelectorAll('.whotofollow_item')
    followItems.forEach((item) => {
        const btn = item.querySelector('.follow')
        btn.addEventListener('click', () => {
            whotofollow_wrapper.removeChild(item)
            updateFollow()
            showAlertFollow()
        })
    })
}

function showAlertFollow() {
    const alert = document.querySelector('.alert_follow')
    alert.style.display = 'block'
    alert.querySelector('.alert_follow_container').style.transform = 'translateY(0)'
    setTimeout(() => {
        alert.style.display = 'none'
    }, 500)
}