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