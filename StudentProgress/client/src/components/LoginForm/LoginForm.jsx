import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(
            "https://studentprogress-production.up.railway.app/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }
        );

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/student");
        } else {
            alert("Неверный логин или пароль");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Авторизация</h1>

                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        className="login-input"
                        placeholder="Ваша почта"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <input
                        className="login-input"
                        placeholder="Введите пароль"
                        type="password"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    <button className="login-button">
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;