import {
	getInputValues,
	clearInputs,
	renderItemsList,
	sortItems,
	countLengthOfParks,
	EDIT_BUTTON_PREFIX,
	DELETE_BUTTON_PREFIX
} from "./dom_util.js";

import {
	getAllParks,
	postPark,
	editPark,
	deletePark,
} from "./api.js";


const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const sortProperty = document.getElementById("property_sorting");
const DECS_button = document.getElementById("DESC_button");
const totalValues = document.getElementById("property_total_value");

const nameInput = document.getElementById("name_input");
const lengthInput = document.getElementById("length_input");
const ticketInput = document.getElementById("ticket_input");

let parks = [];

const onEdit = async (e) => {
	const itemId = e.target.id.replace(EDIT_BUTTON_PREFIX, "");
	const { name, length, ticket } = getInputValues();

	clearInputs();

	editPark(itemId, { name, length, ticket }).then(refetchAllParks);
};

const onDelete = (element) => {
	const id = element.target.id.replace(DELETE_BUTTON_PREFIX, "");
	deletePark(id).then(refetchAllParks);
};

const refetchAllParks = async () => {
	const AllParks = await getAllParks();

	parks = AllParks;
	renderItemsList(parks, onEdit, onDelete);
};

submitButton.addEventListener("click", (event) => {
	event.preventDefault();

	let invalidSymbols = ["`", "?", "!", ";", "#", "@", "%", "~", "&", "$", "№", "<", ">", "/", "\\", "*", "₴"];
	if (nameInput.value == 0) {
		alert("Введіть назву парку!")
	}
	else if (lengthInput.value == 0) {
		alert("Введіть довжину доріжок!")
	}
	else if (ticketInput.value == "") {
		alert("Введіть ціну білету!")
	}
	else if (invalidSymbols.some(symbol => nameInput.value.includes(symbol))) {
		alert("Сторонні символи у назві парку!")
	}
	else if (isNaN(lengthInput.value)) {
		alert("Довжина парку повинна бути числом");
	}
	else if (isNaN(ticketInput.value)) {
		alert("Вартість білету повинна бути числом");
	}
	else {
		const { name, length, ticket } = getInputValues();
		clearInputs();
		postPark({
			name,
			length,
			ticket,
		}).then(refetchAllParks);
	}
});

findButton.addEventListener("click", () => {
	const foundParks = parks.filter(park => park.name.search(findInput.value) !== -1);
	renderItemsList(foundParks, onEdit, onDelete);
});

cancelFindButton.addEventListener("click", () => {
	renderItemsList(parks, onEdit, onDelete);
	findInput.value = "";
});

sortProperty.addEventListener("change", () => {
	sortItems({ parks, property: sortProperty.value });
});

DECS_button.addEventListener("click", () => {
	parks = parks.reverse();
	renderItemsList(parks, onEdit, onDelete);
});

totalValues.addEventListener("change", () => {
	countLengthOfParks({ parks, property: totalValues.value })
});


refetchAllParks();
