/* ********* addToTasks ********** */

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

function clearInputs() {
    clearInputValues(title, date, category, urgency, description);
}

/**
 * This function saves input values and returns them as a task object
 * @returns {Object} - task object
 */
function saveTaskInputs() {

    let id = tasks.length;

    let [title, description, category, urgency, date] = getIds('title', 'description', 'category', 'urgency', 'date');

    let assignedUsers= getAssignedUsers();
    console.log(assignedUsers);

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

function saveEdit(dataArray, i) {
    let task = saveTaskInputs();
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
    console.log('user-index: ', userIndex);
    console.log('assign to user: ', users[userIndex]);
    console.log('task-index: ', taskIndex);

    tasks[taskIndex].assignedTo.push(users[userIndex]);
    //task.assignedTo.push(users[userIndex]);

    //return users[userIndex]; //return full user object?
}

function clearAssignments(){
    // let [title, description, category, urgency, date] = getIds('title', 'description', 'category', 'urgency', 'date');
    // clearInputValues(title, date, category, urgency, description);
    //hide('assignUser');
    getId('iconsContainer').innerHTML = renderAssignedUsers([]);
}

/* ****** render add to task form fields ****** */

function renderForm() {
    let userSelect = getId('assignUser');
    userSelect.innerHTML = '';
    userSelect.innerHTML = renderUserOptionFields();
}