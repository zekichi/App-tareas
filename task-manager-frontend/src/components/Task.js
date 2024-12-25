import React from 'react';

const Task = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.content}</p>
    </div>
  );
};

export default Task;
