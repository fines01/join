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
let tasks = [
    { title: 'a', description: 'a', category: 'Management', urgency: 'high', date: '2022-04-20' },
    { title: 'b', description: 'b', category: 'Management', urgency: 'intermediate', date: '2022-04-27' },
    { title: 'c', description: 'c', category: 'Management', urgency: 'low', date: '2022-04-27' },
    { title: 'd', description: 'd', category: 'Management', urgency: 'High', date: '2022-04-27' },
    { title: 'e', description: 'e', category: 'Management', urgency: 'High', date: '2022-04-27' },
    { title: 'f', description: 'f', category: 'Management', urgency: 'High', date: '2022-04-27' }
];
// example data for testing purposes
let members = [
    { name: 'Jolene Bauer', email: 'jo@test.at', color: '', img: '' },
    { name: 'Jimmmy Dude', email: 'dude@company.com', color: '', img: '' },
    { name: 'Max Mo', email: 'donot@email.me', color: '', img: '' },
    { name: 'Maja', email: 'maja@muster.mix', color: '', img: '' },
]

let currentDraggedElement;

/**
 * function init() executes on load of html body
 */
function init() {
    loadTasks(); // get tasks from local strage
    includeHTML();
}

/* ********* addToTasks ********** */

/**
 * This function saves input values and returns them as a task object
 * @returns {Object} - task object
 */
function saveTaskInputs() {

    let [title, description, category, urgency, date] = getIds('title', 'description', 'category', 'urgency', 'date');

    let task = {
        'title': title.value,
        'description': description.value,
        'category': category.value,
        'urgency': urgency.value,
        'date': date.value,
        'category': 'todo'
    };

    return task;
}
/** addToTaskJS the function is meant to enable the add of task to a json array
 */
function addToTasks() {

    let task = saveTaskInputs();

    tasks.push(task);
    saveTasks();
    title.value = '';
    date.value = '';
    category.value = '';
    urgency.value = '';
    description.value = '';
}

function deleteTask(dataArrays, i) {

    dataArrays.splice(i, 1);
    renderTasks();
    saveTasks();
}

// function redirect(){
//     window.location.href = '03addToTask.html';
// }

function renderEditForm(i) {
    let form = getId('boardContainer');
    form.innerHTML = editFormHTML(i);
}

function saveEdit(dataArrays, i) {
    let task = saveTaskInputs();
    //console.log(task);
    dataArrays[i] = dataArray;
    saveTasks();
}

function startDragging(i) {
    currentDraggedElement = i;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;
    renderBoards()
}

/**
 *  The function is used to save and convert tasks in form of a JSON-array from the addTask function to a string 
 */
function saveTasks() {
    let tasksAsText = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksAsText);
}

/**
 *  The function is used to laod and convert the tasks from text-format to a JSON-array
 */
function loadTasks() {
    let tasksAsText = localStorage.getItem('tasks');
    if (tasksAsText) {
        tasks = JSON.parse(tasksAsText);
    }
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

/* ********* Board ********* */

/**
 * Renders all tasks from the tasks array into the to-do board
 */
function renderTasks() {
    let board = getId('todoBoard');
    board.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        board.innerHTML += boardTaskHTML(tasks[i], i);
        //priorityColor(i);
    }

}

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

// Function shows/refreshes all boards filtered with categorys to also allow drag and drop 
// Funktion noch nicht (fertig) implementiert !
function renderBoards() {
    let todoBoard = tasks.filter(t => t['category'] == 'todo');

    getId('todoBoard').innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = todoBoard[i];
        getId('todoBoard').innerHTML += boardTaskHTML(element);
        //priorityColor(i);
    }

    let inProgressBoard = tasks.filter(t => t['category'] == 'inProgress');

    getId('inProgressBoard').innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = inProgressBoard[i];
        getId('inProgressBoard').innerHTML += boardTaskHTML(element);
        //priorityColor(i);
    }

    let testingBoard = tasks.filter(t => t['category'] == 'testing');

    getId('testingBoard').innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = testingBoard[i];
        getId('testingBoard').innerHTML += boardTaskHTML(element);
        //priorityColor(i);
    }

    let doneBoard = tasks.filter(t => t['category'] == 'done');

    getId('doneBoard').innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = doneBoard[i];
        getId('doneBaord').innerHTML += boardTaskHTML(element);
        //priorityColor(i);
    }
}

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