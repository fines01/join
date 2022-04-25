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
                <p>${capitalizeFirst(task.description)}</p>
            </div>
        </div>`;
}

function boardTaskHTML(task) {
    return /*html*/`
        <div class="task">
            <h4>${task.title}</h4>
            <span class="light-text">
                Priority: <b>${task.urgency}</b><br>
                Due date: <span>${task.date}</span>
            </span>
            <p>Description...</p>
            <div class="task-links">
                <a href="#">edit</a>
                <a href="#">delete</a>
            </div>
        </div>
    `;
}