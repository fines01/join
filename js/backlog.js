/* ********* Backlog ********* */

/**
 * Renders all logs from the tasks array
 */
function renderLogs() {
    let logs = getId('logs');
    logs.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        // for testing purposes: [null] error
        if (!tasks[i].assignedTo || tasks[i].assignedTo.length < 1 || tasks[i].assignedTo[0] == null) {
            tasks[i].assignedTo = "Unassigned";
        }
        //
        logs.innerHTML += logsHTML(tasks[i]);
    }
}



function backlogToBoard(i) {
    tasks[i]['board'] = 'todo'
}