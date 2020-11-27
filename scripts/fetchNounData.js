var nouns = []
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


	static async isNoun(word) {
		let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
		let json = await response.json();
		// if word doesn't exist in dictionary, resturn false
		if (json["title"] == "No Definitions Found") { return false;}
		// search all the exisiting meanings to see if any of them are a noun
		for (let meaning in json[0].meanings) {
			if (meaning[0].partOfSpeech == "noun") return true;
		}
		// if nothing is returned by now, words exist, but isn't a noun
		return false
	};
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
			)
			let json = await response.json();
            if (json["title"] == "No Definitions Found") {
                return false;
            } else {
				console.log(json)
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

async function findNouns(n = 1) {
	let randomWord = words[
		Math.floor(Math.random() * words.length)
	];
	Noun.isNoun(randomWord).then(isNoun=>{
		return isNoun
	});
}