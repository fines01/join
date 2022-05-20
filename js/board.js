
let boards = [{
    'boardTitle': 'TODO',
    'boardName': 'todoBoard',
    'boardId': 'todo'
},
{
    'boardTitle': 'IN PROGRESS',
    'boardName': 'inProgressBoard',
    'boardId': 'inProgress'
}];


/**
 * This Function used  for rendering the boards with filters
 */
function renderBoards() {

    let boardsContent = document.getElementById('boardContent');
    boardsContent.innerHTML = '';
    for (let i = 0; i < boards.length; i++) {
        boardsContent.innerHTML += `
        <div>
        <h2>${boards[i]['boardTitle']}</h2>
        <div class="scroll-bar" id="scroll-bar">
            <div id="${boards[i]['boardName']}" class="board-task-container" ondrop="moveTo('${boards[i]['boardId']}')" ondragover="allowDrop(event)"></div>
        </div>
           `
        renderEachBoard(boards[i]['boardName'], boards[i]['boardId']);
    }
}
/* Was fehlt input mit Knopf, ordentlicher json, style für das zeug. */
/* boardId = todo boardName = todoBoard */

function addNewBoard() {

    let board = processBoardInputs();
    boards.push(board);
    saveBoards();
    renderBoards();
}

function processBoardInputs() {

    let boardInput = document.getElementById('newBoard').value;
    boardId = boardInput.split(" ").join("");
    let boardName = `${boardId}Board`;
    boardTitle = boardId.toUpperCase();

    let board = {
        //'id' : id,
        'boardTitle': boardTitle,
        'boardName': lowerFirstLetter(boardName),
        'boardId': lowerFirstLetter(boardId),
        
    };
    return board;
}


function clearInputsBoard() {
    clearInputValues();
}

/** renderEachBoard
 * This Function shows/refreshes all boards filtered with categorys and also allow drag and drop 
 */

function renderEachBoard(boardId, boardName) {
    boardId = tasks.filter(t => t['board'] == `${boardName}`);
    getId(`${boardName}Board`).innerHTML = '';
    for (let i = 0; i < boardId.length; i++) {
        const element = boardId[i];
        const taskIndex = tasks.indexOf(element);
        getId(`${boardName}Board`).innerHTML += boardTaskHTML(element, taskIndex);
    }
}


async function saveBoards() { //check async: no diff
    if (event) {
        event.preventDefault();
    }
    let boardsAsText = JSON.stringify(boards);
    await backend.setItem('boards', boardsAsText);
}

/**
 *  This function loads and converts boards from text-format to a JSON-array. 
 *  The preventDefault() function is necessary to prevent the page from reloading when adding a new board.
 */
function loadBoards() {
    if (event) {
        event.preventDefault();
    }
    let boardsAsText = backend.getItem('boards');
    if (boardsAsText) {
        boards = JSON.parse(boardsAsText);
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