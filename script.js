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



/* addToTaskJS */


function addToTask() {
    let title = getId('title');
    let discription = getId('discription');
    let category = ['management', 'production'];
    let urgency = ['low', 'middle', 'high'];

    let addToTask = {
        'title': title.value,
        'dueDate': dueDate,
        'category': category,
        'urgency': urgency,
        'discription': discription.value
    };

    title.value = '';
    discription.value = '';
}


function renderAddToTask() {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];

    }
}

/* JSON for addToTask Page  */

