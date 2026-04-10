import { useBookmarks } from '../context/BookmarkContext';
import RepoCard from '../components/RepoCard/RepoCard';
import EmptyState from '../components/EmptyState/EmptyState';
import { useNavigate } from 'react-router-dom';
import styles from './Bookmarks.module.css';

const Bookmarks = () => {
  const { bookmarks } = useBookmarks();
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backBtn} aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Bookmarked Repositories</h1>
          <p className={styles.subtitle}>
            You have {bookmarks.length} {bookmarks.length === 1 ? 'repository' : 'repositories'} bookmarked
          </p>
        </div>
      </header>

      {bookmarks.length === 0 ? (
        <EmptyState variant="bookmarks" />
      ) : (
        <div className={styles.grid}>
          {bookmarks.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Bookmarks;
