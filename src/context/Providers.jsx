import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import AppInitializer from "../components/initializer/AppInitializer";
import { ThemeState } from "./ThemeState";
import { FilterState } from "./FilterState";

/**
 * Providers: Flattened Root Provider Wrapper.
 * Contexts like Theme, Filter, and Testimonials remain as they are UI-centric.
 * Heavy data contexts (Product, Order, User, Loading) have been migrated to Redux.
 */
function Providers({ children }) {
  return (
    <Provider store={store}>
      <AppInitializer>
        <ThemeState>
          <FilterState>
            {children}
          </FilterState>
        </ThemeState>
      </AppInitializer>
    </Provider>
  );
}

export default React.memo(Providers);
