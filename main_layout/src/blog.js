const blogContainer = document.querySelector('.blog_wrapper');
postContainer = {
    postItems : [
        {
            name: 'Lan  Huong',
            age: '19',
            time: '19 hours',
            description: 'You are so beautiful',
            likes: ' 1.5',
            comments: ' 0'
        },
        {
            name: 'Lan  Huong',
            age: '19',
            time: '19 hours',
            description: 'You are so beautiful',
            likes: ' 1.5',
            comments: ' 0'
        },
        {
            name: 'Lan  Huong',
            age: '19',
            time: '19 hours',
            description: 'You are so beautiful',
            likes: ' 1.5',
            comments: ' 0'
        }
    ],
    render : function(){
        this.postItems.forEach(function(post){
            let div = document.createElement("div")
div.className = "blog_item"
div.innerHTML = `
<div class="blog_item_avatar">
<span>
    <img src="https://images.unsplash.com/photo-1644982647531-daff2c7383f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="">
</span>
</div>
<div class="blog_item_main">
<div class="blog_item_infor">
    <div class="blog_item_infor_name">
        <span>${post.name}</span>
        <span class ="age"><i class="fa-solid fa-venus"></i>${post.age}</span>
    </div>
    <div class="blog_time">
        <span>${post.time}</span>
    </div>
</div>
<div class="blog_item_content">
    <div class="blog_caption">
        <span>${post.description}</span>
    </div>
    <div class="blog_img">
        <img src="https://images.unsplash.com/photo-1644982647531-daff2c7383f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="">
    </div>
</div>
<div class="blog_contact">
    <div class="blog_contact_status">
        <span><i class="fa-regular fa-heart"></i>${post.likes}</span>
    </div>
    <div class="blog_contact_status">
        <span><i class="fa-regular fa-comment"></i>${post.comments}</span>
    </div>
</div>
<div class="comment_to_blog">
    <div class="comment_to_blog_wrapper">
        <div class="your_avatar">
            <img src="https://images.unsplash.com/photo-1644982647531-daff2c7383f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="">
        </div>
        <div class="text_to">
            <input type="text" placeholder="Type to comment...">
            <i class="fa-solid fa-paper-plane"></i>
        </div>
    </div>
</div>
<div class="comment_container">
    <div class="comment_list">
    </div>
</div>
</div>
`
blogContainer.appendChild(div)
        })
    },
    start:function (){
        this.render()
    }
}
postContainer.start()

