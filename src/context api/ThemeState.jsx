import React, { useState, useMemo, useCallback } from 'react';
import { ThemeContext } from './AllContext';

export function ThemeState({ children }) {
  const [mode, setMode] = useState("light");

  // const toggleMode = useCallback(() => {
  //   if (mode === "light") {
  //     setMode("dark");
  //     document.body.style.backgroundColor = "rgb(17, 24, 39)";
  //   } else {
  //     setMode("light");
  //     document.body.style.backgroundColor = "white";
  //   }
  // }, []);
  const toggleMode = useCallback(() => {
    setMode(prev => {
      const newMode = prev === "light" ? "dark" : "light";
      document.body.style.backgroundColor =
        newMode === "dark" ? "rgb(17, 24, 39)" : "white";
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
