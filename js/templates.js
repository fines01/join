function logsHTML(task) {
    return /*html*/ `
        <div class="log">
            <div class="">
                 <h4 class="log-name hide-long-text">${task.assignedTo}</h4>
            </div>
            <div class="">
                <h4 class="hide-long-text">${task.category}</h4>
            </div>
            <div class="">
                <h5 class="hide-long-text">${capitalizeFirst(task.title)}</h5>
                <p class="hide-long-text">${capitalizeFirst(task.description)}</p>
            </div>
        </div>`;
}

function boardTaskHTML(element, i) {
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${i})" class="scroll-bar-small background-urgency-${(element['urgency']).toLowerCase()} task">
            <h4 class="task-headline-text">${element['title']}</h4>
            <span class="light-text">
                Priority: <b>${element['urgency']}</b><br>
                Due date: <span>${element['date']}</span>
            </span>
            <p class="task-description-text">${element['description']}</p>
            <div class="task-links">
                <img class="delete-task" src="img/delete-24.png" 
                onclick="deleteTask(tasks, ${i})" alt="delete icon">
                <img class="edit-task" src="img/edit-24.png" onclick="renderEditForm(${i})" alt="edit icon">
            </div>
            <div class="member"><img src="img/icon-plus.png" alt=""></div>
            <div class="move-to">
                <img onclick="showMoveButtons(${i})" src="img/arrow-204-48.png" alt="">
                <div id="moveButtonBox${i}" class="move-button-box d-none">
                    <div><button onclick="moveToTodo(${i})" class="move-button">Todo</button></div>
                    <div><button onclick="moveToInProgress(${i})" class="move-button">In Progress</button></div>
                    <div><button onclick="moveToTesting(${i})" class="move-button">Testing</button></div>
                    <div><button onclick="moveToDone(${i})" class="move-button">Done</button></div>
                </div>
            </div>
        </div>
    `;
}

// TODO: fix form view and style !!
function editFormHTML(i) {
    return /*html*/ `
        <div class="task-input container" onclick="event.stopPropagation()">
            <form class="form-field edit-form">
                <h2 class="edit-task-headline">UPDATE TASK</h2>
                <br>
                <div class="form-section">
                    <!-- <div id="assignmentBox" class="assignment-box d-none"></div> -->
                    <h2>TITLE</h2>
                    <input required id="title" placeholder="Enter a title" value="${tasks[i].title}">
                    <h2>CATEGORY</h2>
                    <select id="category" placeholder="Management">
                        ${renderOptionFields(tasks[i].category, categories)}
                    </select>
                    <h2>DESCRIPTION</h2>
                    <textarea required id="description">${tasks[i].description}</textarea>
                </div>
                <div class="form-section">
                    <h2>DUE DATE</h2>
                    <input id="date" type="date" value="${tasks[i].date}">
                    <h2>URCENCY</h2>
                    <select id="urgency">
                        ${renderOptionFields(tasks[i].urgency, urgencies)}
                    </select>
                    <div class="assignment-container">
                        <div id="assignmentBox" class="assignment-box d-none"></div>
                        <h2>ASSIGNED TO</h2>
                        <img onclick="showAssignBox()" src="img/icon-plus.png" alt="">
                        <div id="assignment" class="assignment-button-container">
                            <button class="cancel-button" onclick="hide('overlay'); event.preventDefault()">
                                CANCEL
                            </button>
                            <button class="assign-button" onclick="saveEdit(tasks, ${i})">
                                UPDATE TASK
                            <button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `;
}

// render users in select field, st that value can be passed?
function showUsersHTML(showUser) {
    return /*html*/ `
    <div class="user-box" onclick="addUser('${users.indexOf(showUser)}')">
    <span class="light-text">
        <span>${showUser['img']}</span>
        Name: <b>${showUser['name']}</b><br>
        E-Mail: <span>${showUser['email']}</span>
    </span>
    </div>
    `
}

function renderAssignedUser(){
    //for each user in assignedTo (if several users can be assigned? [] )
    return /*html*/``;
}

//show user box when clicking on user-icon
function userBoxHTML(user){
    return /*html*/ `
    <div class="user-box" onclick="addUser('${users.indexOf(showUser)}')">
    <span class="light-text">
        <span>${showUser['img']}</span>
        Name: <b>${showUser['name']}</b><br>
        E-Mail: <span>${showUser['email']}</span>
    </span>
    </div>
    `
}

/**
 * This function renders all options from a given array of values in an html select field
 * @param {string} selected - the pre-selected element/option
 * @param {string[]} dataArray - array with string values of all options
 * @returns {string} - html that creates option fields
 */
function renderOptionFields(selected, dataArray) {
    str = '';
    for (let i = 0; i < dataArray.length; i++) {
        let el = dataArray[i];
        str += /*html*/ `<option value="${el}" ${renderSelected(selected,el)}>${el}</option>`;
    }
    return str;
}

/**
 * This function compares a set value of a given element against the current value of a select field and returns the attribut 'selected' if they match (comparison is case-insensitive)
 * @param {string} option 
 * @param {string} value 
 * @returns {(string | undefined)} - returns 'selected' if true
 */
function renderSelected(option, value) {
    if (option.toLowerCase() == value.toLowerCase()) {
        return 'selected';
    }
}