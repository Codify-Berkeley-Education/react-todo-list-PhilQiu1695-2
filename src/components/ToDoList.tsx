import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../types/taskTypes";
import { stringWidth } from "bun";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [deadline, setDeadline] = useState<number | undefined>(undefined);
  const [todoList, setTodoList] = useState<Task[]>([]);

  const addTask = () => {
    if (taskName === "") return;

    const newTask: Task = {
      id: uuidv4(),
      taskName: taskName,
      deadline: deadline,
      completed: false,
    };

    setTodoList([...todoList, newTask]);
    setTaskName("");
    setDeadline(undefined);
  };

  const handleDeleteTask = (taskNameToDelete : string) => {
    setTodoList(todoList.filter((task) => task.id !== taskNameToDelete));
  }

  const handleToggleCompleteTask = (taskNameToComplete : string) => {
    setTodoList(todoList.map((task) => 
        task.id === taskNameToComplete ? { ...task, completed: !task.completed } : task ));
}

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
      <button onClick={addTask}>Add Task</button>

    <div className="todo-list">
      {todoList.map((task: Task) => (
    <TodoItem 
      key={task.id} 
      task={task} 
      handleDeleteTask={handleDeleteTask} 
      handleToggleCompleteTask={handleToggleCompleteTask} 
    />
    ))}
    </div>

      <p>Task Name: {taskName}</p>
    </div>
  );
};