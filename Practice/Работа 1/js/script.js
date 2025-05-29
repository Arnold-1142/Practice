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
 _post({url: '/modules/chat.html'}, function(responseText){
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



/*
function logout() {
    TOKEN = ''; 
    LoadPageReg('.registration.html'); 
}


function setupLogout() {
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}



setupLogout();

function setupLogout() {
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            TOKEN = '';
           
        });
    }
}

*/




function LoadPageChat() {
    _get({ url: '/modules/chat.html' }, function(responseText) {
        CONTENT.innerHTML = responseText;

       
        document.querySelector('.logout').addEventListener('click', function() {
            
            TOKEN = ''; 
            LoadPageReg(`.registration.html`); 
        });
    });
}

































