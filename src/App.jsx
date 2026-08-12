import React, { useState } from 'react';
import TutorialSidebar from './components/TutorialSidebar';
import Output from './components/Output';
import Editor from './components/Editor';
import Petal from './components/Petal';
import './index.css';

const DEFAULT_CODE = `// Welcome to Sakura Code Assistant\nconsole.log('Hello, world!');`;

const App = () => {
  const [code, setCode] = useState(DEFAULT_CODE); // Code shown in the editor
  const [lines, setLines] = useState([]); // Console lines for JS/Node/Mongo/API examples
  const [activeTitle, setActiveTitle] = useState(''); // Currently loaded example's filename
  const [simulated, setSimulated] = useState(false); // Whether the console is showing a curated (non-live) result
  const [previewHtml, setPreviewHtml] = useState(null); // Non-null when in HTML/CSS preview mode
  const [mode, setMode] = useState('live'); // 'live' | 'simulated' | 'markup' — tracks the current example's category

  // Decorative falling petals — positions/timings generated once
  const petals = Array.from({ length: 12 }).map((_, i) => ({
    left: `${(i * 8.3) % 100}%`,
    animationDuration: `${10 + (i % 6) * 1.5}s`,
    animationDelay: `${i * 0.7}s`,
    width: `${14 + (i % 4) * 5}px`,
    opacity: 0.25 + (i % 3) * 0.12,
  }));

  const pushLine = (type, text) => setLines((prev) => [...prev, { type, text }]);

  // Executes JS directly in the browser via eval and logs the result.
  const runLive = (source) => {
    setSimulated(false);
    setPreviewHtml(null);
    pushLine('input', source.split('\n')[0] + (source.includes('\n') ? ' ...' : ''));

    let result = '';
    const originalLog = console.log;
    try {
      console.log = (...args) => {
        result += args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') + '\n';
      };
      // eslint-disable-next-line no-eval
      eval(source);
      const out = result || 'No output';
      out.split('\n').filter(Boolean).forEach((l) => pushLine('output', l));
      if (!result) pushLine('output', 'No output');
      pushLine('status-ok', 'ran successfully');
    } catch (error) {
      pushLine('output-error', error.message);
      pushLine('status-error', 'error in code');
    } finally {
      console.log = originalLog;
    }
  };

  // Shows a curated expected output for Node/Mongo/API examples that
  // can't actually execute inside the browser.
  const runSimulatedPreview = (source, simulatedOutput) => {
    setPreviewHtml(null);
    setSimulated(true);
    pushLine('input', source.split('\n')[0] + (source.includes('\n') ? ' ...' : ''));
    simulatedOutput.split('\n').forEach((l) => pushLine('output', l));
  };

  // Renders HTML/CSS straight into an iframe.
  const runMarkupPreview = (source) => {
    setSimulated(false);
    setPreviewHtml(source);
  };

  // Run button: always executes the current editor contents for its mode.
  const runCode = () => {
    if (mode === 'markup') {
      runMarkupPreview(code);
    } else {
      setLines([]);
      runLive(code);
    }
  };

  const handleExampleClick = (ex, section) => {
    setCode(ex.code);
    setActiveTitle(`${ex.title.replace(/\s+/g, '-').toLowerCase()}.${section.ext}`);
    setMode(section.mode);
    setLines([]);

    if (section.mode === 'markup') {
      runMarkupPreview(ex.code);
    } else if (section.mode === 'simulated' && ex.simulated) {
      runSimulatedPreview(ex.code, ex.simulated);
    } else {
      runLive(ex.code);
    }
  };

  return (
    <div className="sakura-app">
      {petals.map((style, i) => (
        <Petal key={i} style={style} />
      ))}

      <TutorialSidebar
        onExampleClick={handleExampleClick}
        activeExample={activeTitle.replace(/\.(js|html|css)$/, '')}
      />

      <div className="main">
        <div className="main-header">
          <h1>JS Code Assistant</h1>
          <p className="subtitle">Node.js, MongoDB, REST APIs, HTML and CSS — a practice playground</p>
        </div>

        <Editor code={code} setCode={setCode} runCode={runCode} activeTitle={activeTitle} />
        <Output lines={lines} onClear={() => setLines([])} simulated={simulated} previewHtml={previewHtml} />
      </div>
    </div>
  );
};

export default App;
