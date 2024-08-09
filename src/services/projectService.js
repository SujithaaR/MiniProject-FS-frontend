// src/services/projectService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/projects';

export const createProject = async (projectData) => {
    const response = await axios.post(API_URL, projectData);
    return response.data;
};

export const getProjects = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
