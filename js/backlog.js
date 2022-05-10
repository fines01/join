/* ********* Backlog ********* */

/**
 * Renders all logs from the tasks array
 */
function renderLogs() {
    let backlog = tasks.filter(t => t['board'] == 'backlog');

    getId('logs').innerHTML = '';

    for (let i = 0; i < backlog.length; i++) {
        const element = backlog[i];
        const taskIndex = tasks.indexOf(element);
        getId('logs').innerHTML += logsHTML(element, taskIndex);

    }
}

function backlogToBoard(i) {
    tasks[i]['board'] = 'todo'
    renderLogs()
    saveTasks();
}

function deleteBacklogTask(i) {
    tasks.splice(i, 1);
    renderLogs();
    saveTasks();
}