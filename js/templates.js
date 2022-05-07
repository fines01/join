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
                Category: <b>${element['category']}</b><br>
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
            <h2 class="edit-task-headline">UPDATE TASK</h2>
            <form class="form-field edit-form">
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
                    <h2>ASSIGN TO</h2>
                    <select multiple id="assignUser" class="">
                        ${renderUserOptionFields(tasks[i].assignedTo)}
                    </select>
                    <div class="assignment-container">
                        <div id="iconsContainer" class="assignment-button-container">
                            ${renderAssignedUsers(tasks[i].assignedTo)}                           
                        </div>
                    </div>
                    <div class="btn-box">
                        <button class="cancel-button" onclick="hide('overlay'); event.preventDefault()">
                            CANCEL
                        </button>
                        <button class="assign-button" onclick="saveEdit(tasks, ${i})">
                            UPDATE TASK
                        </button>
                    </div>
            </div>
        </form>
    </div>
    `;
}

function renderAssignedUsers(usersArr) {
    let iconsHTML = '';
    if(usersArr && usersArr.length > 0){
        for (let i = 0; i < usersArr.length; i++) {
            let user = usersArr[i];
            iconsHTML += renderUserIcon(user);
        }
    } else {
        iconsHTML = '<img src="img/icon-plus.png" alt="">';
    }
    return iconsHTML;
}

// returns up to 2 initials of a given user name
function extractInitials(userName){
    let splitNameArr = userName.split(' ');
    let initials = '';
    if (splitNameArr.length > 1) {
        for (let i = 0; i < 2; i++) { // max 2 initials 
            initials += splitNameArr[i][0] + ' '; // get first character (with a space) of every string/ name
        }
    } else {
        initials = splitNameArr[0][0]; // get first character
    }
    return initials;
}

function renderUserIcon(userName) {
    let user = users.filter(usr => usr.name == userName);
    // get initials (max 2 or 3)
    let initials = extractInitials(userName);
    return /*html*/ `<span id="icon-${userName}" class="user-icon" alt="user icon" style="background-color: ${user[0].color}">${initials}</span>`;
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
        let el = dataArray[i]; // if dataArray == 'users' el = dataArray[i].name
        str += /*html*/ `<option value="${el}" ${renderSelected(selected,el)}>${el}</option>`;
    }
    return str;
}
// TODO: maybe include in function above (one fkt?)
function renderUserOptionFields(selectedUsers = undefined) { // default undefined in case of adding a new task
    str = '';
    for (let i = 0; i < users.length; i++) {
        let el = users[i].name;
        str += /*html*/ `<option value="${el}" ${renderMultipleSelected(selectedUsers,el)} onclick="showSelectedUserIcon()">${el}</option>`;
    }
    return str;
}

function showSelectedUserIcon() {
    let selectedUsersArr = getAssignedUsers();
    getId('iconsContainer').innerHTML = renderAssignedUsers(selectedUsersArr);
}

/**
 * This function compares a set value of a given element against the current value of a select field and returns the attribut 'selected' if they match (comparison is case-insensitive)
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

// //user-box
// function showUsersHTML(showUser) {
//     return /*html*/ `
//     <div class="user-box" onclick="addUser('${users.indexOf(showUser)}')">
//     <span class="light-text">
//         <span>${showUser['img']}</span>
//         Name: <b>${showUser['name']}</b><br>
//         E-Mail: <span>${showUser['email']}</span>
//     </span>
//     </div>
//     `
// }