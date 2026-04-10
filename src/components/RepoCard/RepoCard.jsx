import { memo, useCallback } from 'react';
import { useBookmarks } from '../../context/BookmarkContext';
import styles from './RepoCard.module.css';

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  C: '#555555',
  Swift: '#fa7343',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Vue: '#41b883',
  default: '#8b949e',
};

const StarIcon = () => (
  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ForkIcon = () => (
  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" />
    <path d="M18 9a9 9 0 01-9 9M6 9a9 9 0 009 9" />
  </svg>
);

const BookmarkIcon = ({ filled }) => (
  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
);

const IssueIcon = () => (
  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const fmt = (n) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};

const RepoCard = memo(({ repo }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(repo.id);
  const langColor = LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.default;

  const toggleBookmark = useCallback(
    (e) => {
      e.stopPropagation();
      bookmarked ? removeBookmark(repo.id) : addBookmark(repo);
    },
    [bookmarked, repo, addBookmark, removeBookmark]
  );

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.name}
          aria-label={`Open ${repo.name} on GitHub`}
        >
          {repo.name}
        </a>
        <button
          className={`${styles.bookmark} ${bookmarked ? styles.bookmarked : ''}`}
          onClick={toggleBookmark}
          aria-label={bookmarked ? `Remove ${repo.name} from bookmarks` : `Bookmark ${repo.name}`}
          aria-pressed={bookmarked}
          type="button"
        >
          <BookmarkIcon filled={bookmarked} />
        </button>
      </div>

      {repo.description && (
        <p className={styles.description}>{repo.description}</p>
      )}

      <div className={styles.meta}>
        {repo.language && (
          <span className={styles.lang}>
            <span className={styles.langDot} style={{ background: langColor }} aria-hidden="true" />
            {repo.language}
          </span>
        )}
        <span className={styles.stat} title="Stars">
          <StarIcon />{fmt(repo.stargazers_count)}
        </span>
        <span className={styles.stat} title="Forks">
          <ForkIcon />{fmt(repo.forks_count)}
        </span>
        {repo.open_issues_count > 0 && (
          <span className={styles.stat} title="Open issues">
            <IssueIcon />{fmt(repo.open_issues_count)}
          </span>
        )}
      </div>

      {repo.topics?.length > 0 && (
        <div className={styles.topics}>
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className={styles.topic}>{t}</span>
          ))}
        </div>
      )}
    </article>
  );
});

RepoCard.displayName = 'RepoCard';
export default RepoCard;
