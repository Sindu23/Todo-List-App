import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
    let [todos, setTodos] = useState([{task: "Sample Task", id: uuidv4(), completed: false, isEdit: false}]);
    let [newTodo, setNewTodo] = useState("");
    let [editTodo, setEditTodo] = useState("");

    let addNewTodo = () => {
        setTodos([...todos, {task: newTodo, id: uuidv4(), completed: false, isEdit: false}]);
        setNewTodo("");
    };

    let updateTodo = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    let markAsDone = (id) => {
        setTodos(todos.map((todo) => 
            todo.id === id ? 
        {...todo, completed: !todo.completed} : 
        todo));
    };

    let editTodoValue = (id, task) => {
        setTodos(todos.map((todo) => 
            todo.id === id ? 
        {...todo, isEdit: true} : 
        todo));
        setEditTodo(task);
    };

    let updateEditTodo = (event) => {
        setEditTodo(event.target.value);
    };

    let saveEditTodoValue = (id) => {
        setTodos(todos.map((todo) => 
        todo.id === id ? {...todo, task: editTodo, isEdit: false} :
    todo)); 
    setEditTodo("");
    };

    let activeTodos = todos.filter(todo => !todo.completed);
    let completedTodos = todos.filter(todo => todo.completed);

    return (
        <div>
            <h2>Todo List App</h2>
            <br />

            <input type="text" 
            placeholder="add a task"
            value={newTodo}
            onChange={updateTodo} 
            className="input"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;

            <button onClick={addNewTodo} 
            style={{backgroundColor: "#0D47A1", color: "#fff"}}>
                Add
            </button>
            <br />

            {/* Active tasks */}
            <h4>Today's Tasks</h4>
            
            <ul style={{ padding: "0" }} className="Active-ui">
                {activeTodos.map((todo) => (
                    <li key={todo.id}>
                        <div className="task-and-checkbox">
                            <input 
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => markAsDone(todo.id)}
                            />
                            &nbsp;&nbsp;
                            {todo.isEdit ? (
                                <>
                                <input 
                                type="text"
                                value={editTodo || ""}
                                onChange={updateEditTodo}
                                className="editTodo"
                                />
                                <button 
                                onClick={() => saveEditTodoValue(todo.id)}
                                style={{
                                backgroundColor: "#0D47A1",
                                color: "#fff",
                                marginLeft: "32px"}}>
                                    Save
                                </button>
                                </>
                ) : (
                    <span
                        style={{
                            textDecoration: todo.completed ? "line-through" : "none",
                        }}
                        className="todo-task"
                    >
                        {todo.task}
                    </span>
                )}
            </div>

            {!todo.isEdit && (
                <div className="todo-btn">
                    <button
                        onClick={() => editTodoValue(todo.id, todo.task)}
                        style={{ backgroundColor: "#0D47A1", color: "#fff"}}
                    >
                        <i className="fa-solid fa-pen"></i>
                    </button>

                    <button
                        onClick={() => deleteTodo(todo.id)}
                        style={{ backgroundColor: "red", color: "#fff" }}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            )}
        </li>
    ))}
</ul>



            {/* Completed tasks */}
            {completedTodos.length > 0 && (
                <>
                    <h4>Completed Tasks</h4>

                    <ul className="Completed-ul">
                        {completedTodos.map((todo) => (
                            <li key={todo.id} style={{listStyleType: "none", padding: "0"}}>
                                <div>
                                <input type="checkbox" 
                                checked={todo.completed}
                                onChange={() => markAsDone(todo.id)}
                                /> 
                                &nbsp;&nbsp;

                                <span style={{textDecoration: "line-through"}}>
                                    {todo.task}
                                </span>
                                </div>

                                <button onClick={() => deleteTodo(todo.id)}
                                    style={{backgroundColor: "red", color: "#fff"}}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
