import "./App.css";
import { TodoList } from './components/ToDoList';

function App() {
	return (
		<div className="App">
			<div className="App-header">
				<h1>React Todo List</h1>
				{/* Todo list without context */}
				<TodoList/>
				{/* Todo list with context */}
			</div>
		</div>
	);
}

export default App;
