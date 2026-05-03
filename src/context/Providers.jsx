
import React from "react";
import { ThemeState } from "./ThemeState";
import { FilterState } from "./FilterState";
import ProductState from "./ProductState";
import OrderState from "./OrderState";
import UserState from "./UserState";
import TestimonialState from "./TestimonialState";
import { LoadingProvider } from "./LoadingState";

// ✅ FIX: static component (no dynamic recreation)
function Providers({ children }) {
  return (
    <ThemeState>
      <UserState>
        <ProductState>
          <OrderState>
            <FilterState>
              <TestimonialState>
                <LoadingProvider>
                  {children}
                </LoadingProvider>
              </TestimonialState>
            </FilterState>
          </OrderState>
        </ProductState>
      </UserState>
    </ThemeState>
  );
}

export default React.memo(Providers);
