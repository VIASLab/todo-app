const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Asegúrate de habilitar CORS para permitir las solicitudes desde el frontend
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Habilitar CORS

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/todo-app')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Definir el modelo de Tarea
const TaskSchema = new mongoose.Schema({
    text: String,
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', TaskSchema);

// Rutas API
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
