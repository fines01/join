function logsHTML(task) {
    return /*html*/ `
        <div class="log">
            <div class="">
                 <h4 class="log-name">${task.assignedTo}</h4>
            </div>
            <div class="">
                <h4>${task.category}</h4>
            </div>
            <div class="">
                <h5>${capitalizeFirst(task.title)}</h5>
                <p>${capitalizeFirst(task.description)}</p>
            </div>
        </div>`;
}

//class="backround-urgency-${(task.urgency).toLowerCase()} task"
function boardTaskHTML(element, i) {
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${element['id']})"  id="task-${i}" class="backround-urgency-${(element['urgency']).toLowerCase()} task">
            <h4>${element['title']}</h4>
            <span class="light-text">
                Priority: <b>${element['urgency']}</b><br>
                Due date: <span>${element['date']}</span>
            </span>
            <p>Description...</p>
            <div class="task-links">
                <img class="delete-task" src="img/delete-24.png" onclick="deleteTask(tasks, ${i})" alt="delete icon">
                <img class="edit-task" src="img/edit-24.png" onclick="renderEditForm(${i})" alt="edit icon">
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
                <div class="form-section">
                    <h2>TITLE</h2>
                    <input required id="title" placeholder="Enter a title" value="${tasks[i].title}">
                    <h2>CATEGORY</h2>
                    <select id="category" placeholder="Management">
                        ${renderCategoryOptions(tasks[i].category)}
                    </select>
                    <h2>DESCRIPTION</h2>
                    <textarea required id="description" placeholder="Enter a description" >
                        ${tasks[i].description}
                    </textarea>
                </div>
                <div class="form-section">
                    <h2>DUE DATE</h2>
                    <input id="date" type="date" value="${tasks[i].date}">
                    <h2>URCENCY</h2>
                    <select id="urgency">
                        ${renderUrgencyOptions(tasks[i].urgency)}
                    </select>
                    <div class="">
                        <h2>ASSIGNED TO</h2>
                        <div id="assignment" class="assignment-button-container">
                            <img src="img/icon-plus.png" alt="">
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

function renderCategoryOptions(category) {
    str = '';
    for (let i = 0; i < categories.length; i++) {
        let el = categories[i];
        str += /*html*/ `<option value="${el}" ${renderSelected(category, el)}>${el}</option>`;
    }
    return str;
}

function renderUrgencyOptions(urgency) {
    let urgencies = ['High', 'Intermediate', 'Low'];
    str = '';
    for (let i = 0; i < urgencies.length; i++) {
        let el = urgencies[i];
        str += /*html*/ `<option value="${el}" ${renderSelected(urgency,el)}>${el}</option>`;
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