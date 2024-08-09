// src/components/TeamleadDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';
import { getProjects } from '../services/projectService';
import { createTask, getTasksByProject } from '../services/taskService';

const TeamleadDashboard = () => {
    const user = getCurrentUser();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        assignedTo: '',
        status: 'Pending',
        deadline: '',
    });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        const fetchedProjects = await getProjects();
        const myProjects = fetchedProjects.filter((project) => project.owner === user._id);
        setProjects(myProjects);
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await createTask({ ...taskData, projectId: selectedProject._id });
            loadTasks(selectedProject._id);
            setTaskData({ title: '', description: '', assignedTo: '', status: 'Pending', deadline: '' });
        } catch (err) {
            console.error('Error creating task', err);
        }
    };

    const loadTasks = async (projectId) => {
        const fetchedTasks = await getTasksByProject(projectId);
        setTasks(fetchedTasks);
    };

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        loadTasks(project._id);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container">
            <h2>Teamlead Dashboard</h2>
            <p>Welcome, {user.username}</p>

            <h3>Projects</h3>
            <ul>
                {projects.map((project) => (
                    <li key={project._id} onClick={() => handleProjectSelect(project)}>
                        <h4>{project.name}</h4>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul>

            {selectedProject && (
                <>
                    <h3>Tasks for {selectedProject.name}</h3>
                    <ul>
                        {tasks.map((task) => (
                            <li key={task._id}>
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                                <p>Assigned To: {task.assignedTo}</p>
                                <p>Status: {task.status}</p>
                                <p>Deadline: {task.deadline}</p>
                            </li>
                        ))}
                    </ul>

                    <h3>Create Task</h3>
                    <form onSubmit={handleCreateTask}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={taskData.title}
                                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                className="form-control"
                                value={taskData.description}
                                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Assign To:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={taskData.assignedTo}
                                onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Deadline:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={taskData.deadline}
                                onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Create Task</button>
                    </form>
                </>
            )}

            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
};

export default TeamleadDashboard;
