import {v4 as uuidv4} from "uuid"
import TodoList from "./TodoList"
import { useState, useEffect } from "react"
import Timer from "./Timer"
import Settings from './Settings';
import SettingsContext from "./SettingsContext";
import Music from "./Music";
export default function Form({input,setInput,todos,setTodos}){
    const [quoteData, setQuoteData]=useState({})
    const [quote, setQuote]=useState("")
    const [author, setAuthor]=useState("")

    useEffect(()=>{
        fetch("https://api.quotable.io/random")
        .then(res=>res.json())
        .then(data=>{
            setQuoteData(data)
            setQuote(quoteData.content)
            setAuthor(quoteData.author)
        })
        
    },[])
    
    function handleChange(){        
        fetch("https://api.quotable.io/random")
        .then(res => res.json())
        .then(data => setQuoteData(data))
         setQuote(quoteData.content)
         setAuthor(quoteData.author)

    }

    function onInputChange(e){
        setInput(e.target.value)
    }
    function onFormSubmit(e){
        e.preventDefault()
        setTodos([...todos,{id:uuidv4(),title:input, completed:false}])
        setInput('')
    }

    const [showSettings,setShowSettings] = useState(false)
    const [workMinutes, setWorkMinutes] =useState('45')
    const [breakMinutes, setBreakMinutes]= useState('15')
    return(
        <section className="todoList-section">
           <div className="quote-container">
              <div className="quote">" {quote} "</div>
              <div className="author">{author}</div>
              <button id= "new-quote" onClick={handleChange} className="btn">New Quote</button>
           </div>


            <form onSubmit={onFormSubmit}>
                <div className="task-input-container">

                <input type="text" 
                placeholder="Enter A Task..." 
                className="task-input"
                value={input}
                required
                onChange={onInputChange}
                /> 
                <button className="btn add-task-btn">ADD</button>
                </div>

            </form>
           
            <div className='todoos'>
            <div className="timer-music-container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="timer">
                <SettingsContext.Provider value={
                   { 
                    showSettings,
                    setShowSettings,
                    workMinutes,
                    breakMinutes,
                    setWorkMinutes,
                    setBreakMinutes,
                }

                }>
                    {showSettings ?<Settings/> : <Timer/>}                
                </SettingsContext.Provider>
            </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                <TodoList todos={todos} setTodos={setTodos} />

                </div>
            </div>
            <div className="col-lg-4">
            <div className="music">
                <Music/>
            </div>
            </div>
            </div>
            </div>
        </section>
    )
}