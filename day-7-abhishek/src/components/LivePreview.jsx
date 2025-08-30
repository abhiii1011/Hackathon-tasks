import React, { useState } from 'react';

export default function LivePreview() {
  const [text, setText] = useState('');
  return (
    <div className="card">
      <h2>Live Text Preview</h2>
      <textarea
        placeholder="Type something..."
        value={text}
        onChange={e => setText(e.target.value)}
        rows={5}
      />
      <div className="preview">
        <strong>Preview:</strong>
        <p>{text || 'Nothing typed yet.'}</p>
      </div>
    </div>
  );
}
