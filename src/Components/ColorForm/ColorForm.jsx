import React from 'react';
import ColorInput from '../ColorInput/ColorInput';
import './ColorForm.css';

export default function ColorForm({
  onSubmitColor,
  initialData = { role: "", hex: "#ffffff", contrastText: "#000000" },
  buttonText = "ADD COLOR",
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      role: formData.get('role'),
      hex: formData.get('hex'),
      contrastText: formData.get('contrastText'),
    };
    onSubmitColor(data);
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label htmlFor="role">
        Role
        <br />
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={initialData.role}
        />
      </label>
      <br />
      <label htmlFor="hex">
        Hex
        <br />
        <ColorInput id="hex" name="hex" defaultValue={initialData.hex} />
      </label>
      <br />
      <label htmlFor="contrastText">
        Contrast Text
        <br />
        <ColorInput id="contrastText" name="contrastText" defaultValue={initialData.contrastText} />
      </label>
      <br />
      <button type="submit">{buttonText}</button>
    </form>
  );
}
