import { Task } from "../types/taskTypes";

type TodoItemProps = {
  task: Task;
  handleToggleCompleteTask: (taskNameToComplete: string) => void;
  handleDeleteTask: (taskNameToDelete: string) => void;
};

export const TodoItem = ({ task, handleToggleCompleteTask, handleDeleteTask }: TodoItemProps) => {
  return (
    <div className="todo-item">
=      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => handleToggleCompleteTask(task.id)} 
      />

      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.taskName}
      </span>

      {task.deadline !== undefined && (
        <span> (Due in: {task.deadline} days)</span>
      )}

      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
    </div>
  );
};