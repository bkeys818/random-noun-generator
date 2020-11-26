var words = [];
var nouns = [];
async function fetchWords() {
	let response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt");
	let txt = await response.text();
    let results	= await txt.split("\n");
	return results
};

class Noun {
	
	constructor(word) {
		this.word = word;
	}
	
	async loadImage() {
    	const parameters = {
	        key: "19185430-0ca8ecbb0c60d76842e868b06",
	        safesearch: true,
	        per_page: 3,
	        q: encodeURIComponent(this.word)
    	};
    	var url = new URL("https://pixabay.com/api/?key");
    	for (let key of Object.keys(parameters)) {
			url.searchParams.set(key, parameters[key]);
		}
		
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
	
}

async function findNouns(n = 1) {
	let originalCount = nouns.length
    do {
        let randomWord = words[
            Math.floor(Math.random() * words.length)
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
        if (isNoun) {
			nouns.push(new Noun(randomWord))
        }
    } while (nouns.length - originalCount < n);
}
fetchWords()
	.then((fetchedWords) => {
		words = fetchedWords
	});
		
$('button').click(function() {
	console.log('clicked')
	findNouns().then(() => {
		console.log(noun[0].word)
		$('#noun').text(noun[0].word)
	})
});

