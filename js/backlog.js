/* ********* Backlog ********* */

/**
 * Rnders all logs on the backlog site
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
 * Sends the tasks from backlog to the board 'todo'
 */
function backlogToBoard(i) {
    tasks[i]['board'] = 'todo'
    renderLogs();
    saveTasks();
    showSubmitSuccess();
}


/**
 * Deletes a backlog task on click
 */
function deleteBacklogTask(i) {
    tasks.splice(i, 1);
    renderLogs();
    saveTasks();
}


/**
 * Renders a notification after successfully submitting a new task to the board
 */
function showSubmitSuccess() {
    let taskSuccess = getId('submitSuccessModal');
    let taskName = processTaskInputs();
    taskSuccess.innerHTML = `The Task '${taskName['title']}' was moved to the <a href="01board.html" class="board-link">board</a>`;
    show('submitSuccessModal')
    //window.setTimeout(hide('taskSubmitSuccessful'), 5000);
    window.setTimeout(function () {
        hide('submitSuccessModal')
    }, 4000);
}