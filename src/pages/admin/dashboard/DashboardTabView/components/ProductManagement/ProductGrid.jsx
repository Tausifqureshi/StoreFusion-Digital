import React from 'react';
import { FaBox } from 'react-icons/fa';
import ProductCard from './ProductCard';

function ProductGrid({ productsOnCurrentPage, isDark, edithandle, deleteProduct }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productsOnCurrentPage.length > 0 ? (
        productsOnCurrentPage.map((item, i) => (
          <ProductCard
            key={item.id || i}
            item={item}
            isDark={isDark}
            edithandle={edithandle}
            deleteProduct={deleteProduct}
          />
        ))
      ) : (
        <div className="col-span-full py-20 text-center">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <FaBox className={`text-3xl ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          </div>
          <p className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            No products found.
          </p>
        </div>
      )}
    </div>
  );
};

ProductGrid.displayName = 'ProductGrid';
export default React.memo(ProductGrid);
