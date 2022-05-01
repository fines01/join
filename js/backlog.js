/* ********* Backlog ********* */

/**
 * Renders all logs from the tasks array
 */
function renderLogs() {
    let logs = getId('logs');
    logs.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        // for testing purposes:
        if (!tasks[i].assignedTo) {
            tasks[i].assignedTo = "Unassigned";
        }
        // 
        logs.innerHTML += logsHTML(tasks[i]);
    }
}