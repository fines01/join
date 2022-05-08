/* ********* addToTasks ********** */

/** addToTaskJS the function is meant to enable the add of task to a json array
 */
function addToTasks() {

    let task = saveTaskInputs();
    tasks.push(task);
    task.id = tasks.length; // set id when creating the task
    task.board = 'backlog'; // default-board on task creation
    saveTasks();
    clearInputValues(title, date, category, urgency, description);
    clearAssignments(); // clear assigned users icons

}

function clearInputs() {
    clearInputValues(title, date, category, urgency, description);
}

/**
 * This function saves input values and returns them as a task object
 * @returns {Object} - task object
 */
function saveTaskInputs() {

    let [title, description, category, urgency, date] = getIds('title', 'description', 'category', 'urgency', 'date');

    let assignedUsers= getAssignedUsers();

    let task = {
        //'id' : id,
        'title': title.value,
        'description': description.value,
        'category': category.value,
        'urgency': urgency.value,
        'date': date.value,
        'board': '',
        'assignedTo': assignedUsers
    };
    return task;
}

/**This function gets all selected user values from an html multiple select field and returns the values in an array
 * @returns {string[]} - selected users
 */
function getAssignedUsers(){
    let assignedUsers=[];
    let selectOptions = getId('assignUser').options;

    for (let i = 0; i < selectOptions.length; i++) {
        if (selectOptions[i].selected) {
            assignedUsers.push(selectOptions[i].value);
        }
    }

    return assignedUsers;
}

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

async function saveEdit(dataArray, i) {
    let task = await saveTaskInputs();
    task.board = dataArray[i].board; // keep the right board
    dataArray[i] = task;
    saveTasks();
}

function showAssignBox() {
    toggle('assignmentBox');
    renderUsers();
}

function renderUsers() {
    let assignmentBox = getId('assignmentBox');
    assignmentBox.innerHTML = '';

    for (let j = 0; j < users.length; j++) {
        const showUser = users[j];
        assignmentBox.innerHTML += showUsersHTML(showUser);
    }
}

function addUser(userIndex) {
    tasks[taskIndex].assignedTo.push(users[userIndex]);
}

/**
 * Clears user icons when resetting the addToTask.html form
 */
function clearAssignments(){
    getId('iconsContainer').innerHTML = renderAssignedUsers([]);
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
        str += /*html*/ `<option value="${el}" ${renderSelected(selected,el)}>${el}</option>`;
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
        str += /*html*/ `<option value="${el}" ${renderMultipleSelected(selectedUsers,el)} onclick="showSelectedUserIcon()">${el}</option>`;
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

function saveTasks() {
    let tasksAsText = JSON.stringify(tasks);
    backend.setItem('tasks', tasksAsText);
}

/**
 *  The function is used to laod and convert the tasks from text-format to a JSON-array
 */
function loadTasks() {
    let tasksAsText = backend.getItem('tasks');
    if (tasksAsText) {
        tasks = JSON.parse(tasksAsText);
    }
}