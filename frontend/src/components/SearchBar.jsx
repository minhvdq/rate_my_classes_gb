import { useState } from 'react';
import './Home.css';
import { frontendBase } from '../utils/homeUrl';

const reviewURL = `${frontendBase}/review`;

export default function SearchBar({ classes, top, marginLeft, width }) {
  const [displayClasses, setDisplayClasses] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleOnInput = (e) => {
    const txt = e.target.value;
    if (txt === '') {
      setDisplayClasses([]);
      setFocusedIndex(-1);
    } else {
      let filteredClasses = classes.filter(cl =>
        cl.name.replace(/\s/g, '').toLowerCase().includes(txt.replace(/\s/g, '').toLowerCase())
      );
      filteredClasses = filteredClasses.slice(0, 5);
      setDisplayClasses(filteredClasses);
      setFocusedIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (displayClasses.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => Math.min(prev + 1, displayClasses.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0) {
        window.location.href = `${reviewURL}/${displayClasses[focusedIndex].id}`;
      }
    }
  };

  return (
    <div className="search" style={{ top, marginLeft, width }}>
      <input
        onInput={handleOnInput}
        onKeyDown={handleKeyDown}
        className="form-control"
        placeholder="Type in a class (i.e: CS 216)"
      />
      <div className="border rounded shadow-sm" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {displayClasses.map((element, idx) => (
          <div
            key={element.id}
            onClick={() => window.location.href = `${reviewURL}/${element.id}`}
            className={`search-item border-bottom py-2 px-2 rounded hover-bg-light ${
              idx === focusedIndex ? 'bg-light' : ''
            }`}
            style={{ cursor: 'pointer' }}
          >
            <h5>{element.name}</h5>
            <p className="text-muted mb-0">{element.department}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
