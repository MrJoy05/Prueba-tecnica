import { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' })

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
    if (response.ok) {
      fetchTasks();
      setNewTask({ title: '', description: '' })
    }
  }

  const updateTask = async (id, updatedTask) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    fetchTasks();
  }
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE'
    })
    fetchTasks()
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">Prueba técnica de listas</h1>
      <div className="mb-6 w-full max-w-lg">
        <div className="flex flex-col md:flex-row mb-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 mb-2 md:mb-0 md:mr-2 rounded w-full md:w-1/2"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 mb-2 md:mb-0 md:mr-2 rounded w-full md:w-1/2"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <button onClick={addTask} className="bg-green-500 text-white p-2 rounded md:ml-2 mt-2 md:mt-0">
            Add Task
          </button>
        </div>
      </div>
      <div className="w-full max-w-lg">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center mb-2 p-2 border rounded bg-gray-100">
              <input
                type="text"
                value={task.title}
                className="border p-2 mb-2 md:mb-0 md:mr-2 rounded w-full md:w-1/2"
                onChange={(e) => updateTask(task.id, { ...task, title: e.target.value })}
              />
              <input
                type="text"
                value={task.description}
                className="border p-2 mb-2 md:mb-0 md:mr-2 rounded w-full md:w-1/2"
                onChange={(e) => updateTask(task.id, { ...task, description: e.target.value })}
              />
              <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white p-2 rounded ml-2">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList
