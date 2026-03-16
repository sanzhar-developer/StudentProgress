import { useState } from "react";
import "./GradeForm.css";

function GradeForm({ subjects, onGradeAdded }) {
  const [subjectId, setSubjectId] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("https://studentprogress-production.up.railway.app/grade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        subjectId,
        value: Number(value)
      })
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setSubjectId("");
      setValue("");
      onGradeAdded();
    }
  };

  return (
    <form className="grade-form" onSubmit={handleSubmit}>
      <select
        className="grade-form-select"
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
      >
        <option value="">Выберите предмет</option>

        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </select>

      <input
        className="grade-form-input"
        type="number"
        placeholder="Введите оценку"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button className="grade-form-button" type="submit">
        Добавить оценку
      </button>
    </form>
  );
}

export default GradeForm;