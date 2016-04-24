var chat = document.createElement('div');
chat.setAttribute('style', 'display: none');
var from = document.createElement('b');
var body = document.createElement('p');
body.setAttribute('style', 'display: inline');
var reply = document.createElement('input');
reply.setAttribute('data-target', 'null');
reply.setAttribute('type', 'text');
var form = document.createElement('form');
var doc = document.getElementsByTagName('body')[0];
doc.appendChild(chat);
chat.appendChild(from);
chat.appendChild(body);
form.appendChild(reply);
chat.appendChild(form);
// Might attach submit event dynamically here
// Might give self namespace id and class acompanied with css insjection to make integration easier

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chat.setAttribute('style', 'display: block; position: fixed; top: 0; left: 0; width: 100%; height: 60px; background: #ddd; z-index: 99999');
  from.appendChild(document.createTextNode(request.from + ' : '));
  body.appendChild(document.createTextNode(request.body));
  reply.setAttribute('data-target', request.replyTo);
  reply.focus();
  form.onsubmit = function () {// Must get token from oauth
    chrome.storage.sync.get({
      token: "xoxp-xxxxx-xxxxx-xxxxx-xxxxxx"
    }, function (items) {
      var token = items.token;
      var url = "https://slack.com/api/chat.postMessage?token=" + token + "&channel=%40" + request.replyTo + "&text=" + reply.value + "&as_user=true&pretty=1";
      var xhr = new XMLHttpRequest();
      console.log(url);
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            chat.style.display = "none";
          } else
            console.error("Error when trying to respond.");
        }
      };
      try {
        xhr.send(null);
      } catch (e) {
        console.error("XHR failed for " + url + ", " + e);
      }
    });
    return false;
  };
  sendResponse({response: "done"}); // Might be needed in futur
});