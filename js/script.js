/* vergebene ID 
id="title"
id="category"
id="urgency"
id="discirption"
id="assignment"
id="date"
id="logs"
id="todoBoard"
id="boardContainer"
id="inProgress"
id="testing"
id="done"

*/

/* ********* global scope - here we define global variables and constants *********  */

// example data for testing purposes

let currentDraggedElement;

// async function init() {
//      setURL('http://gruppe-228.developerakademie.net/smallest_backend_ever');
//      await downloadFromServer();
//      tasks = JSON.parse(backend.getItem('tasks')) || [];
// }

/**
 * function executes on load of the html body
 */
function initScript() {
    loadTasks(); // get tasks from local strage
    includeHTML();
}

function splitID(id, separator) {
    let arrayOfStrings = id.split(separator);
    return arrayOfStrings;
}

/* ********* generic functions ********* */

/**
 * Returns an HTML element
 * @param {string} id - The id of an HTML element
 * @returns {Object} - The corresponding HTML element
 */
function getId(id) {
    return document.getElementById(id);
}

/**
 * Returns an array with one or several HTML elements
 * @param {...string} idsArr - The id of one or several HTML elements
 * @returns {Object[]} elementArr - All corresponding HTML elements in an array
 */
function getIds(...idsArr) { // rest-operator
    elementArr = [];
    for (let i = 0; i < idsArr.length; i++) {
        elementArr.push(document.getElementById(idsArr[i]));
    }
    return elementArr;
}

/**
 * Hides all passed HTML elements
 * @param  {...string} ids - The id of one or several HTML elements
 */
function hide(...ids) {
    for (let i = 0; i < ids.length; i++) {
        getId(ids[i]).classList.add('d-none');
    }
}

/**
 * Displays all passed HTML elements
 * @param  {...string} ids - The id of one or several HTML elements
 */
function show(...ids) {
    for (let i = 0; i < ids.length; i++) {
        getId(ids[i]).classList.remove('d-none');
    }
}

/**
 * Toggles the view of all passed HTML elements
 * @param  {...string} ids - The id of one or several HTML elements
 */
function toggle(...ids) {
    for (let i = 0; i < ids.length; i++) {
        getId(ids[i]).classList.toggle('d-none');
    }
}

/**
 * Capitalizes the first letter of a string and returns the capitalized string
 * @param {string} str
 * @returns {string}
 */
function capitalizeFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
}

/**
 * This function takes html form and input elements and empties their value.
 * @param  {...Object} elements - HTML elements
 */
function clearInputValues(...elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].value = '';
    }
}

function showNavbar() {
    getId('nav-bar').classList.remove('hide-mobile');
    getId('mobile-x').classList.remove('d-none');
    getId('mobile-menu').classList.add('d-none')
}

function closeNavbar() {
    getId('nav-bar').classList.add('hide-mobile');
    getId('mobile-x').classList.add('d-none');
    getId('mobile-menu').classList.remove('d-none')
}