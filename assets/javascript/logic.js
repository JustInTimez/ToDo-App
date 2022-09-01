// This array will hold the todo items
let todoItems = [];

// A function that will create object based on user input and push to the array above
function addToDo (text) {
    const todo = {
        text, 
        checked : false,
        id: Date.now(),
    }
    todoItems.push(todo);
    renderTodo(todo);
};

const form = document.querySelector('.todoForm');

// Added event listener for form submit, and added some functionality to remove any white-space if left in the input field
form.addEventListener('submit', event => {
    event.preventDefault();                 // Prevent form from trying to submit to server
    const input = document.querySelector('.todoInput');
    const text = input.value.trim();
    if (text !== '') {
        addToDo(text);
        input.value = '';
        input.focus();
    }
});

function renderTasks(todo) {
    const list = document.querySelector('.todo-list');
    const isChecked = todo.checked ? 'completed': '';
    const liNode = document.createElement('li');
    liNode.setAttribute('class', `todo-item ${isChecked}`);
    liNode.setAttribute('data-key', todo.id);
    liNode.innerHTML = `
    <input id="${todo.id}" type="checkbox" />
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href=#delete-icon"></use></svg>
    </button>
    `;
    // Append this element to the dom by using list as reference
    list.append(liNode);

}