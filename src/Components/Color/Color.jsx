import React from 'react';
import './Color.css';

const Color = ({ color }) => {
  const { hex, role, contrastText } = color;

  return (
    <div className="color-card" style={{ backgroundColor: hex, color: contrastText }}>
      <p>Role: {role}</p>
      <p>Hex: {hex}</p>
    </div>
  );
};

export default Color;
