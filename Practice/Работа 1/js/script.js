const HOST = 'http://api-messenger.web-srv.local';
var TOKEN = '';
const CONTENT = document.querySelector('.content');

loadPageAuth();
function loadPageAuth(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/modules/entrance.html");
    xhr.send();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            CONTENT.innerHTML = xhr.responseText
            onLoadPageAuth()
        }
    }
}


