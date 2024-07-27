# Todo List App

![Todo List](https://github.com/tu-usuario/tu-repositorio/ruta-al-gif.gif)

Esta es una aplicación simple de lista de tareas hecha con Node.js, JavaScript, HTML y CSS. La aplicación permite agregar, eliminar y marcar tareas como completadas.

## Características

- Añadir nuevas tareas
- Eliminar tareas
- Marcar tareas como completadas
- Animaciones suaves para una mejor experiencia de usuario

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd tu-repositorio
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```
4. Inicia la aplicación:
    ```sh
    npm start
    ```

## Uso

Aquí tienes un ejemplo de cómo se ve la aplicación:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="todo-container">
        <h1 class="title">Todo List</h1>
        <input type="text" id="new-task" placeholder="New task">
        <button id="add-task">Add Task</button>
        <ul class="todo-list">
            <li class="todo-item">Task 1</li>
            <li class="todo-item">Task 2</li>
            <li class="todo-item">Task 3</li>
        </ul>
    </div>
</body>
</html>
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.todo-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
    font-size: 2em;
    margin-bottom: 10px;
    animation: fadeInDown 1s;
}

.todo-list {
    list-style: none;
    padding: 0;
}

.todo-item {
    background-color: #fafafa;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    animation: fadeInUp 0.5s;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
document.getElementById('add-task').addEventListener('click', function() {
    const newTaskInput = document.getElementById('new-task');
    const newTaskText = newTaskInput.value;

    if (newTaskText) {
        const newTask = document.createElement('li');
        newTask.className = 'todo-item';
        newTask.textContent = newTaskText;

        newTask.style.animation = 'fadeInUp 0.5s';
        document.querySelector('.todo-list').appendChild(newTask);
        newTaskInput.value = '';

        newTask.addEventListener('click', function() {
            newTask.style.animation = 'fadeOut 0.5s';
            newTask.addEventListener('animationend', function() {
                newTask.remove();
            });
        });
    }
});

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(20px);
    }
}
