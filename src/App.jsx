import React, { useState } from 'react';
import { initialColors } from './lib/colors';
import Color from './Components/Color/Color';
import ColorForm from './Components/ColorForm/ColorForm';
import './App.css';

function App() {
  const [colors, setColors] = useState(initialColors);

  const handleAddColor = (newColor) => {
    setColors([newColor, ...colors]);
  };

  const handleUpdateColor = (updatedColor) => {
    setColors(colors.map(color =>
      color.id === updatedColor.id ? updatedColor : color
    ));
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} buttonText="Add Color" />
      <div>
        {colors.map((color) => (
          <Color key={color.id} color={color} onUpdateColor={handleUpdateColor} />
        ))}
      </div>
    </>
  );
}

export default App;
