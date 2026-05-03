import { createContext } from 'react';

// ✅ displayName on every Context so React DevTools shows the correct name
// instead of "Context.Provider" × 8 stacked in the component tree.

export const ProductContext = createContext();
ProductContext.displayName = 'ProductContext';

export const ProductAdminContext = createContext();
ProductAdminContext.displayName = 'ProductAdminContext';

export const ThemeContext = createContext();
ThemeContext.displayName = 'ThemeContext';

export const FilterContext = createContext();
FilterContext.displayName = 'FilterContext';

export const OrderContext = createContext();
OrderContext.displayName = 'OrderContext';

export const UserContext = createContext();
UserContext.displayName = 'UserContext';

export const TestimonialContext = createContext();
TestimonialContext.displayName = 'TestimonialContext';

export const LoadingContext = createContext();
LoadingContext.displayName = 'LoadingContext';
