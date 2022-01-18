var buttonEl = document.querySelector("#save-task");
//console.log(buttonEl); --> replaced with the var expressions below
var tasksToDoEl = document.querySelector("#tasks-to-do");

//need to place createTaskHandler before eventListener or else undef
var createTaskHandler = function() {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
};

buttonEl.addEventListener("click", createTaskHandler);


