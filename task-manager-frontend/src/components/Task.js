import React from 'react';

const Task = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.content}</p>
      <button onClick={() => onEdit(task.id)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
