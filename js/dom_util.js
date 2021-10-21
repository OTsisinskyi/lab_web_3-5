const nameInput = document.getElementById("name_input");
const lengthInput = document.getElementById("length_input");
const ticketInput = document.getElementById("ticket_input");
const itemsContainer = document.getElementById("items_container");
const totalValue = document.getElementById("totalValue");

export const EDIT_BUTTON_PREFIX = "edit-button-";
export const DELETE_BUTTON_PREFIX = "delete_button-";

const getItemId = (id) => `item-${id}`;

const itemTemplate = ({ id, name, length, ticket }) => `
<div id="${getItemId(id)}" class="card" style="width: 14rem;">
						<div class="card-body">
							<h5 class="card-title">Name: ${name}</h5>
							<p class="card-text">Length of tracks: ${length}m</p>
							<p class="card-text">Ticket price: ${ticket} UA</p>
							<div class="card-button">
							<button id="${EDIT_BUTTON_PREFIX}${id}" class="edit-button btn btn-primary mt-4">Edit</button>
							<button id="${DELETE_BUTTON_PREFIX}${id}"class=" delete_button btn btn-danger mt-4">Delete</button>
							</div>
						</div>
					</div>`

export const addItemToPage = ({ id, name, length, ticket }, onEdit, onDelete) => {
	itemsContainer.insertAdjacentHTML(
		"afterbegin",
		itemTemplate({ id, name, length, ticket })
	);

	const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);
	editButton.addEventListener("click", onEdit);

	const deleteButton = document.getElementById(`${DELETE_BUTTON_PREFIX}${id}`);
	deleteButton.addEventListener("click", onDelete);
}

export const clearInputs = () => {
	nameInput.value = "";
	lengthInput.value = "";
	ticketInput.value = "";
}

export const renderItemsList = (items, onEdit, onDelete) => {
	itemsContainer.innerHTML = "";

	for (const item of items) {
		addItemToPage(item, onEdit, onDelete)
	}
};

export const getInputValues = () => {
	return {
		name: nameInput.value,
		length: lengthInput.value,
		ticket: ticketInput.value,
	};
};

export const sortItems = ({ parks, property }) => {
	function sortLength(property) {
		if (property == "length") {
			parks.sort((a, b) => b.length - a.length);
		}
	}
	function sortTicket(property) {
		if (property == "ticket") {
			parks.sort((a, b) => b.ticket - a.ticket);
		}
	}

	if (property == "length") {
		sortLength(property);
	} else {
		sortTicket(property);
	}
	itemsContainer.innerHTML = ""
	renderItemsList(parks)
}

export const countLengthOfParks = ({ parks, property }) => {
	totalValue.innerHTML = "";
	const totalValues = parks.reduce((sum, current) => {
		if (property === "length") {
			return parseInt(sum, 10) + parseInt(current.length, 10)
		}
		if (property === "ticket") {
			return parseInt(sum, 10) + parseInt(current.ticket, 10)
		}
	}, 0)

	totalValue.innerHTML = totalValues;
}