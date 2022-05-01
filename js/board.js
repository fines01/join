/**
 * Function shows/refreshes all boards filtered with categorys to also allow drag and drop 
 */
function renderBoards() {

    let todoBoard = tasks.filter(t => t['board'] == 'todo');

    getId('todoBoard').innerHTML = '';

    for (let i = 0; i < todoBoard.length; i++) {
        const element = todoBoard[i];
        const taskIndex = tasks.indexOf(element);
        getId('todoBoard').innerHTML += boardTaskHTML(element, taskIndex);

    }

    let inProgressBoard = tasks.filter(t => t['board'] == 'inProgress');

    getId('inProgressBoard').innerHTML = '';

    for (let i = 0; i < inProgressBoard.length; i++) {
        const element = inProgressBoard[i];
        const taskIndex = tasks.indexOf(element);
        getId('inProgressBoard').innerHTML += boardTaskHTML(element, taskIndex);

    }

    let testingBoard = tasks.filter(t => t['board'] == 'testing');

    getId('testingBoard').innerHTML = '';

    for (let i = 0; i < testingBoard.length; i++) {
        const element = testingBoard[i];
        const taskIndex = tasks.indexOf(element);
        getId('testingBoard').innerHTML += boardTaskHTML(element, taskIndex);

    }

    let doneBoard = tasks.filter(t => t['board'] == 'done');

    getId('doneBoard').innerHTML = '';

    for (let i = 0; i < doneBoard.length; i++) {
        const element = doneBoard[i];
        const taskIndex = tasks.indexOf(element);
        getId('doneBoard').innerHTML += boardTaskHTML(element, taskIndex);

    }
}

/**
 * saves the current id of the dragged task 
 */
function startDragging(id) { // i only for testing purposes
    currentDraggedElement = id;
}
/**
 * makes the div container droppable
 */
function allowDrop(ev) {
    ev.preventDefault();
}
/**
 * gives the task the new category. The category depends on the dropped board 
 */
function moveTo(board) {
    tasks[currentDraggedElement]['board'] = board;
    saveTasks();
    renderBoards()
}
/**
 * shows move buttons on responsive view when arrow img is clicked 
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
 * generated task will be moved to the todo board
 */
function moveToTodo(i) {
    const targetBoard = 'todo'
    tasks[i]['board'] = targetBoard;
    saveTasks();
    renderBoards()
}
/**
 * generated task will be moved to the in progress board
 */
function moveToInProgress(i) {
    const targetBoard = 'inProgress'
    tasks[i]['board'] = targetBoard;
    saveTasks();
    renderBoards()
}
/**
 * generated task will be moved to the testing board
 */
function moveToTesting(i) {
    const targetBoard = 'testing'
    tasks[i]['board'] = targetBoard;
    saveTasks();
    renderBoards()
}
/**
 * generated task will be moved to the done board
 */
function moveToDone(i) {
    const targetBoard = 'done'
    tasks[i]['board'] = targetBoard;
    saveTasks();
    renderBoards()
}