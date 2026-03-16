import { useState } from "react";
import "./SubjectForm.css";

function SubjectForm({ onSubjectAdded }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch(
      "https://studentprogress-production.up.railway.app/subject",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      }
    );

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      onSubjectAdded();
    }

    setName("");
  };

  return (
    <form className="subject-form" onSubmit={handleSubmit}>
      <input
        className="subject-form-input"
        placeholder="Название предмета"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="subject-form-button">
        Добавить предмет
      </button>
    </form>
  );
}

export default SubjectForm;