/* ********* addToTasks ********** */

/** addToTaskJS 
 * The function is meant to enable the add of tasks to a json array.
 * It also generates a certain ID for new tasks and sends them to the backlog board.
 */
function addToTasks() {

    let task = processTaskInputs();
    tasks.push(task);
    task.id = tasks.length; // set id when creating the task
    task.board = 'backlog'; // default-board on task creation
    saveTasks();
    clearInputValues(title, date, category, urgency, description);
    clearAssignments(); // clear assigned users icons

}

/**
 * Empties the input fields in the task forms*/
function clearInputs() {
    clearInputValues(title, date, category, urgency, description);
}


/**
 * This function gets input values and returns them as task objects.
 * @returns {Object} - task object
 */
function processTaskInputs() {

    let [title, description, category, urgency, date] = getIds('title', 'description', 'category', 'urgency', 'date');

    let assignedUsers = getAssignedUsers();

    let task = {
        //'id' : id,
        'title': title.value,
        'description': description.value,
        'category': category.value,
        'urgency': urgency.value,
        'date': date.value,
        'board': '',
        'assignedTo': assignedUsers,
    };
    return task;
}

/**The function is used to delete certain tasks or a different arrays.
 * @param {dataArray} @type {Array}
 * @param {i} @type {Number}
 */

function deleteTask(dataArray, i) {
    dataArray.splice(i, 1);
    renderBoards()
    saveTasks();
}

function renderEditForm(i) {
    let overlay = getId('overlay');
    show('overlay');
    overlay.innerHTML = editFormHTML(i);
}

/**The function is used to edit already written tasks and save them as JSON in the backend.
 * @param {dataArray} @type {Array}
 * @param {i} @type {Number}
 * 
 */

async function saveEdit(dataArray, i) { // check: async no diff
    let task = await processTaskInputs();
    task.board = dataArray[i].board; // keep the right board
    dataArray[i] = task;
    saveTasks();
    hide('overlay');
    // check if sent from boards page or backlog page and render content
    if (getId('todoBoard')) {
        renderBoards()
    } else {
        renderLogs();
    }
}



function showAssignBox() {
    toggle('assignmentBox');
    renderUsers();
}

/** The function disables selection of a date before the current day */
function compareDate() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
}


function renderUsers() {
    let assignmentBox = getId('assignmentBox');
    assignmentBox.innerHTML = '';

    for (let j = 0; j < users.length; j++) {
        const showUser = users[j];
        assignmentBox.innerHTML += showUsersHTML(showUser);
    }
}

/* ****** render add-to-task form fields ****** */

/**
 * Renders HTML option fields from the users array into addToTask.html form select-field
 */
function renderForm() {
    let userSelect = getId('assignUser');
    userSelect.innerHTML = '';
    userSelect.innerHTML = renderUserOptionFields();
}

/* ****** render HTML option select fields ****** */
/**
 * This function renders all options from a given array of values in an html select field
 * @param {string} selected - the pre-selected element/option
 * @param {string[]} dataArray - array with string values of all options
 * @returns {string} - html that creates option fields
 */
function renderOptionFields(selected, dataArray) {
    str = '';
    for (let i = 0; i < dataArray.length; i++) {
        let el = dataArray[i]; // if dataArray == 'users' el = dataArray[i].name
        str += /*html*/ `<option value="${el}" ${renderSelected(selected, el)}>${el}</option>`;
    }
    return str;
}
// TODO: maybe include in function above (one fkt?)
/**
 * Renders option fields and shows preselected values for all users in an html select field
 * @param {(string[] | undefined)} selectedUsers 
 * @returns {string} - html that creates option fields
 */
function renderUserOptionFields(selectedUsers = undefined) { // default undefined in case of adding a new task
    str = '';
    for (let i = 0; i < users.length; i++) {
        let el = users[i].name;
        str += /*html*/ `<option value="${el}" ${renderMultipleSelected(selectedUsers, el)} onclick="showSelectedUserIcon()">${el}</option>`;
    }
    return str;
}

/**
 * This function compares the value of a given element against the current value of a select field and returns the attribut 'selected' if they match (comparison is case-insensitive)
 * @param {string} option 
 * @param {string} value 
 * @returns {(string | undefined)} - returns 'selected' if true
 */
function renderSelected(option, value) {
    if (option != undefined) {
        if (option.toLowerCase() == value.toLowerCase()) {
            return 'selected';
        }
    }
}
// TODO: maybe include in function above (one fkt?)
/**
 * This functions compares an array of passed options from a multiple select field with a given value and returns 'selected' if one of them matches the given value
 * @param {string[]} optionsArr 
 * @param {string} value 
 * @returns {(string | undefined )} - returns 'selected' if true
 */
function renderMultipleSelected(optionsArr, value) {
    if (optionsArr != undefined) {
        for (let i = 0; i < optionsArr.length; i++) {
            let el = optionsArr[i];
            if (el.toLowerCase() == value.toLowerCase()) {
                return 'selected';
            }
        }
    }
}

/* Backend Folder */
window.onload = async function() {
    downloadFromServer();
}


/**The function saves tasks in the backend in form of an JSON string */

// ERROR: Uncaught (in promise) SyntaxError: Unexpected end of JSON input...
async function saveTasks() { //check async: no diff
    event.preventDefault(); // prevent reload (forms)
    let tasksAsText = JSON.stringify(tasks);
    //console.log(tasks); // check: json looks correct
    //console.log(tasksAsText); //check: string looks correct
    await backend.setItem('tasks', tasksAsText);
}

/**
 *  The function is used to laod and convert the tasks from text-format to a JSON-array. 
 *  The preventDefault() function is necessary to prevent the page from reloading when adding a new task.
 */
function loadTasks() {
    event.preventDefault();
    let tasksAsText = backend.getItem('tasks');
    if (tasksAsText) {
        tasks = JSON.parse(tasksAsText);
    }
}
/**
 *  The function is used to show the description of the task who is clicked
 */
function showDescription(i) {
    let description = document.getElementById('showDescription' + i);
    let descriptionPlaceholder = document.getElementById('clickMe' + i);
    let taskBox = document.getElementById('task' + i);
    description.classList.remove('description-transition-in')
    taskBox.classList.remove('hide-scrollbar');

    if (description.classList.contains('d-none')) {
        description.classList.remove('d-none')
        description.classList.add('description-transition-in')
        taskBox.classList.add('hide-scrollbar');
        descriptionPlaceholder.innerHTML = `Description:`;
    } else {
        description.classList.add('d-none')
        descriptionPlaceholder.classList.remove('d-none')
        descriptionPlaceholder.innerHTML = `Click to show description`;
    }
    taskBox.classList.remove('hide-scrollbar');
}