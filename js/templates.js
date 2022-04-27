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
                <img class="delete-task" src="img/delete-24.png" onclick="deleteTask(${i})" alt="delete icon">
                <img class="edit-task" src="img/edit-24.png" onclick="editTask(${i})" alt="edit icon">
            </div>
        </div>
    `;
}


/*edit function needs to be implemented

<a onclick="editTask('${task}')" href="#">edit</a> */