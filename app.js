// Get all buttons
let addWordButton = document.getElementById("add");
let searchWordButton = document.getElementById("search");
let deleteWordButton = document.getElementById("delete");
let displayAllButton = document.getElementById("displayAll");

// Get word input
let wordInput = document.getElementById("word");

addWordButton.addEventListener("click", () => {
	let word = wordInput.value;
	addWord(word);
	wordInput.value = "";
});

searchWordButton.addEventListener("click", () => {
	if (searchForWord(wordInput.value) !== false) {
		alert("Word exists!");
	}
	wordInput.value = "";
});

deleteWordButton.addEventListener("click", () => {
	deleteWord(wordInput.value);
	wordInput.value = "";
});

displayAllButton.addEventListener("click", () => {
	displayAllWords();
});

function addWord(word) {
	if (!searchForWord(word)) {
		localStorage.setItem(randomGenerator(), word);
		return;
	}

	return alert("Word already exists!");
}

function deleteWords() {
	localStorage.clear();
}

function searchForWord(word) {
	if (word === "") {
		return alert("The dictionary is empty!");
	}

	for (let i = 0; i < localStorage.length; i++) {
		let result = localStorage.getItem(localStorage.key(i)).toLowerCase();

		if (result === word.toLowerCase()) {
			console.log(localStorage.key(i));
			return {
				key: localStorage.key(i).toString(),
				value: result,
			};
		}
	}
	return false;
}

function deleteWord(word) {
	if (word === "") return alert("You need to enter a word first!");

	let wordToBeDeleted = searchForWord(word);

	if (wordToBeDeleted !== false) {
		localStorage.removeItem(wordToBeDeleted.key);
		console.log(wordToBeDeleted.value, wordToBeDeleted.key);
		return "Word was successfully deleted!";
	}

	return alert("There is no such word in the dictionary!");
}

function displayAllWords() {
	let wordObjects = [];

	for (let i = 0; i < localStorage.length; i++) {
		wordObjects.push(localStorage.getItem(localStorage.key(i)));
	}

	console.log(wordObjects);

    document.getElementsByTagName()
}

function randomGenerator() {
	return Math.floor(Math.random() * 10000000 + 1);
}
