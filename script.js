const taskInput = document.getElementById("new-task-input");
const addButton = document.getElementById("new-task-btn");
const incompleteTaskHolder = document.getElementById("item-list-incomplete");
const completedTasksHolder = document.getElementById("item-list-complete");

[...incompleteTaskHolder.children,...completedTasksHolder.children].forEach((e) => {
  console.log(e.querySelector(".btn--edit"));
  
  e.querySelector(".btn--edit").addEventListener("click",editTask);
  e.querySelector(".btn--remove").addEventListener("click",deleteTask);
  e.querySelector(".item-layout__checkbox").addEventListener("click",changeCompletionType);
});

function createNewTaskElement(taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");

  label.textContent = taskString;
  label.classList.add("item-layout__title");

  checkBox.type = "checkbox";
  checkBox.classList.add("item-layout__checkbox");
  checkBox.addEventListener("click",changeCompletionType);

  editInput.type = "text";
  editInput.classList.add("item-layout__edit-input");

  editButton.classList.add("btn", "btn--edit");
  editButton.addEventListener("click",editTask)

  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn--remove");
  deleteButton.addEventListener("click",deleteTask)

  listItem.classList.add("item-list__item", "item-layout")
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

function addTask() {
  console.log("Add Task...");
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);

  taskInput.value = "";
};

const editModeClass = "item-layout--edit";

function editTask() {
  console.log("Edit Task...");

  const listItem = this.parentNode;  

  const editInput = listItem.querySelector(".item-layout__edit-input");
  const label = listItem.querySelector("label");
  const isEditing = listItem.classList.contains(editModeClass);
  if (isEditing) {
    label.textContent = editInput.value;
  } else {
    editInput.value = label.textContent;
    console.log("Change 'edit' to 'save'");
  }
  
  listItem.classList.toggle(editModeClass);
};

function deleteTask() {
  const listItem = this.parentNode;
  console.log("Delete Task...");  
  listItem.parentNode.removeChild(listItem);
};


function changeCompletionType() {
  const listItem = this.parentNode;
  if (listItem.parentNode === incompleteTaskHolder) {
    completedTasksHolder.appendChild(listItem);
  } else {
    incompleteTaskHolder.appendChild(listItem);
  }
}

addButton.addEventListener("click", addTask);