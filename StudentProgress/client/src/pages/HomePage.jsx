import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-container">
        <h1 className="home-title">
          Добро пожаловать на наш сайт слежки за прогрессом студента
        </h1>

        <p className="home-subtitle">
          Здесь вы можете добавлять предметы, оценки и следить за своей средней успеваемостью.
        </p>

        <div className="home-buttons">
          <Link to="/register" className="home-link">
            <button className="home-btn register">
              Перейти к регистрации
            </button>
          </Link>

          <Link to="/login" className="home-link">
            <button className="home-btn login">
              Перейти к авторизации
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;