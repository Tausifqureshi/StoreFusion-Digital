// import React, { useState } from 'react';

// function Example() {
//   const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];
//   const [visibleCount, setVisibleCount] = useState(5); // Initially visible items
//   const [isExpanded, setIsExpanded] = useState(false); // Track if expanded or not

//   const handleToggle = () => {
//     if (isExpanded) {
//       setVisibleCount(5); // Reset to initial count
//     } else {
//       setVisibleCount(items.length); // Show all items
//     }
//     setIsExpanded(!isExpanded); // Toggle the state
//   };

//   return (
//     <div>
//       <ul>
//         {items.slice(0, visibleCount).map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//       <button onClick={handleToggle}>
//         {isExpanded ? 'See Less' : 'See More'}
//       </button>
//     </div>
//   );
// }

// export default Example;


import React, { useState } from 'react';

// Example component banate hain
function Example() {
  // Yahan par hum text ko define kar rahe hain
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac odio non nisl aliquet malesuada. Sed vitae massa ut massa tempor euismod. Integer dignissim malesuada libero, vel sagittis arcu fermentum a. Nulla facilisi. Morbi at arcu venenatis, fringilla sapien ut, aliquam orci. Vestibulum malesuada sapien non sem dictum.";

  // useState hook ka istemal karte hain state manage karne ke liye
  const [isExpanded, setIsExpanded] = useState(false); // Initially, text collapse hai

  // handleToggle function jo button click hone par state toggle karta hai
  const handleToggle = () => {
    setIsExpanded(!isExpanded); // isExpanded ki value ko ulta karte hain
  };

  return (
    <div>
      {/* Yahan par hum text ko display karte hain */}
      <p>{isExpanded ? text : text.slice(0, 100) + '...'}</p>
     {/* agar isExpanded true hai, to pura text dikhai dega, warna pehle 100 characters aur '...' dikhai dega*/}
      <button onClick={handleToggle}>
        {isExpanded ? 'See Less' : 'See More'} {/* Button ka text state ke hisaab se change hota hai */}
      </button>
    </div>
  );
}

export default Example;
