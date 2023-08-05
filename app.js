//Globals
const todoList = document.getElementById('todo-list');
let todos = [];
let users = [];

//attach events
document.addEventListener('DOMContentLoaded', initApp);

//basic logic
function getUserName(userId) {
    const user = users.find((user) => user.id === userId);
    return user.name;
}
function printTodo({ id, userId, title, complete }) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = id;
    li.innerHTML = `<span>${title} <i>by</i> <b>${getUserName(
        userId
    )}</b></span>`;
    todoList.prepend(li);
}

//Event logic
function initApp() {
    Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
        [todos, users] = values;

        //forward to layout
        todos.forEach((todo) => printTodo(todo));
    });
}

//async logic
async function getAllTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return data;
}

async function getAllUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
}
