import React, {useState, useEffect} from "react";
import Task from './Task';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/tasks');
                setTasks(response.data);
            } catch (error){
                console.error('Error fetching tasks', error);
            }
        };
        fetchTasks();
    }, []);

    const handleEdit = (taskId) => {
        // Lógica para editar una tarea
    };

    const handleDelete = async (taskId) => {
        try{
            await axios.delete('/api/tasks/${taskId}');
            setTasks(tasks.filter(task = task.id !== taskId));
        } catch (error){
            console.error('Error deleting task', error);
        }
    };

    return(
        <div>
            <h2>Task List</h2>
            {tasks.map(task => (
                <Task key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
        </div>
    );
    
};

export default TaskList;