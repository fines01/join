function loadTasks() {
    let tasksAsText = localStorage.getItem('tasks');
    if (tasksAsText) {
        tasks = JSON.parse(tasksAsText);
    }
}


function saveTasks() {
    let tasksAsText = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksAsText);
}