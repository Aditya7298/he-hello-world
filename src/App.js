import React, { useState } from 'react';

import './styles.css';

const MarksTable = () => {
  const [students, setStudents] = useState({ 1: 45 });
  const [rollNumber, setRollNumber] = useState('');
  const [marks, setMarks] = useState('');

  const addStudent = (e) => {
    e.preventDefault();

    const rollNumberKey = Number(rollNumber);

    setStudents({
      ...students,
      [rollNumberKey]: marks,
    });
    setRollNumber('');
    setMarks('');
  };

  return (
    <div className="marksTable">
      <h2>Students' Marks Table</h2>
      <form onSubmit={addStudent}>
        <input
          type="number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter roll number"
          required
        />
        <input
          type="number"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Enter marks"
          required
        />
        <button type="submit">Add Student</button>
      </form>
      <table border="2">
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
    <div className="app">
      <MarksTable />
    </div>
  );
}
