import { useEffect, useState } from "react";
import SubjectForm from "../components/SubjectForm/SubjectForm";
import GradeForm from "../components/GradeForm/GradeForm";
import "./StudentPage.css";

function StudentPage() {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [newName, setNewName] = useState("");

  function getAverage(subjectId) {
    const subjectGrades = grades.filter(
      g => g.subjectId?._id?.toString() === subjectId.toString()
    );

    if (subjectGrades.length === 0) return "Нет оценок";

    const sum = subjectGrades.reduce(
      (acc, g) => acc + g.value,
      0
    );

    return (sum / subjectGrades.length).toFixed(2);
  }

  const deleteSubject = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:3000/subject/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchSubjects();
    fetchGrades();
  };

  const updateSubject = async (id, newName) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:3000/subject/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: newName })
    });

    setNewName("");
    fetchSubjects();
  };

  const fetchSubjects = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/subject", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (Array.isArray(data)) {
      setSubjects(data);
    }
  };

  const fetchGrades = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/grade", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (Array.isArray(data)) {
      setGrades(data);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchGrades();
  }, []);

  return (
    <div className="student-page">
      <div className="student-container">
        <h1 className="student-title">Мои предметы</h1>

        <div className="student-forms">
          <SubjectForm onSubjectAdded={fetchSubjects} />
          <GradeForm subjects={subjects} onGradeAdded={fetchGrades} />
        </div>

        <div className="student-section">
          <h2>Список предметов</h2>

          <div className="subject-list">
            {subjects.map((subject) => (
              <div className="subject-card" key={subject._id}>
                <div className="subject-name">{subject.name}</div>

                <div className="subject-actions">
                  <button
                    className="delete-btn"
                    onClick={() => deleteSubject(subject._id)}
                  >
                    Удалить
                  </button>

                  <input
                    className="subject-input"
                    placeholder="Новое имя"
                    onChange={(e) => setNewName(e.target.value)}
                  />

                  <button
                    className="update-btn"
                    onClick={() => updateSubject(subject._id, newName)}
                  >
                    Обновить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="student-section">
          <h2>Список оценок</h2>

          <div className="info-list">
            {grades.map((grade) => (
              <div className="info-item" key={grade._id}>
                <span>{grade.subjectId?.name}</span>
                <span>{grade.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="student-section">
          <h2>Средние оценки</h2>

          <div className="info-list">
            {subjects.map((subject) => (
              <div className="info-item" key={subject._id}>
                <span>{subject.name}</span>
                <span>{getAverage(subject._id)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;