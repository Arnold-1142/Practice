const HOST = 'http://api-messenger.web-srv.local';
var TOKEN = '';
const CONTENT = document.querySelector('.content');


function _get(params, callback) {
    var HTTP_REQUEST = new XMLHttpRequest();
    HTTP_REQUEST.open('GET', `${params.url}`);
    HTTP_REQUEST.send();
    HTTP_REQUEST.onreadystatechange = function() {
        if(HTTP_REQUEST.readyState == 4) {
            callback(HTTP_REQUEST.responseText);
        }
    }
}

function _post (params, callback) {
    let HTTP_REQUEST = new XMLHttpRequest();
    HTTP_REQUEST.open('POST', `${params.url}`);
    HTTP_REQUEST.send(params.data);
    HTTP_REQUEST.onreadystatechange = function() {
        if(HTTP_REQUEST.readyState == 4) {
            callback(HTTP_REQUEST.responseText);
        }
    }
}


LoadPageReg()
function LoadPageReg(){
 _post({url: '/modules/registration.html'}, function(responseText){
    CONTENT.innerHTML=responseText
    onloadPageChat()
    onLoadPageAuth()
})
}



/*Регистрация*/

function onloadPageChat() {
    document.querySelector('.btn-4').addEventListener('click', function() {
        let fdata = new FormData();
        fdata.append('fam', document.querySelector('input[name="fam"]').value)
        fdata.append('name', document.querySelector('input[name="name"]').value)
        fdata.append('otch', document.querySelector('input[name="otch"]').value)
        fdata.append('email', document.querySelector('input[name="email"]').value)
        fdata.append('pass', document.querySelector('input[name="pass"]').value)

        let xhr = new XMLHttpRequest();
        fdata.append('token',TOKEN)
        xhr.open('POST', `${HOST}/user/`)
        xhr.send(fdata)
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    LoadPageChat()
                }
                if (xhr.status == 422) {
                    let response = JSON.parse(xhr.responseText)
                    alert(response.message)
                }
            }
        }

    })
}


/*Чат*/

function LoadPageChat () {
    _get ({url: '/modules/chat.html'}, function(responseText) {
        CONTENT.innerHTML = responseText
    })
}


function onLoadPageAuth(){
    document.querySelector('.btn-5').addEventListener('click', function(){
        _post({url: '/modules/entrance.html'}, function(responseText){
            CONTENT.innerHTML=responseText
             OnLoadPageAuth()
             LoadPageRegAuth()

        })
    })
}






/*Авторизация*/

function OnLoadPageAuth(){
    document.querySelector('.entrance').addEventListener('click', function() {
        let gdata = new FormData();
        gdata.append('email', document.querySelector('input[name="email"]').value)
        gdata.append('pass', document.querySelector('input[name="pass"]').value)
        
        let xhr = new XMLHttpRequest();
        gdata.append('token', TOKEN)
        xhr.open('POST', `${HOST}/auth/`)
        xhr.send(gdata)
        xhr.onreadystatechange = function() {
            if (xhr.status == 200) {
                LoadPageChat()
            }
            if (xhr.status == 401) {
                let response = JSON.parse(xhr.responseText)
                alert(response.message)
            }
        }
    })
}

function LoadPageRegAuth() {
    document.querySelector('.btn-6').addEventListener('click',LoadPageReg)
}







/* Выход из чата */

function LoadPageChat() {
    _get({ url: '/modules/chat.html' }, function(responseText) {
        CONTENT.innerHTML = responseText;

       
        document.querySelector('.logout').addEventListener('click', function() {
            
            TOKEN = ''; 
            LoadPageReg(`.registration.html`); 
        });
         clearMessage();
    });

    //очистка сообщения
    function clearMessage() {
    document.getElementById('entrance.html').textContent = '';
}
}











// 1. В функции LoadPageChat() добавим кнопку для открытия профиля
function LoadPageChat() {
    _get({ url: '/modules/chat.html' }, function(responseText) {
        CONTENT.innerHTML = responseText;

        // Добавим кнопку "Профиль" в чат
        const chatContainer = CONTENT;
        const profileBtn = document.createElement('button');
        profileBtn.textContent = 'Мой профиль';
        profileBtn.className = 'btn-profile'; // класс для стилизации
        chatContainer.appendChild(profileBtn);

        // Обработчик для кнопки "Мой профиль"
        profileBtn.addEventListener('click', showUserCard);

        // Обработчик выхода
        document.querySelector('.logout').addEventListener('click', function() {
            TOKEN = ''; 
            LoadPageReg(); 
        });
        
        // Очистка сообщений
        clearMessage();
    });

    function clearMessage() {
        document.getElementById('entrance.html').textContent = '';
    }
}

// 2. Функция для отображения карточки пользователя
function showUserCard() {
    _get({ url: '/modules/card.html' }, function(responseText) {
        CONTENT.innerHTML = responseText;

        // Предположим, что у вас есть текущий userId (например, из токена или глобальной переменной)
        const userId = '123'; // Замените на актуальный ID

        // Загрузим текущие данные пользователя
        _get({ url: `${HOST}/user/${userId}` }, function(userResponse) {
            const userData = JSON.parse(userResponse);
            document.querySelector('input[name="fam"]').value = userData.fam;
            document.querySelector('input[name="name"]').value = userData.name;
            document.querySelector('input[name="otch"]').value = userData.otch;
            document.querySelector('input[name="email"]').value = userData.email;
            // добавьте другие поля по необходимости
        });

        // Обработчик "Сохранить"
        document.querySelector('.save-profile').addEventListener('click', function() {
            const formData = new FormData(document.getElementById('userForm'));
            formData.append('token', TOKEN);
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `${HOST}/user/${userId}`);
            xhr.send(formData);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        alert('Профиль обновлен');
                        showUserCard(); // перезагрузить карточку с новыми данными
                    } else {
                        alert('Ошибка при сохранении профиля');
                    }
                }
            };
        });

        // Обработчик "Закрыть"
        document.querySelector('.close-card').addEventListener('click', function() {
            LoadPageChat(); // возвращаемся к чату
        });
    });
}














/*---------*/











































