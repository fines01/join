let tasks = [];
// example data for testing purposes
let users = [{
        name: 'Jolene Bauer',
        email: 'jo@test.at',
        color: 'orange',
        img: '',
        status: false
    },
    {
        name: 'Jimmmy Dude',
        email: 'dude@company.com',
        color: 'green',
        img: '',
        status: false
    },
    {
        name: 'Max Mo',
        email: 'donot@email.me',
        color: 'blue',
        img: '',
        status: false
    },
    {
        name: 'Maja',
        email: 'maja@muster.mix',
        color: 'red',
        img: '',
        status: false
    }
];
// example or default categories, can be modified by the user
let categories = ['Management', 'Software Developement', 'UX/UI Design', 'Human Resources'];
//
// let urgencies = ['High','Middle','Low'];
let urgencies = ['High', 'Intermediate', 'Low'];

/**
 *  The function is used to save and convert tasks in form of a JSON-array from the addTask function to a string 
 */

/*TEST:::: These functions save and load Array in form of strings and JSONs */
/* 
function saveEverything(items) {

    localStorage.setItem(`${items}`, JSON.stringify(items));
}

function loadEverything(items) {
    localStorage.getItem(`${items}`)
    if (localStorage.getItem(`${items}`)) {
        items = JSON.parse(localStorage.getItem(`${items}`));
    }
} */