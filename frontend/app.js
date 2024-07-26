document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Cargar tareas desde el servidor
    fetch('http://localhost:5000/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.textContent = task.text;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function() {
                    fetch(`http://localhost:5000/api/tasks/${task._id}`, { method: 'DELETE' })
                        .then(() => taskList.removeChild(taskItem));
                });

                taskItem.appendChild(deleteButton);
                taskList.appendChild(taskItem);
            });
        });

    // Añadir nueva tarea
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const taskText = taskInput.value;

        fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: taskText })
        })
        .then(response => response.json())
        .then(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                fetch(`http://localhost:5000/api/tasks/${task._id}`, { method: 'DELETE' })
                    .then(() => taskList.removeChild(taskItem));
            });

            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
        });

        taskInput.value = '';
    });
});
