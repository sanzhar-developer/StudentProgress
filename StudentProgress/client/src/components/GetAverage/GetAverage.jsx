

function getAverage(subjectId) {
  const subjectGrades = grades.filter(
    g => g.subjectId === subjectId
  );

  if (subjectGrades.length === 0) return 0;

  const sum = subjectGrades.reduce(
    (acc, g) => acc + g.value,
    0
  );

  return (sum / subjectGrades.length).toFixed(2);
}

export default getAverage;