import React from 'react';
import Counter from './components/Counter.jsx';
import LivePreview from './components/LivePreview.jsx';
import './styles.css';

export default function App() {
  return (
    <div className="app-container">
      <h1>Day 7: Counter + Live Text Preview</h1>
      <div className="widgets">
        <Counter initial={0} />
        <LivePreview />
      </div>
    </div>
  );
}
