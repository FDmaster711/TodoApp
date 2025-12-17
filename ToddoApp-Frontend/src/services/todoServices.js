import axios from 'axios';

export const getAllTodos = async () => {
    const response = await axios.get('/todos');
    return response.data.tasks;
};

export const createTodo = async (taskText, priority) => {
    const response = await axios.post('/todos', { 
        task: taskText, 
        priority: priority || 'Low' 
    });
    return response.data;
}

export const updateTodo = async (id, updates) => {
    const response = await axios.put(`/todos/${id}`, updates);
    return response.data;
}

export const deleteTodo = async (id) => {
    await axios.delete(`/todos/${id}`);
}