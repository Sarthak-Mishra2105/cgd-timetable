// src/components/WeekSchedule.js
import React, { useState, useEffect } from 'react';

const WeekSchedule = () => {
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    fetch('/schedule.json')
      .then(response => response.json())
      .then(data => setSchedule(data));
  }, []);

  return (
    <div className="schedule">
      <h2>Week's Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Lecture</th>
            <th>Professor</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(schedule).map((day, index) => (
            <React.Fragment key={index}>
              {schedule[day].map((slot, i) => (
                <tr key={i}>
                  <td>{i === 0 ? day.charAt(0).toUpperCase() + day.slice(1) : ''}</td>
                  <td>{slot.time}</td>
                  <td>{slot.lecture}</td>
                  <td>{slot.Professor}</td> {/* Displaying the professor's name */}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeekSchedule;
