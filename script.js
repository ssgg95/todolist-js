const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.completed) {
            span.classList.add("completed");
        }

        const btnGroup = document.createElement("div");
        btnGroup.classList.add("btn-group");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "완료";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "수정";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => {
            const newText = prompt("수정할 내용을 입력하세요", todo.text);

            if (newText && newText.trim() !== "") {
                todos[index].text = newText.trim();
                saveTodos();
                renderTodos();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        btnGroup.appendChild(completeBtn);
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(btnGroup);

        todoList.appendChild(li);
    });
}

function addTodo() {
    const text = todoInput.value.trim();

    if (!text) return;

    todos.push({
        text: text,
        completed: false
    });

    saveTodos();
    todoInput.value = "";
    renderTodos();
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addTodo();
    }
});

renderTodos();