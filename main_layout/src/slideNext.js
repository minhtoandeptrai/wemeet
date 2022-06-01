const getSlides = () =>{
    return new Promise(resolve =>{
        setTimeout(() => {
        let peopleItems = document.querySelectorAll('.people__item');
        resolve(peopleItems)
        }, 10);
    })
}
getSlides()
    .then(data=>{
        data.forEach(function(item){
        let next = item.querySelector('.arrow_next')
        let back = item.querySelector('.arrow_back')
        let leng = item.querySelectorAll('img').length
        const mainSlide = item.querySelector('.main__slide')
        let index = 0;
        next.addEventListener('click',function(e){
            ++index
            if(index < leng)
            {
                mainSlide.style.transform = `translateX(${-100 * index}%)`
            }
            else
            {
                index = leng - 1
            }
        })
        back.addEventListener('click', function(e) {
            --index
            if(index >= 0)
            {
                mainSlide.style.transform = `translateX(${-100 * index}%)`
            }
            else
            {
                index = 0
            }
        })
    })
})