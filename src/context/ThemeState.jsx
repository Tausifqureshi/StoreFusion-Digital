import React, { useState, useMemo, useCallback } from 'react';
import { ThemeContext } from './AllContext';

export function ThemeState({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('themeMode') || "light";
  });

  React.useEffect(() => {
    document.body.style.backgroundColor = mode === "dark" ? "rgb(17, 24, 39)" : "white";
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode(prev => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  }, []);

  const contextValue = useMemo(() => ({
    mode, toggleMode
  }), [mode, toggleMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeState;
