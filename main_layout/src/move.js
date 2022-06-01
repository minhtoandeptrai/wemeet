const container = document.querySelector('.people_wrapper');
let index = 0;
const getPeople = new Promise(
    function(resolve){
            setTimeout(() => {
                let list = document.querySelectorAll('.people__item')
                resolve(list)
            }, 10);
    })    
getPeople.then(function(data){
    nextPeople(data);
})
const nextPeople = (data) => {
    const listLength = data.length
    data.forEach(function(item){
        const next = item.querySelector('.select__options')
        next.addEventListener('click', function(){
            ++index;
            if(index < listLength)
            {
                container.style.transform = `translateX(${-100 * index}%)`
            }
            else 
            {
                index = listLength
            }
        })
    })
}


