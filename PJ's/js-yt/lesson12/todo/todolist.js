let listItems = JSON.parse(localStorage.getItem("listItems")) || [];
if (listItems.length === 0) {
  listItems = [
    { name: "kek", date: "08/28/2002" },
    { name: "kek2", date: "08/28/2002" },
  ];
} // list items are either stored locally or default value loaded
const submitBtn = document.querySelector(".js-submit");
const textInput = document.querySelector(".js-text-input");
const dateInput = document.querySelector(".js-date-input");
const todoList = document.querySelector(".js-todo-list");

renderList(); // Render current list

function renderList() {
  let listHTML = ""; //at the start of the function, html of the list is empty

  listItems.forEach((todo, index) => {
    const { name, date } = todo; //loop the array and add destruct them of name and date properties
    const html = `
    <div>${name}</div>
    <div>${date}</div>
    <button class="js-delete">Delete</button>`; //the new html for the array item
    listHTML += html; // add html
  });

  /*   for (let i = 0; i < listItems.length; i++) {
    //HTML for each item
    const todo = listItems[i];
    const html = `
    <div>${todo.name}</div>
    <div>${todo.date}</div>
    <button class="js-delete" onclick="
    listItems.splice(${i}, 1);
    saveToLocal();
    renderList();">Delete</button>`;
    listHTML += html; // create html
    console.log(todo);
    console.log(listHTML);
  } */
  todoList.innerHTML = listHTML; // edit html of div
  document.querySelectorAll(".js-delete").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      listItems.splice(index, 1);
      saveToLocal();
      renderList();
    });
  });
}
function addToList() {
  const currentInput = textInput.value; //Get current input value
  const currentDate = dateInput.value; //Get current date value
  if (currentInput && dateInput) {
    // Check if text box is not empy
    listItems.push({ name: currentInput, date: currentDate }); // Add current input to the items array.
    saveToLocal();
    textInput.value = ""; // Clear input box
    dateInput.value = ""; // Clear date input box
    renderList();
  } else {
    console.log("err: fields can not be left empty");
    alert("err: fields can not be left empty");
  }
}
function saveToLocal() {
  localStorage.setItem("listItems", JSON.stringify(listItems));
}

submitBtn.onclick = addToList;
