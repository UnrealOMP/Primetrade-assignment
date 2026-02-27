import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        headers,
      });
      const data = await res.json();
      if (data.success) {
  setTasks(Array.isArray(data.data) ? data.data : data.data.tasks || []);
}
    } catch (err) {
      setError("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const createTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers,
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      if (data.success) {
        setTitle("");
        setDescription("");
        fetchTasks();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to create task");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers,
    });
    fetchTasks();
  };

  // Toggle complete
  const toggleComplete = async (task) => {
    await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ completed: !task.completed }),
    });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
  <div className="dashboard">
    <h2>Dashboard</h2>

    <button className="logout-btn" onClick={logout}>
      Logout
    </button>

    <div className="task-form">
      <form onSubmit={createTask}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>

    <h3>Your Tasks</h3>

    <div className="task-list">
      {tasks.length === 0 && <p>No tasks yet</p>}

      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
       
            {/* 👇 Only show for admin */}
            {task.user && (
                 <small className="task-owner">
                   Assigned to: {task.user.name} ({task.user.email})
                 </small>
               )}
          </div>
       
          <div className="task-actions">
            <button
              className="complete-btn"
              onClick={() => toggleComplete(task)}
             >
              {task.completed ? "Undo" : "Complete"}
               </button>
       
             <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
         </div>
       ))}         
    </div>
  </div>
);
    
}