import React, { useRef, useEffect } from 'react';

// Renders either a console-style terminal (JS / Node / Mongo / API examples)
// or a live iframe preview (HTML / CSS examples), depending on previewHtml.
const Output = ({ lines, onClear, simulated, previewHtml }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const copyOutput = () => {
    const text = lines.map((l) => l.text).join('\n');
    navigator.clipboard?.writeText(text).catch(() => {});
  };

  if (previewHtml !== null && previewHtml !== undefined) {
    return (
      <div className="terminal-card">
        <div className="terminal-topbar">
          <div className="term-dots">
            <span className="dot dot-pink" />
            <span className="dot dot-rose" />
            <span className="dot dot-white" />
          </div>
          <span className="term-title">preview</span>
          <div className="term-actions" />
        </div>
        <div className="preview-body">
          <iframe
            className="preview-frame"
            title="live preview"
            srcDoc={previewHtml}
            sandbox=""
          />
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-card">
      <div className="terminal-topbar">
        <div className="term-dots">
          <span className="dot dot-pink" />
          <span className="dot dot-rose" />
          <span className="dot dot-white" />
        </div>
        <span className="term-title">console</span>
        <div className="term-actions">
          <button className="term-btn" onClick={copyOutput} title="Copy output">Copy</button>
          <button className="term-btn" onClick={onClear} title="Clear">Clear</button>
        </div>
      </div>
      <div className="terminal-body">
        {simulated && (
          <div className="sim-banner">
            Node.js / MongoDB environment required — showing a simulated result preview
          </div>
        )}
        {lines.length === 0 && (
          <div className="term-placeholder">// output will appear here</div>
        )}
        {lines.map((line, i) => (
          <div key={i} className={`term-line ${line.type}`}>
            {line.type === 'input' && <span className="prompt">&gt;</span>}
            <span className="term-text">{line.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Output;
