import { React, useState } from 'react';

const Counter = () => {
  const [Count, setCount] = useState(0);

  function increment() {
    setCount(Count + 1)
  }

  function decrement() {
    setCount(Count - 1)
  }

  return (
    <div>
      <h1>{Count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

export default Counter;