// src/App.jsx
import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import Color from './Components/Color/Color';
import ColorForm from './Components/ColorForm/ColorForm';
import { initialColors } from './lib/colors';
import './App.css';

const THEME_STORAGE_KEY = 'theme-colors';

function App() {
  const [colors, setColors] = useLocalStorageState(THEME_STORAGE_KEY, { defaultValue: initialColors });

  const handleAddColor = (newColor) => {
    setColors([newColor, ...colors]);
  };

  const handleUpdateColor = (updatedColor) => {
    setColors(colors.map(color =>
      color.id === updatedColor.id ? updatedColor : color
    ));
  };

  const handleDeleteColor = (colorId) => {
    setColors(colors.filter(color => color.id !== colorId));
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} buttonText="Add Color" />
      <div>
        {colors.length > 0 ? (
          colors.map((color) => (
            <Color 
              key={color.id} // Переконайтесь, що ключ унікальний
              color={color} 
              onUpdateColor={handleUpdateColor} 
              onDeleteColor={handleDeleteColor} 
            />
          ))
        ) : (
          <p>No colors available. Please add some colors.</p>
        )}
      </div>
    </>
  );
}

export default App;
