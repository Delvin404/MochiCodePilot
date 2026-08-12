import React, { useState } from 'react';
import TutorialSidebar from './components/TutorialSidebar';
import Output from './components/Output';
import Editor from './components/Editor';
import Petal from './components/Petal';
import './index.css';

const App = () => {
  const [code, setCode] = useState(`// welcome to Sakura JS \nconsole.log('Hello, garden!');`); // Code input by the user
  const [lines, setLines] = useState([]); // Terminal lines to display
  const [activeTitle, setActiveTitle] = useState(''); // Currently loaded example's filename
  const [simulated, setSimulated] = useState(false); // Whether current output is a simulated (Node/Mongo) preview

  // Decorative falling petals — positions/timings are generated once per render tree
  const petals = Array.from({ length: 14 }).map((_, i) => ({
    left: `${(i * 7.3) % 100}%`,
    animationDuration: `${8 + (i % 6)}s`,
    animationDelay: `${i * 0.6}s`,
    fontSize: `${12 + (i % 4) * 6}px`,
    opacity: 0.35 + (i % 3) * 0.15,
  }));

  const pushLine = (type, text) => setLines((prev) => [...prev, { type, text }]);

  // Runs code in-browser via eval, OR (for Node/Mongo/API examples) shows a
  // simulated output since those snippets need a real server environment.
  const runCode = (overrideCode, overrideSim) => {
    const source = overrideCode ?? code;
    setSimulated(false);
    pushLine('input', source.split('\n')[0] + (source.includes('\n') ? ' …' : ''));

    if (overrideSim) {
      setSimulated(true);
      overrideSim.split('\n').forEach((l) => pushLine('output', l));
      return;
    }

    let result = '';
    const originalLog = console.log;

    try {
      // Capture console.log output
      console.log = (...args) => {
        result += args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') + '\n';
      };

      // ⚠️ Warning: eval is dangerous, only use in safe environments
      // eslint-disable-next-line no-eval
      eval(source); // Run the code entered in the editor

      const out = result || 'No output';
      out.split('\n').filter(Boolean).forEach((l) => pushLine('output', l));
      if (!result) pushLine('output', 'No output');
      pushLine('status-ok', '✅ ran successfully');
    } catch (error) {
      pushLine('output-error', error.message); // If there's an error, display the error message
      pushLine('status-error', '❌ error in code');
    } finally {
      console.log = originalLog; // Restore original console log behavior
    }
  };

  const handleExampleClick = (ex, isNode) => {
    setCode(ex.code); // Set the code for the clicked example
    setActiveTitle(ex.title + '.js');
    if (isNode && ex.simulated) {
      runCode(ex.code, ex.simulated); // Node/Mongo/API examples show a simulated result
    } else {
      runCode(ex.code, null); // Everything else runs live in the browser
    }
  };

  return (
    <div className="sakura-app">
      {petals.map((style, i) => (
        <Petal key={i} style={style} />
      ))}

      <TutorialSidebar
        onExampleClick={handleExampleClick}
        activeExample={activeTitle.replace('.js', '')}
      />

      <div className="main">
        <div className="main-header">
          <h1>JS Code Assistant</h1>
          <p className="subtitle">Node.js · MongoDB · REST APIs — practice playground </p>
        </div>

        <Editor code={code} setCode={setCode} runCode={() => runCode()} activeTitle={activeTitle} />
        <Output lines={lines} onClear={() => setLines([])} simulated={simulated} />
      </div>
    </div>
  );
};

export default App;