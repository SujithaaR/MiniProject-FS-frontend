// src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';
import { getTasksByUser, updateTaskStatus } from '../services/taskService';

const UserDashboard = () => {
    const user = getCurrentUser();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const fetchedTasks = await getTasksByUser(user._id);
        setTasks(fetchedTasks);
    };

    const handleStatusUpdate = async (taskId, status) => {
        try {
            await updateTaskStatus(taskId, status);
            loadTasks();
        } catch (err) {
            console.error('Error updating task status', err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container">
            <h2>User Dashboard</h2>
            <p>Welcome, {user.username}</p>

            <h3>Your Tasks</h3>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Deadline: {task.deadline}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleStatusUpdate(task._id, task.status === 'Pending' ? 'Completed' : 'Pending')}
                        >
                            {task.status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
};

export default UserDashboard;
