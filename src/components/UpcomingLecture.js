// src/components/UpcomingLecture.js
import React, { useState, useEffect } from 'react';
import './UpcomingLecture.css';

const UpcomingLecture = () => {
  const [nextLecture, setNextLecture] = useState(null);
  const [ongoingLecture, setOngoingLecture] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('/schedule.json');
        const data = await response.json();
        const day = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
        const now = new Date();
        const currentTime = formatTime(now);

        const lectures = data[day] || [];
        let ongoing = null;
        let upcoming = null;

        lectures.forEach((lecture) => {
          const [startTime, endTime] = lecture.time.split('-');
          const start = convertTo24HourFormat(startTime);
          const end = convertTo24HourFormat(endTime);
          if (currentTime >= start && currentTime <= end) {
            ongoing = lecture;
          } else if (currentTime < start && (!upcoming || start < upcoming.start)) {
            upcoming = { ...lecture, start };
          }
        });

        setOngoingLecture(ongoing);
        setNextLecture(upcoming);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  const formatTime = (date) => {
    return date.toTimeString().split(' ')[0].slice(0, 5);
  };

  const convertTo24HourFormat = (time) => {
    const [hours, minutes] = time.slice(0, -2).split(':').map(Number);
    const period = time.slice(-2);
    let newHours = hours;
    if (period === 'PM' && hours < 12) newHours += 12;
    if (period === 'AM' && hours === 12) newHours = 0;
    return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="upcoming-lecture-container">
      <h2 className="upcoming-lecture-title">Lecture Information</h2>
      {ongoingLecture ? (
        <div className="lecture-info ongoing">
          <h3 className="lecture-name">Ongoing Lecture</h3>
          <p className="lecture-time"><strong>Time:</strong> {ongoingLecture.time}</p>
          <p className="lecture-Professor"><strong>Professor:</strong> {ongoingLecture.Professor}</p>
          <p className="lecture-subject"><strong>Subject:</strong> {ongoingLecture.lecture}</p>
        </div>
      ) : (
        <p className="no-ongoing-lecture-message">No ongoing lecture at the moment.</p>
      )}
      {nextLecture ? (
        <div className="lecture-info upcoming">
          <h3 className="lecture-name">Upcoming Lecture</h3>
          <p className="lecture-time"><strong>Time:</strong> {nextLecture.time}</p>
          <p className="lecture-Professor"><strong>Professor:</strong> {nextLecture.Professor}</p>
          <p className="lecture-subject"><strong>Subject:</strong> {nextLecture.lecture}</p>
        </div>
      ) : (
        <p className="no-upcoming-lecture-message">No more lectures today!</p>
      )}
    </div>
  );
};

export default UpcomingLecture;
