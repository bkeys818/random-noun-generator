const fetch = require("node-fetch");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class App {}
const search = ''
const parameters = {
  "key" : "19185430-0ca8ecbb0c60d76842e868b06",
  "safesearch" : true,
  "per_page" : 3,
  "q" : encodeURIComponent(search)
}
var url = new URL('https://pixabay.com/api/')
for (key of Object.keys(parameters)) {
  url.searchParams.set(key, parameters[key])
}

var request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var data = JSON.parse(this.responseText);
    console.log(data.hits[0].webformatURL)
  } else {
    // We reached our target server, but it returned an error
    console.log(this.responseText)
  }
};

request.onerror = function() {
  // There was a connection error of some sort
  console.log('connection error')
};

request.send();




function processData(data) {
  console.log(data)
}

function handler() {
  if(this.status == 200 &&
    this.responseXML != null &&
    this.responseXML.getElementById('test').textContent) {
    // success!
    processData(this.responseXML.getElementById('test').textContent);
  } else {
    // something went wrong
    …
  }
}

var client = new XMLHttpRequest();
client.onload = handler;
client.open("GET", "unicorn.xml");
client.send();