import {
	type FC,
	createContext,
	useState,
	useContext,
	type ReactNode,
	useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../types/taskTypes";

type TodoContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "completed">) => void;
  HandleDeleteTask: (id: string) => void;
  HandleToggleCompleteTask: (id: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todoList, setTodoList] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? (JSON.parse(savedTasks) as Task[]) : [];
});

  const addTask = (taskData: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      completed: false,
  	};
  setTodoList([...todoList, newTask]);
  };

  const deleteTask = (taskNameToDelete : string) => {
	setTodoList(todoList.filter((task) => task.id !== taskNameToDelete));
  }

  const toggleCompleteTask = (taskNameToComplete : string) => {
	setTodoList(todoList.map((task) => 
		task.id === taskNameToComplete ? { ...task, completed: !task.completed } : task ));
  }

  useEffect(() => {localStorage.setItem("tasks", JSON.stringify(todoList));}, [todoList]);

  const value: TodoContextType = {
		// Todo 3.2
		tasks: todoList,
		addTask: addTask,
		HandleDeleteTask: deleteTask,
		HandleToggleCompleteTask: toggleCompleteTask,
  };

	return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = (): TodoContextType => {
	const context = useContext(TodoContext);
	if (context === undefined) {
		throw new Error("useTodo must be used within a TodoProvider");
	}
	return context;
};
