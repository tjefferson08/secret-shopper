import React from 'react';

const Time = ({ label, value }) => (
  <div className="time-container">
    <strong className="time-label">{label}:</strong>
    <p className="time-value">{value}</p>
  </div>
);

export default Time;

