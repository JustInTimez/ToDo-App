const taskInput = document.getElementById("taskInput");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear-btn"); 
const taskBox = document.querySelector(".task-box");
const dateInput = document.getElementById("task-date");

let editId,
    isEditTask = false,
    todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = "";
    
    if (todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            let dueDateClass = "";
            let dueDate = new Date(todo.duedate);
            let now = new Date();
            if (dueDate < now) {
                dueDateClass = "redText";
            }
            if (filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}<br><small class="${dueDateClass}"><i>Due:</i> ${todo.duedate}</small></p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}", "${todo.duedate}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>No tasks - please create one to get started!</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

// To-Do functionality starts here

function editTask(taskId, textName, dateName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
    dateInput.value = dateName;
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});

function checkValidation (taskText, taskDate) {
    let textValid = false;
    let dateValid = false;
    if (taskText.length == 0) {
        document.getElementById("taskNameError").classList.remove("d-none");
    } else {
        document.getElementById("taskNameError").classList.add("d-none");
        textValid = true;
    }
    if (taskDate.length == 0) {
        document.getElementById("taskDateError").classList.remove("d-none");
    } else {
        let selectedDate = new Date(taskDate);
        let now = new Date();
        if (selectedDate < now) {
            document.getElementById("taskDateError").classList.remove("d-none");
        } else {
            document.getElementById("taskDateError").classList.add("d-none");
            dateValid = true;
        }
    }
    if (textValid && dateValid) {
        return true;
    } else {
        return false;
    }
}

// No need to use preventDefault() as this fires on the submit button click and is not attached to a form
function createTask() {
    let taskText = taskInput.value.trim();
    let taskDate = dateInput.value;
    let bothValid = checkValidation(taskText, taskDate);
    if (bothValid == false) {
        return;
    }
    if (!isEditTask) {
        todos = !todos ? [] : todos;
        const todo = {
            name: taskText,
            duedate: taskDate, 
            status: "pending",
        } 
        todos.push(todo);
    } else {
        isEditTask = false;
        todos[editId].name = taskText;
        todos[editId].duedate = taskDate;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
}
