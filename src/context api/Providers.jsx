// // import React from 'react';
// // import { ThemeState } from './ThemeState';
// // import { FilterState } from './FilterState';
// // import ProductState from './ProductState';
// // import OrderState from './OrderState';
// // import UserState from './UserState';
// // import TestimonialState from './TestimonialState';

// // const Providers = ({ children }) => {
// //   return (
// //     <ThemeState>
// //       <UserState>
// //         <ProductState>
// //           <OrderState>
// //             <FilterState>
// //               <TestimonialState>
// //                 {children}
// //               </TestimonialState>
// //             </FilterState>
// //           </OrderState>
// //         </ProductState>
// //       </UserState>
// //     </ThemeState>
// //   );
// // };

// // export default Providers;




// import React from 'react';
// import { ThemeState } from './ThemeState';
// import { FilterState } from './FilterState';
// import ProductState from './ProductState';
// import OrderState from './OrderState';
// import UserState from './UserState';
// import TestimonialState from './TestimonialState';
// // 🔥 PRO TIP: Compose Providers Utility
// // Ye function nesting ko "Flatten" (seedha) kar deta hai
// const composeProviders = (...providers) => {
//   return ({ children }) => providers.reduceRight(
//     (acc, Provider) => <Provider>{acc}</Provider>,
//     children
//   );
// };

// // Ek sequence mein providers add karo
// const AllProviders = composeProviders(
//   ThemeState,
//   UserState,
//   ProductState,
//   OrderState,
//   FilterState,
//   TestimonialState
// );

// export default AllProviders;



import React from "react";
import { ThemeState } from "./ThemeState";
import { FilterState } from "./FilterState";
import ProductState from "./ProductState";
import OrderState from "./OrderState";
import UserState from "./UserState";
import TestimonialState from "./TestimonialState";

// ✅ FIX: static component (no dynamic recreation)
function Providers({ children }) {
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
}

export default React.memo(Providers);