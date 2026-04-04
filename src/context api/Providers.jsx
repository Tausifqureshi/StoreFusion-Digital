import React from 'react';
import { ThemeState } from './ThemeState';
import { FilterState } from './FilterState';
import ProductState from './ProductState';
import OrderState from './OrderState';
import UserState from './UserState';
import TestimonialState from './TestimonialState';

const Providers = ({ children }) => {
  return (
    <ThemeState>
      <UserState>
        <ProductState>
          <OrderState>
            <FilterState>
              <TestimonialState>
                {children}
              </TestimonialState>
            </FilterState>
          </OrderState>
        </ProductState>
      </UserState>
    </ThemeState>
  );
};

export default Providers;
