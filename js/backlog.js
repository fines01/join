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

 function renderBacklogToBoard() {
    let boardSelector = document.getElementById("boardSelector");
    boardSelector.innerHTML = '';
    for (let j = 0; j < boards.length; j++) {
        boardValue = boards[j]['boardsId'];
        boardSelector.innerHTML += `
        <option id="${boards[j]['boardsId']}" value ="${boards[j]['boardTitle']}" onclick="backlogToSelectedBoard(${boardValue})">${boards[j]['boardTitle']}</option>
            `
    }
}


function backlogToSelectedBoard(i, boardValue) {
   
    tasks[i]['board'] = boardValue;
    renderLogs()
    saveTasks();
}


function backlogToBoard(i) {
    tasks[i]['board'] = 'todo';
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