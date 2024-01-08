// Event handling, user interaction is what starts the code execution.
var taskInput = document.getElementById("new-task-descr");
var addButton = document.getElementsByClassName("tasks__button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//New task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  listItem.className = 'tasks__litem';

  label.innerText = taskString;
  label.className = 'tasks__label tasks__task';

  checkBox.type = "checkbox";
  checkBox.className = "tasks__checkbox";
  
  editInput.type = "text";
  editInput.className = "tasks__input-text tasks__task";

  editButton.innerText = "Edit";
  editButton.className = "tasks__button tasks__button-edit";

  deleteButton.className = "tasks__button tasks__button-delete";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = "tasks__button_bdimg";
  deleteButtonImg.alt = 'remove';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

//Create a new list item with the text from the #new-task-descr:
var addTask = function() {
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

//Edit an existing task.
var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('.tasks__input-text');
  var label = listItem.querySelector(".tasks__label");
  var editBtn = listItem.querySelector(".tasks__button-edit");
  var containsClass = listItem.classList.contains("edit-mode");
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("edit-mode");
}

//Delete task.
var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark task as incomplete.
var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function() {
  //ToDo: AJAX Request
}

//bind list item events
var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector(".tasks__checkbox");
  var editButton = taskListItem.querySelector(".tasks__button-edit");
  var deleteButton = taskListItem.querySelector(".tasks__button-delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

for (var i = 0; i < incompleteTaskHolder.children.length; i+=1) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i+=1) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
