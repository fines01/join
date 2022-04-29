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

function boardTaskHTML(task, i) {
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${i})" id="task-${i}" class="backround-urgency-${(task.urgency).toLowerCase()} task">
            <h4>${task.title}</h4>
            <span class="light-text">
                Priority: <b>${task.urgency}</b><br>
                Due date: <span>${task.date}</span>
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
    <div class="overlay">
        <div class="">
            <div class="add-to-task-sub-menu">
                <h1>Update Task</h1>
                <p>Learning Management System Project</p>
            </div>
        </div>

        <div class="task-input-wrap">
            <div class="task-input-container">
                <form class="form-field">
                    <div>
                        <h2>TITLE</h2>
                        <input required id="title" placeholder="Enter a title" value="${tasks[i].title}">
                        <h2>CATEGORY</h2>
                        <select id="category" placeholder="Management">
                            ${renderCategoryOptions(tasks[i].category)}
                            <!-- <option value="Management"> Management</option>
                            <option value="Software Developement">Software Developement</option>
                            <option value="UX/UI Design">UX/UI Design</option>
                            <option value="Human Resources">Human Resources</option> -->
                        </select>
                        <h2>DESCRIPTION</h2>
                        <textarea required id="description" placeholder="Enter a description" >${tasks[i].description}</textarea>
                    </div>
                    <div>
                        <h2>DUE DATE</h2>
                        <input id="date" type="date" value="${tasks[i].date}">
                        <h2>URCENCY</h2>
                        <select id="urgency">
                            <!-- <option value="High" >High</option>
                            <option value="Intermediate" >Intermediate</option>
                            <option value="Low" >Low</option> -->
                            ${renderUrgencyOptions(tasks[i].urgency)}
                        </select>
                        <div class="assignment-container">
                            <h2>ASSIGNED TO</h2>
                            <div id="assignment" class="assignment-button-container">
                                <img src="img/icon-plus.png" alt="">
                                <button class="cancel-button" >CANCEL</button>
                                <button class="assign-button" onclick="saveEdit(tasks, ${i})">UPDATE TASK</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
}

function renderCategoryOptions(category) {
    str='';
    for (let i = 0; i  < categories.length; i++) {
        let el = categories[i];
        str += /*html*/ `<option value="${el}" ${renderSelected(category, el)}>${el}</option>`;
    }
    return str;
}

function renderUrgencyOptions(urgency){
    let urgencies = ['High', 'Intermediate','Low'];
    str = '';
    for (let i = 0; i < urgencies.length; i++) {
        let el = urgencies[i];
        str += /*html*/`<option value="${el}" ${renderSelected(urgency,el)}>${el}</option>`;
    }
    return str;
}

/**
 * This function compares a set value of a given element against the current value of a select field and returns the attribut 'selected' if they match (comparison is case-insensitive)
 * @param {string} option 
 * @param {string} value 
 * @returns {(string | undefined)} - returns 'selected' if true
 */
function renderSelected(option, value){
    console.log(option,value);
    if (option.toLowerCase() == value.toLowerCase()){
        console.log('selected:',value);
        return 'selected';
    }
}