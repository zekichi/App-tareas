
import React, {useState} from "react";
import axios from 'axios';
import { API_BASE_URL } from "../config";

const CreateTaskForm = ({onTaskCreated}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/tasks`, {
                title,
                description
            });
            onTaskCreated(response.data);
        } catch (error) {
            setError('Error creating task. Please try again.');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Task</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Create Task</button>
        </form>
    );
};

export default CreateTaskForm;