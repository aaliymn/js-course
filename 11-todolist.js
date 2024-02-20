let todoList = [{
    name: "make dinner",
    dueDate: '04-07-2000'
},{
    name: "un-alive",
    dueDate: '04-03-2001'
}
];
const divItem = document.querySelector('.js-todo-item');
renderList();

function renderList() {
    divItem.innerHTML = "";
    for (let i = 0; i < todoList.length; i++) {
        const todo = todoList[i];
        // const name = todo.name;
        // const dueDate = todo.dueDate;
        const { name, dueDate } = todo;
        const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-button" onclick="
            todoList.splice(${i}, 1);
            renderList();
        " >Delete</button>
        `
        divItem.innerHTML += html;
     }
};

function addToList() {
    const input = document.querySelector(".js-todo-input");
    const name = input.value;
    const dateInputElement = document.querySelector('.js-date-input')
    const dueDate = dateInputElement.value;
    todoList.push({
        // name: name,
        // dueDate: dueDate
        name,
        dueDate
    });
    input.value = "";
    dateInputElement.value = "";
    renderList();
}