// src/components/TodaySchedule.js
import React, { useState, useEffect } from 'react';

const TodaySchedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch('/schedule.json')
      .then(response => response.json())
      .then(data => {
        const day = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
        setSchedule(data[day]);
      });
  }, []);

  if (schedule.length == 0) {
    return (<h2>No lectures today!</h2>)
  }
  return (
    <div className="schedule">
      <h2>Today's Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Lecture</th>
            <th>Professor</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((slot, index) => (
            <tr key={index}>
              <td>{slot.time}</td>
              <td>{slot.lecture}</td>
              <td>{slot.Professor}</td> {/* Displaying the professor's name */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodaySchedule;
