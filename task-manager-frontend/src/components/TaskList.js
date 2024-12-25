import React from "react";
import Task from './Task';

const TaskList = () => {
    const tasks = [
        { id: 1, title: "Example Taks 1", content: "This is an example task." },
        { id: 2, title: "Example Task 2", content: "This is another example task." }
    ];
    return (
        <div>
            <h2>Task List</h2>
            {tasks.map(task => (
                <Task key={task.id} task={task}/>
            ))}
        </div>
    );
};

export default TaskList;