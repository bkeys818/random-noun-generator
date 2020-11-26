const words = (async () => {
	let response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt");
	let txt = await response.text();
    let results	= await txt.split("\n");
	return results
    })();