// import React, { useContext } from "react";
// import Layout from "../layout/Layout";
// import Loader from "../loader/Loader";
// import { MyContext } from "../../context api/myContext";


// function Order() {
//   const userid = JSON.parse(localStorage.getItem('user')).uid
//   console.log(userid)
//   const { mode, loading, order} = useContext(MyContext)
//   return (

//       <Layout>
//       {loading && <Loader />}
//       {order.length > 0 ?
//         (<>
//           <div className=" h-full pt-10">
//             {
//               order.filter(obj => obj.userid == userid).map((order) => {
//                 // order.cartItems.map()
//                 return (
//                   <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
//                     {
//                       order.cartItems.map((item) => {
//                         return (
//                           <div className="rounded-lg md:w-2/3">
//                             <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
//                               <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
//                               <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//                                 <div className="mt-5 sm:mt-0">
//                                   <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
//                                   <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
//                                   <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.price}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       })
//                     }
//                   </div>
//                 )
//               })
//             }
//           </div>
//         </>)
//         :
//         (
//           <h2 className=' text-center tex-2xl text-white'>Not Order</h2>
//         )

//       }
//     </Layout>


       
       
     
    
//   );
// }

// export default Order;










import React, { useContext } from "react";
import Layout from "../layout/Layout";
import Loader from "../loader/Loader";
import { MyContext } from "../../context api/myContext";

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).uid;
  console.log(userid);
  const { mode, loading, order } = useContext(MyContext);

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="h-full pt-10">
          {order.filter(obj => obj.userid === userid).map((orderItem,index) => (
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0" key={index}>
            {/* Cart item firebase se lere hai us me store hai. */}
              {orderItem.cartItems.map((item, index) => (
                <div className="rounded-lg md:w-2/3" key={index}>
                  <div
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    style={{
                      backgroundColor: mode === 'dark' ? '#282c34' : 'white',
                      color: mode === 'dark' ? 'white' : 'black',
                    }}
                  >
                    <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                          {item.title}
                        </h2>
                        <p className="mt-1 text-xs" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                          {item.description}
                        </p>
                        <p className="mt-1 text-xs" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <h2 className='text-center text-2xl text-white'>No Orders Found</h2>
      )}
    </Layout>
  );
}   

export default Order;
