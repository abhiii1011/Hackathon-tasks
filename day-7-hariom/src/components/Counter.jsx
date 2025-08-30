import React, { useState } from 'react';

export default function Counter({ initial = 0, step = 1 }) {
  const [count, setCount] = useState(initial);
  return (
    <div className="card">
      <h2>Counter</h2>
      <p className="count-value">{count}</p>
      <div className="row">
        <button onClick={() => setCount(c => c - step)}>-</button>
        <button onClick={() => setCount(initial)}>Reset</button>
        <button onClick={() => setCount(c => c + step)}>+</button>
      </div>
    </div>
  );
}
