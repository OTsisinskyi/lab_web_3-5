const nameInput = document.getElementById("name_input");
const lengthInput = document.getElementById("length_input");
const ticketInput = document.getElementById("ticket_input");
const itemsContainer = document.getElementById("items_container");
const totalValue = document.getElementById("totalValue");


const getItemId = (id) => `item-${id}`;

const itemTemplate = ({ id, name, length, ticket }) => `

<div id="${getItemId(id)}" class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Name: ${name}</h5>
              <p class="card-text">Length of tracks: ${length}m</p>
              <p class="card-text">Ticket price: ${ticket} UA</p>
            </div>
          </div>`

export const addItemToPage = ({ id, name, length, ticket }) => {
  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, name, length, ticket })
  );
}

export const clearInputs = () => {
  nameInput.value = "";
  lengthInput.value = "";
  ticketInput.value = "";
}

export const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item)
  }
};

export const getInputValues = () => {
  var myTextboxElem = nameInput;
  if (myTextboxElem.value !== "") {
    return {
      name: nameInput.value,
      length: lengthInput.value,
      ticket: ticketInput.value,
    };
  } else {
    alert("Fill in the field!");
  }
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