import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Task = ({ task, onTaskUpdate, onTaskDelete }) => {
  const handleEdit = async () => {
    const newTitle = prompt('Enter new title', task.title);
    const newDescription = prompt('Enter new description', task.description);
    if (newTitle && newDescription) {
      try {
        const response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, {
          title: newTitle,
          description: newDescription,
        });
        onTaskUpdate(response.data);
      } catch (error) {
        console.error('There was an error updating the task',error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${task.id}`);
      onTaskDelete(task.id);
    } catch (error) {
      console.error('There was an error deleting the task',error);
    };
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;
