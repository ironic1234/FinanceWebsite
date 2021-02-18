async function fetchTest() {
	let response = await fetch('http://192.168.1.179:4000/http://192.168.1.179:3000/data');
	let responseText = await getTextFromStream(response.body);

	document.body.innerHTML = responseText;
}

async function getTextFromStream(readableStream) {
	let reader = readableStream.getReader();
	let utf8Decoder = new TextDecoder();
	let nextChunk;

	let resultStr = '';

	while (!(nextChunk = await reader.read()).done) {
		let partialData = nextChunk.value;
		resultStr += utf8Decoder.decode(partialData);
	}

	return resultStr;
}

(async() => {
	await fetchTest();
})();


