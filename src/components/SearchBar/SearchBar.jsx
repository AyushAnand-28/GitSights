import { useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

const SearchIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchBar = ({ value, onChange, placeholder = 'Search GitHub users…' }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.wrapper} role="search">
      <span className={styles.icon}>
        <SearchIcon />
      </span>
      <input
        ref={inputRef}
        id="search-input"
        className={styles.input}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search GitHub users"
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button
          className={styles.clear}
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
