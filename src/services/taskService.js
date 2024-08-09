// src/services/taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

export const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
};

export const getTasksByProject = async (projectId) => {
    const response = await axios.get(`${API_URL}/project/${projectId}`);
    return response.data;
};
// src/services/taskService.js (same file)
export const getTasksByUser = async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
    const response = await axios.put(`${API_URL}/${taskId}`, { status });
    return response.data;
};

