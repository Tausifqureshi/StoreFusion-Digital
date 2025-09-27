import React, { useState } from "react";

function Test() {
  const [counter, setCounter] = useState(1);
  function handleIncrece() {
    setCounter((pre) => pre + 1);
  }
  function handleDecrese() {
    if (counter > 1) {
      setCounter((pre) => pre - 1);
    }
  }

  function handleReset (){
    setCounter((pre)=> pre = 0);
  }

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={handleIncrece}>Increment</button>
      <button onClick={handleDecrese}>Decrement</button>
      <button onClick={handleReset}>Resat</button>
    </div>
  );
}

export default Test;
