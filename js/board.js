/**
 * This Function used  for rendering the boards with filters
 */
function renderBoards() {

    renderEachBoard('todoBoard', 'todo');
    renderEachBoard('inProgressBoard', 'inProgress');
    renderEachBoard('testingBoard', 'testing');
    renderEachBoard('doneBoard', 'done');
}

/**
 * This Function shows/refreshes all boards filtered with categorys to also allow drag and drop 
 */
function renderEachBoard(boardName, boardId) {
    boardName = tasks.filter(t => t['board'] == `${boardId}`);
    getId(`${boardId}Board`).innerHTML = '';
    for (let i = 0; i < boardName.length; i++) {
        const element = boardName[i];
        const taskIndex = tasks.indexOf(element);
        getId(`${boardId}Board`).innerHTML += boardTaskHTML(element, taskIndex);
    }
}



/**
 * This function saves the current id of the dragged task 
 */
function startDragging(id) { // i only for testing purposes
    currentDraggedElement = id;
}
/**
 * This function makes the div container droppable
 */
function allowDrop(ev) {
    ev.preventDefault();
}
/**
 * This function gives the task the new category. The category depends on the dropped board 
 */
function moveTo(board) {
    tasks[currentDraggedElement]['board'] = board;
    saveTasks();
    renderBoards()
}
/**
 * This function shows move buttons on responsive view when arrow image is clicked 
 */
function showMoveButtons(i) {
    let moveButtonBox = document.getElementById('moveButtonBox' + i)

    if (moveButtonBox.classList.contains('d-none')) {
        moveButtonBox.classList.remove('d-none')
        moveButtonBox.classList.add('move-button-box-transition-in')
    } else {
        moveButtonBox.classList.add('d-none')
    }
}

/**
 * This function Moves a given task to the passed target-board
 * @param {integer} i - tasks index
 * @param {string} targetBoard - name of board
 */
function moveToBoard(i, targetBoard) {
    console.log(targetBoard);
    tasks[i]['board'] = targetBoard;
    saveTasks();
    renderBoards();
}