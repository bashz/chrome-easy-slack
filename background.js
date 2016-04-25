var slack = {}; // might be prototyped
chrome.storage.sync.get({
  token: "xoxp-xxxxx-xxxxx-xxxxx-xxxxxx"
}, function (items) {
  var token = items.token;
  console.log(token);
  var url = "https://slack.com/api/rtm.start?token=" + token; //token to be got from ouath
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var slackInfo = JSON.parse(xhr.responseText);
        slack.users = mapObjectById(slackInfo.users);
        slack.team = slackInfo.team;
        slack.channels = mapObjectById(slackInfo.channels);
        slack.ims = mapObjectById(slackInfo.ims);
        console.log(slackInfo);
        var ws = new WebSocket(slackInfo.url);
        ws.onopen = function () {
          console.log("Connected to slack");
        };
        ws.onmessage = function (message) {
          var msg = JSON.parse(message.data);
          console.log(msg);
          if (msg.type === "message") {
            var incomming = {
              team: slack.team.name,
              from: slack.users[msg.user].real_name,
              replyTo: slack.users[msg.user].name,
              on: function () {
                if (slack.ims[msg.channel]) {
                  return slack.user[msg.channel.id].name;
                } else if (slack.channels[msg.channel]) {
                  return slack.channels[msg.channel].name;
                } else {
                  return "default";
                }
              },
              at: new Date(Math.round(msg.ts * 1000)),
              body: msg.text
            };
              // Must implement a selfreply break loop
              // Better map tabs with ready state on a lifo style
              // Must implement queue to not erase pseudo simultanious messages
              // Might also concat multi unresponded message of same user
              chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, incomming, function (response) {
                  console.log(response); // Response is not needed yet
                });
              });
          }
        };
      }
      else
        console.error("Error while trying to connect to slack");
    }
  };
  try {
    xhr.send(null);
  } catch (e) {
    console.error("XHR failed for " + url + ", " + e);
  }
});
function mapObjectById(arrayOfObjects) {
  var mappedObjects = [];
  arrayOfObjects.forEach(function (object) {
    if (object.id) {
      mappedObjects[object.id] = object;
    } else {
      console.log(object);
      console.log('Object above do not have id');
    }
  })
  return mappedObjects;
}