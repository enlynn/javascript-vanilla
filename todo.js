const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pendingList = document.querySelector(".pendingList");
const finishedList = document.querySelector(".finishedList");

const PENDING_TODO_LS = "pendingToDo";
const FINISHED_TODO_LS = "finishedToDo";

let pendingToDos = [];
let finishedToDos = [];

function savePending() {
  localStorage.setItem(PENDING_TODO_LS, JSON.stringify(pendingToDos));
}
function saveFinished() {
  localStorage.setItem(FINISHED_TODO_LS, JSON.stringify(finishedToDos));
}

function handleDel(event) {
  const li = event.target.parentNode;
  const id = li.id;
  const parent = li.parentNode;
  if (parent.className === "pendingList") {
    pendingList.removeChild(li);
    const cleanpendingToDos = pendingToDos.filter(function(todo) {
      return todo.id.toString() !== id;
    });
    pendingToDos = cleanpendingToDos;
    savePending();
  } else {
    finishedList.removeChild(li);
    const cleanfinishedToDos = finishedToDos.filter(function(todo) {
      return todo.id.toString() !== id;
    });
    finishedToDos = cleanfinishedToDos;
    saveFinished();
  }
}

function handleCheck(event) {
  const li = event.target.parentNode;
  const id = li.id;
  const text = li.querySelector("span");
  const checkBtn = li.querySelector(".checkBtn");
  checkBtn.removeEventListener("click", handleCheck);
  checkBtn.addEventListener("click", handlePending);
  checkBtn.classList.add("pendingBtn");
  checkBtn.classList.remove("checkBtn");
  checkBtn.innerText = "↑";
  pendingList.removeChild(li);
  finishedList.appendChild(li);
  const toDoObj = {
    text: text.innerText,
    id: finishedToDos.length + 1
  };
  finishedToDos.push(toDoObj);
  saveFinished();
  const cleanpendingToDos = pendingToDos.filter(function(todo) {
    return todo.id.toString() !== id;
  });
  pendingToDos = cleanpendingToDos;
  savePending();
}
function paintPendingToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const newId = pendingToDos.length + 1;
  li.id = newId;
  span.innerText = text;
  delBtn.addEventListener("click", handleDel);
  delBtn.innerText = "X";
  delBtn.classList.add("delBtn");
  checkBtn.addEventListener("click", handleCheck);
  checkBtn.innerText = "O";
  checkBtn.classList.add("checkBtn");

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  pendingList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  pendingToDos.push(toDoObj);
  savePending();
}
function handlePending(event) {
  const li = event.target.parentNode;
  const id = li.id;
  const text = li.querySelector("span");
  const pendingBtn = li.querySelector(".pendingBtn");
  pendingBtn.removeEventListener("click", handlePending);
  pendingBtn.addEventListener("click", handleCheck);
  pendingBtn.classList.add("checkBtn");
  pendingBtn.classList.remove("pendingBtn");
  pendingBtn.innerText = "O";
  finishedList.removeChild(li);
  pendingList.appendChild(li);
  const toDoObj = {
    text: text.innerText,
    id: finishedToDos.length + 1
  };
  pendingToDos.push(toDoObj);
  savePending();
  const cleanfinishedToDos = finishedToDos.filter(function(todo) {
    return todo.id.toString() !== id;
  });
  finishedToDos = cleanfinishedToDos;
  saveFinished();
}

function paintFinishedToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const pendingBtn = document.createElement("button");
  const newId = finishedToDos.length + 1;
  li.id = newId;
  span.innerText = text;
  delBtn.addEventListener("click", handleDel);
  delBtn.innerText = "X";
  delBtn.classList.add("delBtn");
  pendingBtn.addEventListener("click", handlePending);
  pendingBtn.innerText = "↑";
  pendingBtn.classList.add("pendingBtn");

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(pendingBtn);
  finishedList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  finishedToDos.push(toDoObj);
  saveFinished();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  toDoInput.value = "";
  paintPendingToDo(currentValue);
  //paintFinishedToDo();
}

function loadToDo() {
  const loadedpendingToDos = localStorage.getItem(PENDING_TODO_LS);
  const loadedfinishedToDos = localStorage.getItem(FINISHED_TODO_LS);
  if (loadedpendingToDos) {
    const parsedPending = JSON.parse(loadedpendingToDos);
    parsedPending.forEach(function(toDo) {
      paintPendingToDo(toDo.text);
    });
  }
  if (loadedfinishedToDos) {
    const parsedFinished = JSON.parse(loadedfinishedToDos);
    parsedFinished.forEach(function(toDo) {
      paintFinishedToDo(toDo.text);
    });
  }
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
