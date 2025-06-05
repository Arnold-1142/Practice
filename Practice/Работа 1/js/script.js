const HOST = 'http://api-messenger.web-srv.local';
var TOKEN = '';
const CONTENT = document.querySelector('.content');


function _get(params, callback) {
    var HTTP_REQUEST = new XMLHttpRequest();
    HTTP_REQUEST.open('GET', `${params.url}`);
    HTTP_REQUEST.setRequestHeader('Authorization', 'Bearer ' + TOKEN);
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
    HTTP_REQUEST.setRequestHeader('Authorization', 'Bearer ' + TOKEN);
    HTTP_REQUEST.send(params.data);
    HTTP_REQUEST.onreadystatechange = function() {
        if(HTTP_REQUEST.readyState == 4) {
            callback(HTTP_REQUEST.responseText);
        }
    }
}


LoadPageAuth()



//#region Регистрация
function LoadPageReg(){
    _post({url: '/modules/registration.html'}, function(responseText){
        CONTENT.innerHTML=responseText
        onloadPageRegister()
    })
}

function onloadPageRegister() {
    document.querySelector('.btn-register').addEventListener('click', function() {
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

    document.querySelector('.btn-go-auth').addEventListener('click', LoadPageAuth)
}

//#endregion

//#region  Авторизация*/
function LoadPageAuth() {
    _post({url: '/modules/entrance.html'}, function(responseText){
        CONTENT.innerHTML=responseText
        OnLoadPageAuth()
    })
}


function OnLoadPageAuth(){
    document.querySelector('.btn-auth').addEventListener('click', function() {
        let gdata = new FormData();
        gdata.append('email', document.querySelector('input[name="email"]').value)
        gdata.append('pass', document.querySelector('input[name="pass"]').value)
        
        let xhr = new XMLHttpRequest();
        gdata.append('token', TOKEN)
        xhr.open('POST', `${HOST}/auth/`)
        xhr.send(gdata)
        xhr.onreadystatechange = function() {
            if (xhr.status == 200) {
                if (xhr.readyState == 4) {
                    LoadPageChat(JSON.parse(xhr.responseText).Data)
                }
            }
            if (xhr.status == 401) {
                let response = JSON.parse(xhr.responseText)
                alert(response.message)
            }
        }
    })

    document.querySelector('.btn-go-register').addEventListener('click', LoadPageReg)
}

//#endregion

//#region  Чат*/

function LoadPageChat (userdata) {   
    _get ({url: '/modules/chat.html'}, function(responseText) {
        CONTENT.innerHTML = responseText
        onLoadPageChat()
    })
}



/* Выход из чата */
function onLoadPageChat(){
    document.querySelector('.user').addEventListener('click', function() {
        document.querySelector('.user-block').classList.toggle('hidden')
    });

      const logoutBtn = document.querySelector('.user-block-footer .logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            
            TOKEN = '';
            
            LoadPageAuth();
        });
    }

document.querySelector('.user-block-footer .logout').addEventListener('click', function() {
    TOKEN = ''; 
    LoadPageAuth(); 
});








}













/*
// Функция для получения списка чатов пользователя
async function fetchChats() {
  const url = `${HOST}/chats/`; // URL для получения списка чатов

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Добавьте авторизационный токен, если требуется
        // 'Authorization': `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка при получении чатов: ${response.status}`);
    }

    const chats = await response.json();

    // Обработка полученных данных
    console.log('Полученные чаты:', chats);

    // Например, отображение списков в интерфейсе
    const chatsContainer = document.querySelector('.table');
    if (chatsContainer) {
      chatsContainer.innerHTML = ''; // Очистить текущий список
      chats.forEach(chat => {
        const chatDiv = document.createElement('div');
        chatDiv.className = 'table-1';

        // Создаем изображение аватара
        const img = document.createElement('img');
        img.src = chat.companion_photo_link || '/img/default-avatar.png'; // путь по умолчанию, если нет фото
        img.alt = 'Аватар';

        // Создаем название чата
        const p = document.createElement('p');
        p.textContent = chat.chat_name;

        chatDiv.appendChild(img);
        chatDiv.appendChild(p);

        // Можно добавить обработчик клика по чату для открытия переписки
        chatDiv.addEventListener('click', () => {
          openChat(chat.chat_id, chat.chat_name);
        });

        chatsContainer.appendChild(chatDiv);
      });
    }

    // Запуск отслеживания новых сообщений (например, через polling)
    startPollingForNewMessages();

  } catch (error) {
    console.error('Ошибка при получении списков чатов:', error);
  }
}

// Функция для открытия конкретного чата (пример)
function openChat(chatId, chatName) {
  console.log(`Открытие чата ${chatId}: ${chatName}`);
  // Реализуйте логику открытия выбранного чата
}

// Функция для периодической проверки новых сообщений (пример)
function startPollingForNewMessages() {
  setInterval(() => {
    checkForNewMessages();
  }, 10000); // каждые 10 секунд
}

// Функция для проверки новых сообщений (пример)
async function checkForNewMessages() {
  // Реализуйте запрос к API для получения новых сообщений или обновления статуса
  console.log('Проверка новых сообщений...');
  // Можно обновлять статус last_message или отображать новые сообщения в интерфейсе
}

// Вызов функции при загрузке страницы или по необходимости
fetchChats();


*/

























