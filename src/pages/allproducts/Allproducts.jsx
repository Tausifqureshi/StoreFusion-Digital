import React, { useContext } from 'react'
import { MyContext } from '../../context api/myContext'


function Allproducts() {
  const {products,setProducts,addProduct} = useContext(MyContext);
    // 

  return (
    <div>
     <h1> Allproducts </h1>  
    </div>
  )
}

export default Allproducts