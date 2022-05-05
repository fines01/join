/* ********* Backlog ********* */

/**
 * Renders all logs from the tasks array
 */
function renderLogss() {
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


function renderLogsTest() {
    let backlog = tasks.filter(t => t['board'] == 'backlog');

    getId('logs').innerHTML = '';

    for (let i = 0; i < backlog.length; i++) {
        const element = backlog[i];
        const taskIndex = tasks.indexOf(element);
        getId('logs').innerHTML += logsHTML(element, taskIndex);

    }
}

function deleteBacklogTask(i) {
    tasks.splice(i, 1)
    renderLogsTest()
    saveTasks();
}