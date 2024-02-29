import { Link } from "react-router-dom"
export default function MainPage(){
    return(
        <section className="main-page">
            <h1 className="title">Remind.me</h1>
            <div className="main-page-title-container">
                <h2 className="main-page-title">Stay Organized,
                <br/>Stay Relaxed</h2>
                <Link to='/todo-list'><button className="btn main-page-btn">Get Started</button></Link>
            </div>
            <img src="../img/productive.png" alt="Check List" className="check-list-img"/>
        </section>
    )
}