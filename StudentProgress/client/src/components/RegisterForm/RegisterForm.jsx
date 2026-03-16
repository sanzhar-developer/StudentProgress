import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://studentprogress-production.up.railway.app/loginauth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert("Регистрация прошла успешно! Теперь вы можете войти в систему.");

      setForm({
        name: "",
        email: "",
        password: ""
      });

      navigate("/login");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Регистрация</h1>

        <form className="register-form" onSubmit={handlerSubmit}>
          <input
            className="register-input"
            placeholder="Ваше имя"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="register-input"
            placeholder="Ваша почта"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="register-input"
            type="password"
            placeholder="Введите пароль"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="register-button">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;