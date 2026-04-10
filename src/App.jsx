import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { BookmarkProvider } from './context/BookmarkContext';
import Home from './pages/Home';
import UserRepos from './pages/UserRepos';
import Bookmarks from './pages/Bookmarks';
import styles from './App.module.css';

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

const BookmarkIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
);

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.brand} aria-label="GitSights Home">
        <img src="/favicon.png" alt="GitSights Logo" className={styles.logo} />
        <span>Git<strong>Sights</strong></span>
      </Link>
      <div className={styles.navActions}>
        <Link 
          to="/bookmarks" 
          className={styles.iconBtn} 
          aria-label="View bookmarked repositories"
        >
          <BookmarkIcon />
        </Link>
        <button
          className={styles.iconBtn}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          type="button"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
};

const AppShell = () => (
  <div className={styles.shell}>
    <Navbar />
    <div className={styles.content}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<UserRepos />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </div>
  </div>
);

const App = () => (
  <ThemeProvider>
    <BookmarkProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </BookmarkProvider>
  </ThemeProvider>
);

export default App;
