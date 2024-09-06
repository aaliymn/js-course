let listItems = [{ name: "kek", date: "2024-09-13" }];
const submitBtn = document.querySelector(".js-submit");
const textInput = document.querySelector(".js-text-input");
const dateInput = document.querySelector(".js-date-input");
const todoList = document.querySelector(".js-todo-list");

renderList(); // Render current list

function renderList() {
  let listHTML = "";

  for (let i = 0; i < listItems.length; i++) {
    //HTML for each item
    const todo = listItems[i];
    const html = `<p>
    ${todo.name}, ${todo.date}
    <button onclick="
    listItems.splice(${i}, 1);
    renderList();">Delete</button></p>`;
    listHTML += html; // create html
    console.log(todo);
    console.log(listHTML);
  }
  todoList.innerHTML = listHTML; // edit html of div
}
function addToList() {
  const currentInput = textInput.value; //Get current input value
  const currentDate = dateInput.value; //Get current date value
  if (currentInput && dateInput) {
    // Check if text box is not empy
    listItems.push({ name: currentInput, date: currentDate }); // Add current input to the items array.
    textInput.value = ""; // Clear input box
    renderList();
  } else {
    console.log("err: fields can not be left empty");
    alert("err: fields can not be left empty");
  }
}

submitBtn.onclick = addToList;
