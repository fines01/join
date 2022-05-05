function loadTasks() {
    let tasksAsText = backend.getItem('tasks');
    if (tasksAsText) {
        tasks = JSON.parse(tasksAsText);
    }
}


function saveTasks() {
    let tasksAsText = JSON.stringify(tasks);
    backend.setItem('tasks', tasksAsText);
}