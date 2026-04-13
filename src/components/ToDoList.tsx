import React, { useState } from "react";
import { Task } from "../types/taskTypes";
import { stringWidth } from "bun";
import { TodoItem } from "./TodoItem";
import { TodoProvider, useTodo } from "../providers/TodoContext";


export const TodoList = () => {
  const { tasks, addTask, HandleDeleteTask, HandleToggleCompleteTask} = useTodo();
  const [taskName, setTaskName] = useState<string>("");
  const [deadline, setDeadline] = useState<number | undefined>(undefined);


const handleAdd = () => {
  if (taskName.trim() === "") return;
  
  const taskData = {
    taskName: taskName,
    deadline: deadline
  };

  addTask(taskData);
  setTaskName("");
  setDeadline(undefined);
};

  


    return (
    <div>
      <input
        type="text" 
        name="task"
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
        placeholder="Task Name..." 
      />
        <input 
        type="number" 
        value={deadline ?? ""}
        onChange={(e) => {
            const val = e.target.value;
            setDeadline(val === "" ? undefined : Number(val));
        }} 
        placeholder="Deadline..." 
        />
      <button onClick={handleAdd}>Add Task</button>

    <div className="todo-list">
      {tasks.map((task: Task) => (
    <TodoItem 
      key={task.id} 
      task={task} 
      HandleDeleteTask={HandleDeleteTask} 
      HandleToggleCompleteTask={HandleToggleCompleteTask} 
    />
    ))}
    </div>

      <p>Task Name: {taskName}</p>
    </div>
  );
};