const fetch = require("node-fetch");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class App {
    static words = [];
    static nouns = [];
    static async getWords() {
        let response = await fetch(
            "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt"
        );
        let txt = await response.text();
        App.words = await txt.split("\n");
    }
    static async findNouns(n = 1) {
        let originalCount = 0;
        do {
            let randomWord = this.words[
                Math.floor(Math.random() * this.words.length)
            ];
            let isNoun = (async () => {
                let response = await fetch(
                    `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
                );
                let json = await response.json();
                if (json["title"] == "No Definitions Found") {
                    return false;
                } else {
                    for (let meaning in json[0].meanings) {
                        if (meaning[0].partOfSpeech == "noun") return true;
                    }
                }
            })();
            if (isNoun) this.nouns.push(randomWord);
        } while (this.nouns.length - originalCount < n);
    }
}


// App.getWords().then(() => {
//     App.findNouns(2).then(() => {

//     });
// });


static async function getImageURL(search) {
    const parameters = {
        key: "19185430-0ca8ecbb0c60d76842e868b06",
        safesearch: true,
        per_page: 3,
        q: encodeURIComponent(search)
    };
    var url = new URL("https://pixabay.com/api/?key");
    for (let key of Object.keys(parameters)) { url.searchParams.set(key, parameters[key]); }
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.responseText);
            console.log(data.hits[0].webformatURL)
            return data.hits[0].webformatURL;
        } else {
            console.error(this.responseText);
        }
    };
    request.send();
}