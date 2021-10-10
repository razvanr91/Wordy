// Get all buttons
let addWordButton = document.getElementById("add");
let searchWordButton = document.getElementById("search");
let deleteWordButton = document.getElementById("delete");
let displayAllButton = document.getElementById("displayAll");

// Get word input
let wordInput = document.getElementById("word");

// Other relevant elements
let tableDiv = document.getElementById("tableDiv");

let toastAlert = document.getElementById("toast-alert");
let toastMessage = document.getElementById("toast-message");
var toastLive = document.getElementById("liveToast");

function generateToast(alert, message, className) {
	toastLive.removeAttribute("class");
	toastLive.classList.add("toast", "text-white");
	toastLive.classList.add(className);
	let toast = new bootstrap.Toast(toastLive);
	toastAlert.innerHTML = alert;
	toastMessage.innerHTML = message;
	toast.show();
}

addWordButton.addEventListener("click", () => {
	let word = wordInput.value;
	addWord(word);
	wordInput.value = "";
});

searchWordButton.addEventListener("click", () => {
	// if (searchForWord(wordInput.value) !== false) {
	// 	alert("Word exists!");
	// }
	if (searchForWord(wordInput.value)) {
		generateToast(
			"Word exists",
			`I was able to find "${wordInput.value}" in your dictionary.`,
			"bg-success"
		);
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
		generateToast(
			"Word added",
			`${word} was successfully added to the dictionary!`,
			"bg-success"
		);
		return;
	}

	return generateToast(
		"Word exists",
		`The word "${wordInput.value}" already exists in your dictionary.`,
		"bg-danger"
	);
}

function deleteWords() {
	localStorage.clear();
}

function searchForWord(word) {
	if (word === "") {
		return generateToast(
			"Empty dictionary",
			"Please add some words before searching for one...",
			"bg-warning"
		);
	}

	for (let i = 0; i < localStorage.length; i++) {
		let result = localStorage.getItem(localStorage.key(i)).toLowerCase();

		if (result === word.toLowerCase()) {
			let resultObject = {
				key: localStorage.key(i).toString(),
				value: result,
			};
			return resultObject;
		}
	}
	generateToast(
		"Word does not exist",
		`I was unable to find "${word}" in your dictionary.`,
		"bg-warning"
	);
	return false;
}

function deleteWord(word) {
	if (word === "") return alert("You need to enter a word first!");

	let wordToBeDeleted = searchForWord(word);

	if (wordToBeDeleted.value === word) {
		localStorage.removeItem(wordToBeDeleted.key);
		return generateToast(
			"Word deleted!",
			`Word ${word} has been deleted successfully.`,
			"bg-success"
		);
	}

	return generateToast(
		"Something went wrong...",
		`The word "${word}" does not seem to exist in the dictionary.`,
		"bg-danger"
	);
}

function displayAllWords() {
	let table = document.createElement("table");
	table.classList.add("table", "table-striped");
	// let cellNumber = (localStorage.length % 2 === 0) ? ;
	let cellNumber = 0;
	let tr = table.insertRow();
	for (let i = 0; i < localStorage.length; i++) {
		let td = tr.insertCell();
		td.appendChild(document.createTextNode(localStorage.getItem(localStorage.key(i))));
	}

	let h4 = document.createElement("h4");
	h4.innerHTML = "Here is a list of all the words you have in your dictionary : ";
	tableDiv.appendChild(h4);

	tableDiv.appendChild(table);
}

function randomGenerator() {
	return Math.floor(Math.random() * 10000000 + 1);
}
