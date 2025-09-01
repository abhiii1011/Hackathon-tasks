import { useState, useEffect } from "react";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => console.error("❌ Error:", err));
  }, []);

  if (loading) return <p>Loading students...</p>;

  return (
    <ul>
      {students.map(s => (
        <li key={s.id}>
          {s.name} - Age: {s.age}
        </li>
      ))}
    </ul>
  );
}

export default StudentList;
