const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let todos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function handleClickBtn(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const span = document.createElement("span");
  span.innerHTML = newTodo.data;

  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", handleClickBtn);

  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    id: Date.now(),
    data: newTodo,
  };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedName = localStorage.getItem(USERNAME_KEY);
if (savedName !== null) {
  todoForm.classList.remove(HIDDEN_CLASSNAME);
}

const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach((todo) => {
    paintTodo(todo);
  });
}
