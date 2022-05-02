let tasks = [{
        id: 0,
        title: 'a',
        description: 'a',
        category: 'Management',
        urgency: 'high',
        date: '2022-04-20',
        board: 'todo'
    },
    {
        id: 1,
        title: 'b',
        description: 'b',
        category: 'Management',
        urgency: 'intermediate',
        date: '2022-04-27',
        board: 'todo'
    },
    {
        id: 2,
        title: 'c',
        description: 'c',
        category: 'Management',
        urgency: 'low',
        date: '2022-04-27',
        board: 'todo'
    },
    {
        id: 3,
        title: 'd',
        description: 'd',
        category: 'Management',
        urgency: 'High',
        date: '2022-04-27',
        board: 'todo'
    },
    {
        id: 4,
        title: 'e',
        description: 'e',
        category: 'Management',
        urgency: 'High',
        date: '2022-04-27',
        board: 'todo'
    },
    {
        id: 5,
        title: 'f',
        description: 'f',
        category: 'Management',
        urgency: 'High',
        date: '2022-04-27',
        board: 'todo'
    }
];
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
        },
    ]
    // example or default categories, can be modified by the user
let categories = ['Management', 'Software Developement', 'UX/UI Design', 'Human Resources'];
//
// let urgencies = ['High','Middle','Low'];
let urgencies = ['High', 'Intermediate', 'Low'];

/**
 *  The function is used to save and convert tasks in form of a JSON-array from the addTask function to a string 
 */
function saveTasks() {
    let tasksAsText = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksAsText);
}

/**
 *  The function is used to laod and convert the tasks from text-format to a JSON-array
 */
function loadTasks() {
    let tasksAsText = localStorage.getItem('tasks');
    if (tasksAsText) {
        tasks = JSON.parse(tasksAsText);
    }
}

/*TEST:::: These functions save and load Array in form of strings and JSONs */

function saveEverything(items) {

    localStorage.setItem(`${items}`, JSON.stringify(items));
}

function loadEverything(items) {
    localStorage.getItem(`${items}`)
    if (localStorage.getItem(`${items}`)) {
        items = JSON.parse(localStorage.getItem(`${items}`));
    }
}