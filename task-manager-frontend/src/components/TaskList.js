import React, {useState, useEffect} from "react";
import axios from 'axios';
import { API_BASE_URL } from "../config";
import Task from './Task';
import CreateTaskForm from './CreateTaskForm';



const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/tasks`);
                setTasks(response.data);
            } catch (error){
                setError('Error fetching tasks. Please try again later.');
                console.error(error);
            }
        };
        fetchTasks();
    }, []);

    const handleTaskCreated = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    const handleTaskDeleted = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return(
        <div>
            <h2>Task List</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <CreateTaskForm onTaskCreated={handleTaskCreated} />
            {tasks.map(task => (
                <Task key={task.id} task={task} onTaskUpdate={handleTaskUpdated} onTaskDelete={handleTaskDelete} />
            ))}
        </div>
    );
    
};

export default TaskList;