/* 

// Функция для получения списка чатов
function LoadChats() {
    _get({ url: `${HOST}/modules/chat.html/` }, function(responseText) {
        try {
            const chats = JSON.parse(responseText);
            displayChatList(chats);
        } catch (e) {
            console.error('Ошибка списка чатов:', e);
        }
    });
}

// Функция для отображения списка чатов ghbdtn
function displayChatList(chat) {
    const chatContainer = document.querySelector('.chats'); // предполагается, что есть контейнер для списков
    if (!chatContainer) return;

    chatContainer.innerHTML = ''; // очищаем текущий список

    chats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';

        // Создаем структуру элемента
        chatItem.innerHTML = `
            <div class="chat-photo">
                <img src="${chat.companion_photo_link || '/files/photos/default_men.png'}" alt="Фото" width="50" height="50"/>
            </div>
            <div class="chat-info">
                <div class="chat-name">${chat.chat_name}</div>
                <div class="last-message">Последнее сообщение: ${chat.chat_last_message}</div>
                <div class="companion-name">${chat.companion_fam} ${chat.companion_name} ${chat.companion_otch}</div>
            </div>
        `;
        // Можно добавить обработчик клика по чату
        chatItem.addEventListener('click', () => {
            // Тут можно открыть выбранный чат
            console.log('Открыть чат:', chat.chat_id);
            // например, вызвать функцию для загрузки сообщений этого чата
        });
        chatContainer.appendChild(chatItem);
    });
}



// Вызовем загрузку списков чатов после входа в чат или авторизации
// Например, после успешной авторизации:
function LoadPageChat(userdata) {   
    _get({ url: '/modules/chat.html' }, function(responseText) {
        CONTENT.innerHTML = responseText;
        onLoadPageChat();

        // После загрузки страницы чата, получим список чатов
        LoadChats();

        // Можно установить периодический вызов для обновления списка
        setInterval(LoadChats, 30000); // обновлять каждые 30 секунд 
    });
}

*/






//#endregion



























/* 

// Функция для получения списка чатов пользователя
function fetchChats() {
    _get({ url: `${HOST}/chats/` }, function(responseText) {
        try {
            const chats = JSON.parse(responseText);
            displayChats(chats);
            // Запускаем отслеживание новых сообщений
            trackChatMessages(chats);
        } catch (e) {
            console.error('Ошибка парсинга чатов:', e);
        }
    });
}

// Функция для отображения списка чатов
function displayChats(chats) {
    const chatContainer = document.querySelector('.chat-list'); // предполагается, что есть контейнер для чатов
    if (!chatContainer) return;

    chatContainer.innerHTML = ''; // очищаем текущий список

    chats.forEach(chat => {
        const chatElement = document.createElement('div');
        chatElement.className = 'chat-item';
        chatElement.dataset.chatId = chat.chat_id;

        // Формируем содержимое элемента
        chatElement.innerHTML = `
            <img src="${chat.companion_photo_link || '/files/photos/default_men.png'}" alt="Фото" class="chat-photo" />
            <div class="chat-info">
                <div class="chat-name">${chat.chat_name}</div>
                <div class="chat-last-message">Последнее сообщение: ${chat.chat_last_message}</div>
                <div class="chat-companion">${chat.companion_fam} ${chat.companion_name} ${chat.companion_otch}</div>
            </div>
        `;
        // Можно добавить обработчик клика по чату
        chatElement.addEventListener('click', () => {
            openChat(chat.chat_id);
        });
        chatContainer.appendChild(chatElement);
    });
}

// Функция для открытия конкретного чата (пример)
function openChat(chatId) {
    console.log('Открыть чат:', chatId);
    // Реализуйте открытие выбранного чата
}

// Объект для хранения последнего времени сообщений по чатам
const lastMessageTimes = {};

// Функция для отслеживания новых сообщений в чатах
function trackChatMessages(chats) {
    // Обновляем lastMessageTimes при первом получении
    chats.forEach(chat => {
        lastMessageTimes[chat.chat_id] = new Date(chat.chat_last_message).getTime();
    });

    // Запускаем периодический опрос каждые 10 секунд (или другой интервал)
    setInterval(() => {
        _get({ url: `${HOST}/chats/` }, function(responseText) {
            try {
                const updatedChats = JSON.parse(responseText);
                updatedChats.forEach(chat => {
                    const lastMsgTime = new Date(chat.chat_last_message).getTime();
                    if (lastMsgTime > lastMessageTimes[chat.chat_id]) {
                        // Есть новое сообщение
                        lastMessageTimes[chat.chat_id] = lastMsgTime;
                        // Обновляем отображение конкретного чата или показываем уведомление
                        updateChatItem(chat);
                    }
                });
            } catch (e) {
                console.error('Ошибка при отслеживании сообщений:', e);
            }
        });
    }, 10000); 
}

// Обновление конкретного элемента чата при новом сообщении
function updateChatItem(chat) {
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        if (item.dataset.chatId === chat.chat_id) {
            // Обновляем информацию о последнем сообщении и времени
            item.querySelector('.chat-last-message').textContent = `Последнее сообщение: ${chat.chat_last_message}`;
            // Можно добавить визуальный эффект уведомления или выделения
            item.classList.add('new-message');
            setTimeout(() => item.classList.remove('new-message'), 3000);
        }
    });
}


*/

