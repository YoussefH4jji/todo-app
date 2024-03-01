import { MdDeleteForever } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";


export default function TodoList({todos, setTodos}){
    function handleDelete({id}){
        setTodos(todos.filter((todo)=>(todo.id !==id)))
    }
    function handleComplete(todo) {
    setTodos(todos.map(item => {
        if (item.id === todo.id) {
            return { ...item, completed: !item.completed };
        }
        return item;
    }));
}


    
    return(
        <section className="todolist-section">
            <div className="todo-list-container">
            {todos.map((todo) => (
                <li className={`todo-list ${todo.completed? "completed": ""}`} key={todo.id}>
                <input
                type="text"
                value={todo.title}
                className={`list ${todo.completed? "completed": ""}`}
                onChange={(e) => { e.preventDefault() }}
                />
                <div >
                    <button className={`task-btns delete ${todo.completed? "completed": ""}`} onClick={()=>handleDelete(todo)}><MdDeleteForever/></button>
                    <button className={`task-btns complete ${todo.completed? "completed": ""}`}onClick={()=>handleComplete(todo)}><MdOutlineTaskAlt/></button>
                </div>


                </li>
            ))}
            </div>
        </section>
    )
}