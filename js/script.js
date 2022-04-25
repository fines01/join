// generic functions
// 
function getId(el) {
    return document.getElementById(el);
}

function hide(...elements) { // rest-operator
    for (let i = 0; i < elements.length; i++) {
        getId(elements[i]).classList.add('d-none');
    }
}

function show(...elements) {
    for (let i = 0; i < elements.length; i++) {
        getId(elements[i]).classList.remove('d-none');
    }
}

function toggle(...elements) {
    for (let i = 0; i < elements.length; i++) {
        getId(elements[i]).classList.toggle('d-none');
    }
}


/* vergebene ID 
id="title"
id="category"
id="urgency"
id="discirption"
id="assignment"
id="date"

*/



/* addToTaskJS the function is meant to enable the add of task to a json array
*/
let tasks = [];
function addToTask() {

    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('category');
    let urgency = document.getElementById('urgency');
    let date = document.getElementById('date');

    let task = {
        'title': title.value,
        'description': description.value,
        'category': category.value,
        'urgency': urgency.value,
        'date': date.value
    };

    tasks.push(task);
    saveTasks();
    title.value = '';
    date.value = '';
    category.value = '';
    urgency.value = '';
    description.value = '';
}

/* The function is used to save the tasks in a JSON Array from the addTask function in a string */

function saveTasks() {
    let tasksAsText = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksAsText);
}

/* The function is used to laod the tasks from text-format to a JSON-array */

function loadTasks() {
    let tasksAsText = localStorage.getItem('tasks');
    if (tasksAsText) {
        tasks = JSON.parse(tasksAsText);
    }
}





