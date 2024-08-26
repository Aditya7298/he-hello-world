import React from 'react';

const MarksTable = () => {
  const [students, setStudents] = useState({ 0: "12" });
  const [rollNumber, setRollNumber] = useState("");
  const [marks, setMarks] = useState("");

  const addStudent = (e) => {
    e.preventDefault();

    const rollNumberKey = Number(rollNumber);

    setStudents({
      ...students,
      [rollNumberKey]: marks,
    });
    setRollNumber("");
    setMarks("");
  };

  return (
    <div>
      <h2>Students' Marks Table</h2>
      <form onSubmit={addStudent}>
        <input
          type="number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter roll number"
        />
        <input
          type="text"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Enter marks"
        />
        <button type="submit">Add Student</button>
      </form>
      <table border="1" style={{ marginTop: "10px", width: "100%" }}>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(students).map((rollNumber) => (
            <tr key={rollNumber}>
              <td>{rollNumber}</td>
              <td>{students[rollNumber]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function App() {
  return (
    <MarksTable />
  );
}
