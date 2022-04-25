function logsHTML(task) {
    return /*html*/ `
        <div class="log">
            <div class="">
                 <h3 class="log-name">${task.assignedTo}</h3>
            </div>
            <div class="">
                <h3>${task.category}</h3>
            </div>
            <div class="">
                <p>${task.description}</p>
            </div>
        </div>`;
}

function boardTaskHTML(task) {
    return /*html*/`
        <div class="task">
            <h3>${task.title}</h3>
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