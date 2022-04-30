let tasks = [{
        title: 'a',
        description: 'a',
        category: 'Management',
        urgency: 'high',
        date: '2022-04-20',
        board: 'todo'
    },
    {
        title: 'b',
        description: 'b',
        category: 'Management',
        urgency: 'intermediate',
        date: '2022-04-27',
        board: 'todo'
    },
    {
        title: 'c',
        description: 'c',
        category: 'Management',
        urgency: 'low',
        date: '2022-04-27',
        board: 'todo'
    },
    {
        title: 'd',
        description: 'd',
        category: 'Management',
        urgency: 'High',
        date: '2022-04-27',
        board: 'todo'
    },
    {
        title: 'e',
        description: 'e',
        category: 'Management',
        urgency: 'High',
        date: '2022-04-27',
        board: 'todo'
    },
    {
        title: 'f',
        description: 'f',
        category: 'Management',
        urgency: 'High',
        date: '2022-04-27',
        board: 'todo'
    }
];
// example data for testing purposes
let members = [{
            name: 'Jolene Bauer',
            email: 'jo@test.at',
            color: '',
            img: ''
        },
        {
            name: 'Jimmmy Dude',
            email: 'dude@company.com',
            color: '',
            img: ''
        },
        {
            name: 'Max Mo',
            email: 'donot@email.me',
            color: '',
            img: ''
        },
        {
            name: 'Maja',
            email: 'maja@muster.mix',
            color: '',
            img: ''
        },
    ]
// example or default categories, can be modified by the user
let categories = ['Management', 'Software Developement', 'UX/UI Design', 'Human Resources'];
//
let urgencies = [];

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