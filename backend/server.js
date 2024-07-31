const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware para body-parser
app.use(bodyParser.json());

// Configurar CORS para permitir solicitudes desde tu frontend en GitHub Pages
app.use(cors({
  origin: 'https://viaslab.github.io' // Reemplaza con la URL de tu frontend
}));

// Conectar a MongoDB
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://ortiso:W9upcFZpSMi50ssw@ac-af0bj1v.gcdrtgg.mongodb.net/MONGODB_URI?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000, // Aumenta el timeout a 50 segundos
  socketTimeoutMS: 60000 // Aumenta el socket timeout a 60 segundos
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Salir si no se puede conectar a la base de datos
  });

// Definir el modelo de Tarea
const TaskSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', TaskSchema);

// Rutas API
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Error fetching tasks', details: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ error: 'Error adding task', details: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Error deleting task', details: err.message });
  }
});

// Ruta raíz para comprobar el estado del servidor
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
