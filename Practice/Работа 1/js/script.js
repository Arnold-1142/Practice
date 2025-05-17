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
    var HTTP_REQUEST = new XMLHttpRequest();
    HTTP_REQUEST.open('POST', `${params.url}`);
    HTTP_REQUEST.send(params.data);
    HTTP_REQUEST.onreadystatechange = function() {
        if(HTTP_REQUEST.readyState == 4) {
            callback(HTTP_REQUEST.responseText);
        }
    }
}

LoadPageAuth()


function LoadPageAuth () {
    _get ({url: '/modules/entrance.html'}, function(responseText) {
        CONTENT.innerHTML = responseText
    })
}

onLoadPageAuth()


function onLoadPageAuth() {
    document.querySelector('.entrance').addEventListener('click', function() {
        var request_data = new FormData();
        request_data.append('?', document.querySelector('input[name="?"]').value)
        request_data.append('?', document.querySelector('input[name="?"]').value)
        request_data.append('?', document.querySelector('input[name="?"]').value)
        request_data.append('?', document.querySelector('input[name="?"]').value)
    })
}




