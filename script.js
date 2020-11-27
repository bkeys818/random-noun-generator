var words
(async () => {
	let response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt");
	let txt = await response.text();
    let results	= await txt.split("\n");
	return results
})().then(results=>{
	words = results
})

var nouns = []

class Noun {
	constructor(word) {
		this.text = word;
    }
    

	async loadImage() {
    	const parameters = {
	        key: "19185430-0ca8ecbb0c60d76842e868b06",
	        safesearch: true,
	        per_page: 3,
	        q: encodeURIComponent(this.text)
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
        try {
		let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        let json = await response.json();
		// if word doesn't exist in dictionary, resturn false
		if (json["title"] == "No Definitions Found") { return false;}
	    // search all the exisiting meanings to see if any of them are a noun
		        // for (let meaning of json[0].meanings) {
                    // console.log(json)
			if (json[0].meanings[0].partOfSpeech == "noun") return true;
		        // }
        // if nothing is returned by now, words exist, but isn't a noun
        return false
        } catch (err) {
            return false
        }
	};
}

async function findNouns(n = 1) {
	let originalCount = nouns.length
    do {
        let randomWord = words[
            Math.floor(Math.random() * words.length)
        ];
        if (await Noun.isNoun(randomWord)) {
			nouns.push(new Noun(randomWord))
        }
    } while (nouns.length - originalCount < n);
}


$('#submit-btn').click(function() {
    nouns = []
    findNouns($('#noun-count').val()).then(()=>{
        for (noun of nouns) {
            console.log(noun.text)
            let row = $('<tr></tr>')
            row.append([
                $('<td></td>').addClass('noun').text(noun.text),
                $('<td></td>').addClass('img')
            ]);
            $('#noun-table').append(row)
        }
    });
});