const itemInput = document.getElementById("item");
const enterButton = document.getElementById("enter");
const todoList = document.querySelector(".to-do-list");
const doneList = document.querySelector(".done-list");

function displayDate() {
  const dateElement = document.getElementById("date");
  const today = new Date();
  dateElement.textContent = today.toDateString();
}

function createTodoItem(text) {
  const wrapper = document.createElement("div");
  wrapper.className = "to-do-item";

  const label = document.createElement("span");
  label.className = "task-text";
  label.textContent = text;

  const controls = document.createElement("div");
  controls.className = "controls";

  const doneBtn = document.createElement("button");
  doneBtn.className = "done-btn";
  doneBtn.textContent = "Done";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";

  controls.append(doneBtn, editBtn, removeBtn);
  wrapper.append(label, controls);

  return wrapper;
}

function addTask() {
  const text = itemInput.value.trim();
  if (!text) return;
  const task = createTodoItem(text);
  todoList.appendChild(task);
  itemInput.value = "";
  itemInput.focus();
}

function setSelectedTask(item) {
  document.querySelectorAll(".to-do-item").forEach((el) => {
    el.classList.remove("selected");
  });
  item.classList.add("selected");
}

function toggleTaskCompletion(item) {
  const isDone = item.parentElement === doneList;
  if (isDone) {
    item.classList.remove("done");
    todoList.appendChild(item);
    item.querySelector(".done-btn").textContent = "Done";
  } else {
    item.classList.add("done");
    doneList.appendChild(item);
    item.querySelector(".done-btn").textContent = "Undo";
  }
}

function onListClick(event, listDom) {
  const target = event.target;
  const item = target.closest(".to-do-item");
  if (!item) return;

  if (target.classList.contains("done-btn")) {
    event.stopPropagation();
    toggleTaskCompletion(item);
    return;
  }

  if (target.classList.contains("edit-btn")) {
    event.stopPropagation();
    const taskText = item.querySelector(".task-text");
    const newText = prompt("Edit task", taskText.textContent);
    if (newText !== null) {
      const trimmed = newText.trim();
      if (trimmed) {
        taskText.textContent = trimmed;
      }
    }
    return;
  }

  if (target.classList.contains("remove-btn")) {
    event.stopPropagation();
    item.remove();
    return;
  }

  setSelectedTask(item);
}

enterButton.addEventListener("click", addTask);
itemInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

todoList.addEventListener("click", (event) => onListClick(event, todoList));
doneList.addEventListener("click", (event) => onListClick(event, doneList));

window.onload = function () {
  displayDate();
};
