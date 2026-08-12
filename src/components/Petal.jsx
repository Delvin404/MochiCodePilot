import React from 'react';

// A small vector blossom shape (not an emoji glyph) used for the
// falling-petal background decoration.
const Petal = ({ style }) => (
  <div className="petal" style={style}>
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <path
        d="M16 4
           C19 4 21 7 19.5 10
           C23 9 26 12 24.5 15
           C27 17 27 21 23.5 22
           C24.5 25.5 21.5 28 18.5 26.5
           C18 30 14 30 13.5 26.5
           C10.5 28 7.5 25.5 8.5 22
           C5 21 5 17 7.5 15
           C6 12 9 9 12.5 10
           C11 7 13 4 16 4 Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

export default Petal;
