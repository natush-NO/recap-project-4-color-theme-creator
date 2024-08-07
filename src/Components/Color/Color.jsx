import React, { useState } from 'react';
import ColorForm from '../ColorForm/ColorForm';
import CopyToClipboard from '../CopyToClipboard/CopyToClipboard';
import { ContrastColorCheck } from '../ContrastColorCheck/ContrastColorCheck'; 
import './Color.css';

const Color = ({ color, onUpdateColor, onDeleteColor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = (updatedColor) => {
    onUpdateColor({ ...color, ...updatedColor });
    setIsEditing(false);
  };

  const handleDeleteClick = () => setIsConfirmingDelete(true);
  const handleConfirmDelete = () => {
    onDeleteColor(color.id);
    setIsConfirmingDelete(false);
  };

  const handleCancelDelete = () => setIsConfirmingDelete(false);

  return (
    <div className="color-card" style={{ backgroundColor: color.hex, color: color.contrastText }}>
      {isEditing ? (
        <>
          <ColorForm
            initialData={color}
            onSubmitColor={handleSave}
            buttonText="Update Color"
          />
          <button className='cancel-button' onClick={handleCancel}>Cancel</button>
        </>
      ) : isConfirmingDelete ? (
        <div className="color-card-highlight">
          <p>Are you sure you want to delete this color?</p>
          <button className='confirm-delete-button' onClick={handleConfirmDelete}>Yes, Delete</button>
          <button className='cancel-delete-button' onClick={handleCancelDelete}>Cancel</button>
        </div>
      ) : (
        <>
          <div className='copy-div'>
            <p className='color-hex color-text'>Hex: {color.hex}</p>
            <CopyToClipboard text={color.hex} />
          </div>
          <p className='color-role'>Role: {color.role}</p>
          <p className='color-contrast'>Contrast: {color.contrastText}</p>
              <ContrastColorCheck checkHex={color.hex} checkContrast={color.contrastText} />
              <div className='button-div'>
          <button className='delete-button' onClick={handleDeleteClick}>Delete</button>
          <button className='edit-button' onClick={handleEditClick}>Edit</button>
              </div>
        </>
      )}
    </div>
  );
};

export default Color;
