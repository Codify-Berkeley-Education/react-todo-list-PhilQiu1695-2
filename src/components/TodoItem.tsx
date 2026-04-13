import { Task } from "../types/taskTypes";

type TodoItemProps = {
  task: Task;
  HandleToggleCompleteTask: (taskNameToComplete: string) => void;
  HandleDeleteTask: (taskNameToDelete: string) => void;
};

export const TodoItem = ({ task, HandleToggleCompleteTask, HandleDeleteTask }: TodoItemProps) => {
  return (
    <div className="todo-item">
=      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => HandleToggleCompleteTask(task.id)} 
      />

      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.taskName}
      </span>

      {task.deadline !== undefined && (
        <span> (Due in: {task.deadline} days)</span>
      )}

      <button onClick={() => HandleDeleteTask(task.id)}>Delete</button>
    </div>
  );
};