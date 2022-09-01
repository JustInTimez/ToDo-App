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
    console.log(todoItems);
};

const form = document.querySelector('.todoForm');

// Added event listener for form submit, and added some functionality to remove any white-space if left in the input field
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.todoInput');
    const text = input.value.trim();
    if (text !== '') {
        addToDo(text);
        input.value = '';
        input.focus();
    }
});