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

//АВТОРИЗАЦИЯ
 _get({ url: '/modules/entrance.html' }, function (responseText) {
    CONTENT.innerHTML = responseText;
    _elem('.go-register').addEventListener('click', function () {
        _load('/modules/registration.html', function (responseText) {
            CONTENT.innerHTML = responseText;

            _elem('.register').addEventListener('click', function () {


                let rdata = new FormData()


                rdata.append('first_name', _elem('input[name="first_name"]').value)
                rdata.append('last_name', _elem('input[name="last_name"]').value)
                rdata.append('email', _elem('input[name="email"]').value)
                rdata.append('password', _elem('input[name="password"]').value)

                _post({ url: `${HOST}/registration`, data: rdata }, function (responseText) {
                    responseText = JSON.parse(responseText)
                    console.log(responseText);
                    if (responseText.success) {
                        token = responseText.token
                        console.log(token)
                        _load('/modules/profile.html', function (responseText) {
                            CONTENT.innerHTML = responseText
                        })
                    }

                })
            })
        })

    })

 



  _elem('.chat').addEventListener('click', function () {
        let edata = new FormData()
        let email = _elem('input[name="email"]').value
        let password = _elem('input[name="password"]').value
        edata.append('email', email)
        edata.append('password', password)
  _post({ url: `${HOST}/chat`, data: edata }, function (responseText) {
            responseText = JSON.parse(responseText)
            console.log(responseText);
            if (responseText.success) {
                token = responseText.token
                console.log(token)
  _load('/modules/profile.html', function (responseText) {
                CONTENT.innerHTML = responseText

  _elem('.btn-upload-file').addEventListener('click', function () {
  _get({ url: `/modules/upload.html` }, function (responseText) {
            CONTENT.innerHTML = responseText

  _elem('.upload-files').addEventListener('click', function () {

            })

  _elem('.btn-to-disk').addEventListener('click', function () {
  _get({ url: `/modules/profile.html` }, function (responseText) {
            CONTENT.innerHTML = responseText
                                })
                            })
                        })
                    })

                })
            }
            else {
                alert("login failed")
            }

        })

    })


 })


_get({ url: `/modules/logout` }, function(responseText){
    CONTENT.innerHTML = responseText
 })


_post({ url: `${HOST}/upload`, data: rdata }, function (responseText){
   responseText = JSON.parse(responseText)
})

const path = require('node: path');
path.basename('C:\\temp\\profile.html')


// _delete(modules/upload.html)


_get({url:`${HOST}/disk`, data: adata}, function (responseText){
    filesTable = JSON.parse(responseText)
})

