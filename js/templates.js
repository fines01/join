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