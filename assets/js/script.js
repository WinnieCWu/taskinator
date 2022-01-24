var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

//create empty task array to hold tasks objects to send to localStorage
var tasks = [];

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) { //same as if(taskNameInput ===""...)
    alert("You need to fill out the task form!");
    return false;
  }

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  //formEl.reset(); don't need anymore since we have above code

  var isEdit = formEl.hasAttribute("data-task-id");
  //has data attribute, so get task id and call function to complete edit process
  if (isEdit){
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  //no data attribute, so create object as normal and pass to createTaskEl function
  else {
      //package up data as an obj
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
    status: "to do" //since tasks just created can't be 'in progress' or 'complete' yet
  };

  //send it as an arg to createTaskEl
  ///only called if isEdit is false
  createTaskEl(taskDataObj);
  }
};

var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  //add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  //add value of task object's id as property to the taskDataObj argument variable and to the tasks array
  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);
  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
  //increase task counter for next unique id
  taskIdCounter++;

  //to test if new property gets the fxn via taskDataObj parameter
  console.log(taskDataObj);
  console.log(taskDataObj.status);
  };

var createTaskActions =  function(taskId){
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  //create change status dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }
  return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId){
  //find the matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("TaskUpdated!");
  // loop through tasks array and task object with new content
  //checking to see if indiv' task's id property matches the taskId argument passed in var
  for (var i = 0; i < tasks.length; i++) {
    //parseInt to convert string to a #, to complete # to #
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  };

  //ensure users can create new tasks again by removing data-task-id
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
}

var taskButtonHandler = function(event){
  //get target element from event
  var targetEl = event.target;
  //edit button was clicked
  if (targetEl.matches(".edit-btn")){
    console.log("edit", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    //get element's task id
    console.log("delete", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var taskStatusChangeHandler = function(event){
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");
  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();
  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  //update tasks in tasks array
  for (var i =0; i < tasks.length; i++){
    if (task[i].id === parseInt(taskId)){
      task[id].status = statusValue;
      console.log(tasks);
      }
    }
};

var editTask = function(taskId) {
  console.log("editing task #" + taskId);
  //get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  //get content from task name and type
  var taskName = taskSelected.querySelector ("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  /// write values of taskname and taskType to form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  //set data attribute to the form with a value of the task's id so it knows which one is being edited
  formEl.setAttribute("data-task-id", taskId);
  // update form's button to reflect editing a task rather than creating a new one
  formEl.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function(taskId){
  console.log(taskSelected);
  // find task list element with taskId value and remove it
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove(); 
  //rather than using event.target.matches(".delete-button"..
  //otherwise, would be an endless loop

  //create new empty array variable
  var updatedTaskArr = [];
  //loop through current tasks to see if current task (ie tasks[i]in the loop does not have same id value as the task we want to delete
  for (var i = 0; i < tasks.length; i++) {
    //if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)){
      //if it's not the same task, keep it by adding it to the array
      updatedTaskArr.push(task[i]);
    }
  }
  //reassign tasks array (w/o the removed task) to be the same as updatedTaskArr
  tasks = updatedTaskArr;
};

// Create a new task
formEl.addEventListener("submit", taskFormHandler);
// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);
// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);