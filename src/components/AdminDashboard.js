// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';
import { createProject, getProjects } from '../services/projectService';

const AdminDashboard = () => {
    const user = getCurrentUser();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        owner: '', // You will list Teamleads here
    });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            await createProject({ ...projectData, createdBy: user._id });
            loadProjects();
            setProjectData({ name: '', description: '', owner: '' });
        } catch (err) {
            console.error('Error creating project', err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container">
            <h2>Admin Dashboard</h2>
            <p>Welcome, {user.username}</p>

            <h3>Create Project</h3>
            <form onSubmit={handleCreateProject}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={projectData.name}
                        onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        className="form-control"
                        value={projectData.description}
                        onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Assign Teamlead:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={projectData.owner}
                        onChange={(e) => setProjectData({ ...projectData, owner: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Project</button>
            </form>

            <h3>Projects</h3>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>
                        <h4>{project.name}</h4>
                        <p>{project.description}</p>
                        <p>Owner: {project.owner}</p>
                        {/* Add functionality to view tasks related to this project */}
                    </li>
                ))}
            </ul>

            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
};

export default AdminDashboard;
