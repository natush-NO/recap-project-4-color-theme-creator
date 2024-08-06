import React, { useState } from 'react';
import ColorForm from '../ColorForm/ColorForm';
import './Color.css';

const Color = ({ color, onUpdateColor }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (updatedColor) => {
    onUpdateColor({ ...color, ...updatedColor });
    setIsEditing(false);
  };

  return (
    <div className="color-card" style={{ backgroundColor: color.hex, color: color.contrastText }}>
      {isEditing ? (
        <>
          <ColorForm
            initialData={color}
            onSubmitColor={handleSave}
            buttonText="Save Color"
          />
          <button 
            className='cancel-button' 
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p className='color-role'>Role: {color.role}</p>
          <p className='color-hex'>Hex: {color.hex}</p>
          <button 
            className='edit-button' 
            onClick={handleEditClick}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Color;
