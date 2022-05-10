/* ********* Backlog ********* */

/**
 * This function renders all logs on the backlog site
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
/**
 * This function sends the tasks from backlog to the board 'todo'
 */
function backlogToBoard(i) {
    tasks[i]['board'] = 'todo'
    renderLogs()
    saveTasks();
}
/**
 * This function deletes a backlog task on click
 */
function deleteBacklogTask(i) {
    tasks.splice(i, 1);
    renderLogs();
    saveTasks();
}



//function renderLogss() {
//let logs = getId('logs');
//logs.innerHTML = '';

//for (let i = 0; i < tasks.length; i++) {
// for testing purposes: [null] error
// if (!tasks[i].assignedTo || tasks[i].assignedTo.length < 1 || tasks[i].assignedTo[0] == null) {
//   tasks[i].assignedTo = "Unassigned";
//}
//
//logs.innerHTML += logsHTML(tasks[i]);
//}
//}