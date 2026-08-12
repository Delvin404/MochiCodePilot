import React from 'react';

const Editor = ({ code, setCode, runCode, activeTitle }) => {
  return (
    <div className="editor-card">
      <div className="editor-topbar">
        <div className="editor-tab">
          <span className="tab-dot" />
          {activeTitle || 'untitled.js'}
        </div>
        <button className="run-btn" onClick={runCode}>
          <span>Run</span> <span className="run-icon" />
        </button>
      </div>
      <textarea
        className="code-area"
        value={code} // Display the current code in the textarea
        onChange={(e) => setCode(e.target.value)} // Update the code state when changed
        placeholder="// write your code here and press Run"
        spellCheck={false}
      />
    </div>
  );
};

export default Editor;
