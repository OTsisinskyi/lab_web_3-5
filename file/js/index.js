import {
    getInputValues,
    addItemToPage,
    clearInputs,
    renderItemsList,
    sortItems,
    countLengthOfParks,
  } from "./dom_util.js";
  
  const submitButton = document.getElementById("submit_button");
  const findButton = document.getElementById("find_button");
  const cancelFindButton = document.getElementById("cancel_find_button");
  const findInput = document.getElementById("find_input");
  const sortProperty = document.getElementById("property_sorting");
  const DECS_button = document.getElementById("DESC_button");
  const totalValues = document.getElementById("property_total_value");
  
  
  let parks = [];
  
  const addItem = ({ name, length, ticket }) => {
    const generatedId = uuid.v1();
  
    const newItem = {
      id: generatedId,
      name,
      length,
      ticket
    };
    parks.push(newItem);
    addItemToPage(newItem);
  };
  
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const { name, length, ticket } = getInputValues();
    clearInputs();
    addItem({
      name,
      length,
      ticket,
    });
  });
  
  findButton.addEventListener("click", () => {
    const foundParks = parks.filter(park => park.name.search(findInput.value) !== -1);
  
    renderItemsList(foundParks);
  });
  
  cancelFindButton.addEventListener("click", () => {
    renderItemsList(parks);
    findInput.value = "";
  });
  
  sortProperty.addEventListener("change", () => {
    sortItems({ parks, property: sortProperty.value });
  });
  
  DECS_button.addEventListener("click", () => {
    parks = parks.reverse();
    renderItemsList(parks);
  });
  
  totalValues.addEventListener("change", () => {
    countLengthOfParks({ parks, property: totalValues.value })
  });
  
  renderItemsList(parks);