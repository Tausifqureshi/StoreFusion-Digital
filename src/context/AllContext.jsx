import { createContext } from 'react';

// ✅ Cleaned up Contexts: Only UI-centric states remain here.
// Data-centric states (Products, Orders, Users) are now in Redux.

export const ThemeContext = createContext();
ThemeContext.displayName = 'ThemeContext';

export const FilterContext = createContext();
FilterContext.displayName = 'FilterContext';
