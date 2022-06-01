const loading = document.querySelector('.loading')
const main_container = document.querySelector('.main_container')
const showLoading = () =>{
    loading.style.display = 'flex'
}
const hideLoading = () =>{
    loading.style.display = 'none'
}
function updateFollow ()
{
    let followingQuantity = sessionStorage.getItem('followQty')
    let alterQty = parseInt(followingQuantity)
    alterQty += 1
    sessionStorage.setItem('followQty', alterQty)
    let id = sessionStorage.getItem('id')
    fetch(`http://localhost:3000/user/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            "following": alterQty
        })
    })     
}