const todos = [];
const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
todoInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTodo();
    }
});

addTodoButton.addEventListener('click', addTodo);

function render() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''} input-text">${todo.text}</span>
            <div>
            <button class="btn complete-btn handwritten ${todo.completed ? 'd-none' : ''}">Complete</button>
            <button class="btn delete-btn handwritten">Delete</button></div>
        `;
        if (todo.completed) {
            listItem.style.backgroundColor = '#7fffd4';
        }
        listItem.querySelector('.complete-btn').addEventListener('click', () => toggleTodo(index));
        listItem.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(index));
        listItem.querySelector('.input-text').addEventListener("dblclick", () => editTodo(index));
        todoList.appendChild(listItem);
    });
}
// Add New Todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text !== '') {
        const newTodo = { text, completed: false };
        todos.push(newTodo)
        todoInput.value = '';
        render();
    }
}

// Mark as Completed
function toggleTodo(index) {
    todos[index].completed = true;
    render();
}

//// Delete a Todo
function deleteTodo(index) {
    const childEl = todoList.children[index];
    todoList.removeChild(childEl);
    todos.splice(index, 1);
    render();
}

// Edit a Todo
function editTodo(index) {
    const childEl = todoList.children[index].querySelector('.input-text');
    childEl.ondblclick = function () {
        const val = this.innerHTML;
        const input = document.createElement("input");
        input.value = val;
        input.onblur = function () {
            const val = this.value;
            this.parentNode.innerHTML = val;
            render();
        }
        this.innerHTML = "";
        this.appendChild(input);
        input.focus();
    }
}

