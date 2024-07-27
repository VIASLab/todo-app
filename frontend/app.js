document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Actualiza la URL del backend
    const backendUrl = 'https://todo-app-backend-jiht.onrender.com';

    console.log('Backend URL:', backendUrl);

    // Cargar tareas desde el servidor
    fetch(`${backendUrl}/api/tasks`)
        .then(response => response.json())
        .then(tasks => {
            console.log('Tasks fetched:', tasks);
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.textContent = task.text;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function() {
                    fetch(`${backendUrl}/api/tasks/${task._id}`, { method: 'DELETE' })
                        .then(() => taskList.removeChild(taskItem));
                });

                taskItem.appendChild(deleteButton);
                taskList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));

    // Añadir nueva tarea
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const taskText = taskInput.value;

        fetch(`${backendUrl}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: taskText })
        })
        .then(response => response.json())
        .then(task => {
            console.log('Task added:', task);
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                fetch(`${backendUrl}/api/tasks/${task._id}`, { method: 'DELETE' })
                    .then(() => taskList.removeChild(taskItem));
            });

            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
        })
        .catch(error => console.error('Error adding task:', error));

        taskInput.value = '';
    });
});
