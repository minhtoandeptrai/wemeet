    const formMain = document.querySelector('.form_main');
    const users = 
    {
        userName : [
            {
                name : 'JD Chow',
                login_Name : 'chowchow',
            }, 
            {
                name : 'Shawron Ween',
                login_Name : 'weenween',
            },
            {
                name : 'Daniel Adodaca',
                login_Name : 'avocado',
            },
            {
                name : 'Aldo Delara',
                login_Name : 'dedelala',
            },
        ],
        render: function(){
            this.userName.forEach( function(user, index) {
                const node = document.createElement('div');
                node.className = 'login__item'
                node.innerHTML = `
                    <span id="${index + 1}">Login as ${user.name}, username: ${user.login_Name}</span>
                `
                formMain.appendChild(node)
            })
        },
        start: function(){
            this.render()
        }
    }
    users.start()
