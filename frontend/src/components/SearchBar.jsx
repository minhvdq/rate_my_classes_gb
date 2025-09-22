import { useEffect, useMemo, useRef, useState } from "react";
import "./Home.css";
import { frontendBase } from "../utils/homeUrl";

const reviewURL = `${frontendBase}/review`;

export default function SearchBar({ classes, width }) {
  const [displayClasses, setDisplayClasses] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [value, setValue] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const normalized = (s) => s.replace(/\s/g, "").toLowerCase();

  const results = useMemo(() => {
    if (!value) return [];
    const q = normalized(value);
    const scored = [];
    for (const cl of classes) {
      const nameNorm = normalized(cl.name);
      const idx = nameNorm.indexOf(q);
      if (idx === -1) continue;
      // Lower scores are better: prefix first, then earlier index, then shorter name
      const score = (idx === 0 ? 0 : 1) * 1_000_000 + idx * 1_000 + nameNorm.length;
      scored.push({ item: cl, score });
    }
    scored.sort((a, b) => a.score - b.score);
    return scored.slice(0, 6).map((s) => s.item);
  }, [classes, value]);

  useEffect(() => {
    setDisplayClasses(results);
    setFocusedIndex(-1);
  }, [results]);

  const handleOnInput = (e) => {
    setValue(e.target.value);
  };

  const goTo = (id) => {
    window.location.href = `${reviewURL}/${id}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.min(prev + 1, displayClasses.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      // Always prevent form submit; only navigate when a suggestion exists
      e.preventDefault();
      if (displayClasses.length === 0) return;
      const idx = focusedIndex >= 0 ? focusedIndex : 0;
      if (displayClasses[idx]) goTo(displayClasses[idx].id);
    } else if (e.key === "Escape") {
      setDisplayClasses([]);
      setFocusedIndex(-1);
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const i = text.toLowerCase().indexOf(query.toLowerCase());
    if (i === -1) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark className="match">{text.slice(i, i + query.length)}</mark>
        {text.slice(i + query.length)}
      </>
    );
  };

  return (
    <div className="search-wrap" style={{ width }}>
      <div className="search-input">
        <span className="search-icon" aria-hidden="true">🔎</span>
        <input
          ref={inputRef}
          type="text"
          className="form-control form-control-lg search-field"
          placeholder="Type a class (e.g., CS 216)"
          autoComplete="off"
          value={value}
          onInput={handleOnInput}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={displayClasses.length > 0}
          aria-controls="class-suggestions"
          aria-autocomplete="list"
        />
        {value && (
          <button
            type="button"
            className="btn btn-link clear-btn"
            onClick={() => {
              setValue("");
              setDisplayClasses([]);
              setFocusedIndex(-1);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div
        id="class-suggestions"
        ref={listRef}
        className={`suggestions border rounded-3 ${displayClasses.length ? "show" : ""}`}
        role="listbox"
        aria-label="Class suggestions"
      >
        {displayClasses.map((el, idx) => (
          <div
            key={el.id}
            role="option"
            aria-selected={idx === focusedIndex}
            onMouseEnter={() => setFocusedIndex(idx)}
            onMouseLeave={() => setFocusedIndex(-1)}
            onClick={() => goTo(el.id)}
            className={`suggestion-item ${idx === focusedIndex ? "active" : ""}`}
          >
            <div className="d-flex flex-column">
              <h6 className="mb-0 fw-semibold">
                {highlightMatch(el.name, value)}
              </h6>
              <small className="text-muted">{el.department}</small>
            </div>
          </div>
        ))}

        {value && displayClasses.length === 0 && (
          <div className="suggestion-empty text-muted">No classes found. Try another keyword.</div>
        )}
      </div>
    </div>
  );
}
