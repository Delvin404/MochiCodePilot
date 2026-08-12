import React, { useState } from 'react';
import knowledgeBase from '../data/knowledgeBase';

const TutorialSidebar = ({ onExampleClick, activeExample }) => {
  const [expanded, setExpanded] = useState(0);
  const [search, setSearch] = useState('');

  const toggleCategory = (index) => {
    setExpanded(index === expanded ? null : index);
  };

  const filtered = knowledgeBase
    .map((section) => ({
      ...section,
      examples: section.examples.filter((ex) =>
        ex.title.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((section) => section.examples.length > 0);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="brand">
          <span className="brand-mark" />
          <div>
            <div className="brand-title">Sakura</div>
            <div className="brand-subtitle">Code Assistant</div>
          </div>
        </div>
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="Search examples..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="sidebar-scroll">
        {filtered.map((section, i) => (
          <div className="category" key={i}>
            <div
              className={`category-header ${expanded === i ? 'open' : ''}`}
              onClick={() => toggleCategory(i)}
            >
              <span>{section.category}</span>
              <span className="chevron" />
            </div>

            {expanded === i && (
              <ul className="example-list">
                {section.examples.map((ex, j) => (
                  <li
                    key={j}
                    className={`example-item ${activeExample === ex.title ? 'active' : ''}`}
                    onClick={() => onExampleClick(ex, section)}
                  >
                    <span className="example-title">{ex.title}</span>
                    {section.mode === 'simulated' && <span className="tag-badge">node</span>}
                    {section.mode === 'markup' && <span className="tag-badge tag-badge-alt">{section.ext}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">a calm space to practice code</div>
    </div>
  );
};

export default TutorialSidebar;
