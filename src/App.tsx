import "./App.css";
import { TodoList } from './components/ToDoList';
import { TodoProvider
	
 } from "./providers/TodoContext";
function App() {
	return (
		<div className="App">
			<div className="App-header">
				<h1>React Todo List</h1>
\				<TodoProvider>
   				<TodoList />
				</TodoProvider>
			</div>
		</div>
	);
}

export default App;
