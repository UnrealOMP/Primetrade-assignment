import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/v1";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(data.data);
        }
      });
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {users.map(user => (
        <div key={user.id} className="admin-user-card">
          <h3>{user.name} ({user.role})</h3>
          <p>{user.email}</p>

          <h4>Tasks:</h4>
          {user.tasks.length === 0 && <p>No tasks</p>}

          {user.tasks.map(task => (
            <div key={task.id} className="admin-task">
              <span>{task.title}</span>
              <span>
                {task.completed ? "✅ Completed" : "❌ Pending"}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}