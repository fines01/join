/* vergebene ID 
id="title"
id="category"
id="urgency"
id="discirption"
id="assignment"
id="date"
id="logs"
id="todoBoard"
*/

/* ********* global scope - here we define global variables and constants *********  */

let tasks = [{ title: 'a', description: 'a', category: 'Management', urgency: 'High', date: '2022-04-20' }
,{ title: 'b', description: 'b', category: 'Management', urgency: 'High', date: '2022-04-27' }
,{ title: 'c', description: 'c', category: 'Management', urgency: 'High', date: '2022-04-27' }
,{ title: 'd', description: 'd', category: 'Management', urgency: 'High', date: '2022-04-27' }
,{ title: 'e', description: 'e', category: 'Management', urgency: 'High', date: '2022-04-27' }
,{ title: 'f', description: 'f', category: 'Management', urgency: 'High', date: '2022-04-27' }];

// let members = [{
//     name: 'Jo',
//     // department: 'Marketing',
//     email: 'jo@test.at'
// }];

/**
 * function init() executes on load of html body
 */
function init() {
    loadTasks(); // get tasks from local strage
    includeHTML();
}

/* ********* addToTasks ********** */

/** addToTaskJS the function is meant to enable the add of task to a json array
 */
function addToTask() {

    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('category');
    let urgency = document.getElementById('urgency');
    let date = document.getElementById('date');

    let task = {
        'title': title.value,
        'description': description.value,
        'category': category.value,
        'urgency': urgency.value,
        'date': date.value,
    };

    tasks.push(task);
    saveTasks();
    title.value = '';
    date.value = '';
    category.value = '';
    urgency.value = '';
    description.value = '';
}

function deleteTask(i) {
   
        tasks.splice(i, 1);
        renderTasks();
        saveTasks();
    }

function editTask(task) {
    console.log(task); // check: übergabe task --> nur undefined object. äbergabe task.title ok
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