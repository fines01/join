/* vergebene ID 
id="title"
id="category"
id="urgency"
id="discirption"
id="assignment"
id="date"
id="logs"
id="todoBoard"
id="boardContainer"
id="inProgress"
id="testing"
id="done"

*/

/* ********* global scope - here we define global variables and constants *********  */

// example data for testing purposes

let currentDraggedElement;

/**
 * function init() executes on load of html body
 */
function initScirpt() {

    loadTasks(); // get tasks from local strage
    includeHTML();
}

/* ********* addToTasks ********** */

/**
 * This function saves input values and returns them as a task object
 * @returns {Object} - task object
 */
function saveTaskInputs() {

    let id = tasks.length;

    let [title, description, category, urgency, date] = getIds('title', 'description', 'category', 'urgency', 'date');
    let task = {
        //'id' : id,
        'title': title.value,
        'description': description.value,
        'category': category.value,
        'urgency': urgency.value,
        'date': date.value,
        'board': '' 
    };
    return task;
}
/** addToTaskJS the function is meant to enable the add of task to a json array
 */
function addToTasks() {

    let task = saveTaskInputs();
    tasks.push(task);
    task.id = tasks.length; // set id when creating the task
    task.board = 'todo'; // default-board on task creation
    saveTasks();
    clearInputValues(title, date, category, urgency, description);

}




/* working addToTask()

function saveTaskInputs() {

    let [title, description, category, urgency, date] = getIds('title', 'description', 'category', 'urgency', 'date');

        let task = {
        'title': title.value,
        'description': description.value,
        'category': category.value,
        'urgency': urgency.value,
        'date': date.value,
        'board': 'todo' // default board on task-creation
    };

    return task;
}
/** addToTaskJS the function is meant to enable the add of task to a json array

 function addToTasks() {
    
    let task = saveTaskInputs();
 
    tasks.push(task);
    console.log(tasks);
    console.log(task);
    saveTasks();
    clearInputValues(title, date, category, urgency, description);

}
*/

function startDragging(id) { // i only for testing purposes
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(board) {
    tasks[currentDraggedElement]['board'] = board;
    saveTasks();
    renderBoards()
}

function splitID(id, separator) {
    let arrayOfStrings = id.split(separator);
    return arrayOfStrings;
}

function deleteTask(dataArray, i) {

    dataArray.splice(i, 1);
    renderBoards()
    saveTasks();
}

// function redirect(){
//     window.location.href = '03addToTask.html';
// }

function renderEditForm(i) {
    let overlay = getId('overlay');
    show('overlay');
    overlay.innerHTML = editFormHTML(i);
}

function saveEdit(dataArray, i) {
    let task = saveTaskInputs();
    task.board = dataArray[i].board; // keep the right board
    dataArray[i] = task;
    saveTasks();
}


function renderBoards() {

    let todoBoard = tasks.filter(t => t['board'] == 'todo');

    getId('todoBoard').innerHTML = '';

    for (let i = 0; i < todoBoard.length; i++) {
        const element = todoBoard[i];
        const taskIndex = tasks.indexOf(element);
        getId('todoBoard').innerHTML += boardTaskHTML(element, taskIndex);
        
    }

    let inProgressBoard = tasks.filter(t => t['board'] == 'inProgress');

    getId('inProgressBoard').innerHTML = '';

    for (let i = 0; i < inProgressBoard.length; i++) {
        const element = inProgressBoard[i];
        const taskIndex = tasks.indexOf(element);
        getId('inProgressBoard').innerHTML += boardTaskHTML(element, taskIndex);

    }

    let testingBoard = tasks.filter(t => t['board'] == 'testing');

    getId('testingBoard').innerHTML = '';

    for (let i = 0; i < testingBoard.length; i++) {
        const element = testingBoard[i];
        const taskIndex = tasks.indexOf(element);
        getId('testingBoard').innerHTML += boardTaskHTML(element, taskIndex);

    }

    let doneBoard = tasks.filter(t => t['board'] == 'done');

    getId('doneBoard').innerHTML = '';

    for (let i = 0; i < doneBoard.length; i++) {
        const element = doneBoard[i];
        const taskIndex = tasks.indexOf(element);
        getId('doneBoard').innerHTML += boardTaskHTML(element, taskIndex);

    }
}


function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}



/* ********* Backlog ********* */

/**
 * Renders all logs from the tasks array
 */
function renderLogs() {
    let logs = getId('logs');
    logs.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        // for testing purposes:
        if (!tasks[i].assignedTo) {
            tasks[i].assignedTo = "Unassigned";
        }
        // 
        logs.innerHTML += logsHTML(tasks[i]);
    }
}

/* native Drag Funktionen */

/* function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
 */
/* ********* Board ********* */

/* this function is used to change the color of a task depending on the the urgency */

// function priorityColor(i) {
//     let urgency = tasks[i]['urgency'];
//     switch (urgency) {
//         case "High" : document.getElementById('task-' + i).classList.add('backround-urgency-high');
//         break;
//         case "Intermediate" : document.getElementById('task-' + i).classList.add('backround-urgency-intermediate');
//         break;
//         case "Low" : document.getElementById('task-' + i).classList.add('backround-urgency-low');
//         break;
//     }

// }

/**
 * Function shows/refreshes all boards filtered with categorys to also allow drag and drop 
 */


/* ********* generic functions ********* */

/**
 * Returns an HTML element
 * @param {string} id - The id of an HTML element
 * @returns {Object} - The corresponding HTML element
 */
function getId(id) {
    return document.getElementById(id);
}

/**
 * Returns an array with one or several HTML elements
 * @param {...string} idsArr - The id of one or several HTML elements
 * @returns {Object[]} elementArr - All corresponding HTML elements in an array
 */
function getIds(...idsArr) { // rest-operator
    elementArr = [];
    for (let i = 0; i < idsArr.length; i++) {
        elementArr.push(document.getElementById(idsArr[i]));
    }
    return elementArr;
}

/**
 * Hides all passed HTML elements
 * @param  {...string} ids - The id of one or several HTML elements
 */
function hide(...ids) {
    for (let i = 0; i < ids.length; i++) {
        getId(ids[i]).classList.add('d-none');
    }
}

/**
 * Displays all passed HTML elements
 * @param  {...string} ids - The id of one or several HTML elements
 */
function show(...ids) {
    for (let i = 0; i < ids.length; i++) {
        getId(ids[i]).classList.remove('d-none');
    }
}

/**
 * Toggles the view of all passed HTML elements
 * @param  {...string} ids - The id of one or several HTML elements
 */
function toggle(...ids) {
    for (let i = 0; i < ids.length; i++) {
        getId(ids[i]).classList.toggle('d-none');
    }
}

/**
 * Capitalizes the first letter of a string and returns the capitalized string
 * @param {string} str
 * @returns {string}
 */
function capitalizeFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
}

/**
 * This function takes html form and input elements and empties their value.
 * @param  {...Object} elements - HTML elements
 */
function clearInputValues(...elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].value = '';
    }
}

function showNavbar() {
    getId('nav-bar').classList.remove('hide-mobile');
    getId('mobile-x').classList.remove('d-none');
    getId('mobile-menu').classList.add('d-none')
}

function closeNavbar() {
    getId('nav-bar').classList.add('hide-mobile');
    getId('mobile-x').classList.add('d-none');
    getId('mobile-menu').classList.remove('d-none')
}