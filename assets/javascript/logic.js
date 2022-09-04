// This array will hold the todo items
let todoItems = [];

// A function that will create object based on user input and push to the array above
function addToDo(text, descrip) {
    const todo = {
        text,
        descrip,
        checked: false,
        id: Date.now(),
    }
    todoItems.push(todo);
    renderTasks(todo);
};

// Function that takes in the event listener for the checkmark click event
function toggleComplete(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTasks(todoItems[index]);
};

// Function to edit task
const editButton = document.querySelector('js-edit-todo');
function editList(edit) {
    editButton.value = edit;

    text.value = todoItems[edit];


}

// Function to delete items from DOM
function deleteTodo(key) {
    localStorage.setItem('rememberData', JSON.stringify(todoItems));
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTasks(todo);
}

const form = document.querySelector('.todoForm');

// Added event listener for form submit, and added some functionality to remove any white-space if left in the input field
form.addEventListener('submit', event => {
    event.preventDefault();                 // Prevent form from trying to submit to server
    const input = document.querySelector('.todoInput');
    const inputDescrip = document.querySelector('.todoDescrip');
    const text = input.value.trim();
    const descrip = inputDescrip.value.trim();
    if (text && descrip !== '') {
        addToDo(text, descrip);
        input.value = '';
        input.focus();
    }
});

function renderTasks(todo) {
    localStorage.setItem('rememberData', JSON.stringify(todoItems));
    const list = document.querySelector('.todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);
    if (todo.deleted) {
        item.remove();
        if (todoItems.length === 0) list.innerHTML = '';
        return;
    }
    const isChecked = todo.checked ? 'completed' : '';
    const divNode = createNode(todo, isChecked);
    // If item is in DOM already, either replace it so that no duplication occures or append to end of list
    if (item) {
        list.replaceChild(divNode, item);
    } else {
        list.append(divNode);
    }
}

function createNode(todo, isChecked) {
    const divNode = document.createElement('div');
    divNode.setAttribute('class', `todo-item accordion-item ${isChecked}`);
    divNode.setAttribute('data-key', todo.id);
    divNode.innerHTML = `
    <div id="dropDownContainer">
    <input id="${todo.id}" class="accordion-button form-check-input program_checkbox" type="checkbox" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
    <label for="${todo.id}" class="tick js-tick"></label>
    <div class="accordion" id="accordionPanelsStayOpen">
      <h2 class="accordion accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <span>${todo.text}</span>
        </button>
      </h2>
      </div>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body description">
            <span>${todo.descrip}</span>
        </div>
      </div>
    </div>
    <button class="edit-todo js-edit-todo">
        <svg><use href=#edit-icon"></use></svg>
    </button>
    <button class="delete-todo js-delete-todo" onclick()>
        <svg><use href=#delete-icon"></use></svg>
    </button>
    `;
    return divNode;
}

// Listen for and apply checkmark as well as delete button listener

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleComplete(itemKey);
    }
    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

// Listener to Access LocalStorage and update the DOM if necessary
document.addEventListener('DOMContentLoaded', () => {
    const loadData = localStorage.getItem('rememberData');
    if (loadData) {
        todoItems = JSON.parse(loadData);
        todoItems.forEach(r => {
            renderTasks(r);
        });
    }
});