const blogItem = document.querySelectorAll('.blog_item')
blogItem.forEach(function(cmt)
{
    const comment = cmt.querySelector('.fa-comment')
    comment.addEventListener('click',function(e) {
        const commentItem = cmt.querySelector('.comment_to_blog')
        commentItem.style.display = 'block'
    })
})
blogItem.forEach(function(cmt)
{
    const sending = cmt.querySelector('.fa-paper-plane')
    sending.addEventListener('click', function(e){
        let values = cmt.querySelector('input').value
        console.log(values)
        cmt.querySelector('input').value = ''
        let commentList = cmt.querySelector('.comment_list')
        if(values != '')
        {
            render(values, commentList)
        }
    })
})
blogItem.forEach(function(cmt)
{
    const element = cmt.querySelector('.fa-heart')
    element.addEventListener('click', function(e){
        this.classList.toggle('fa-solid')
    })
})

function render (value,list) 
{
    const div = document.createElement('div')
    div.className = 'comment_item'
    div.innerHTML = `
        <div class="avatar">
        <img src="https://images.unsplash.com/photo-1582639590011-f5a8416d1101?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80v" alt="">
    </div>
    <div class="comment_content">
        <div class="comment_user">
            <div class="main_comment">
                <span>Justin Beiber</span>
                <span class="main_content">${value}</span>
            </div>
            <ul class="comment_status">
                <li>Just</li>
                <li>0 likes</li>
                <li>Reply</li>
            </ul>
        </div>
    </div>
    <div class="comment_heart">
        <i class="fa-regular fa-heart"></i>
    </div>
    `
    list.appendChild(div)
    updateList(div)
}
function updateList(div) 
{
    let commentHeart = div.querySelector('.fa-heart');
    commentHeart.addEventListener('click', function(e){
            this.classList.toggle('fa-solid')
    })
}
