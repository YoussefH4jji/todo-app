import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <section className="main-page">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12">
            <h1 className="title">Remind.Me</h1>
            <div className="main-page-title-container">
              <h2 className="main-page-title">
                Stay Organized, <br /> Stay Relaxed
              </h2>
              <Link to="/todo-list">
                <button className="btn main-page-btn">Get Started</button>
              </Link>
            </div>
          </div>
          <div className="col-sm-6">
            <img
              src="../img/productive.png"
              alt="Check List"
              className="check-list-img img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
