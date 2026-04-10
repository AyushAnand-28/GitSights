import styles from './EmptyState.module.css';
import binocularsIcon from '../../assets/icons8-binoculars-96.png';

const VARIANTS = {
  search: {
    emoji: '🔍',
    title: 'No users found',
    message: 'Try a different search term or check the spelling.',
  },
  repos: {
    emoji: '📦',
    title: 'No repositories',
    message: 'This user has no public repositories yet.',
  },
  filtered: {
    emoji: '🧹',
    title: 'No matching repos',
    message: 'No repositories match the current filter. Try another language.',
  },
  initial: {
    image: binocularsIcon,
    title: 'Explore GitHub',
    message: 'Search for any GitHub user to view their profile and repositories.',
  },
  bookmarks: {
    emoji: '🔖',
    title: 'No bookmarks yet',
    message: 'Explore GitHub profiles and click the bookmark icon on repositories you want to save for later.',
  },
};

const EmptyState = ({ variant = 'initial', customMessage }) => {
  const { emoji, image, title, message } = VARIANTS[variant] || VARIANTS.initial;

  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      {image ? (
        <img src={image} alt="" className={styles.imageIcon} aria-hidden="true" />
      ) : (
        <div className={styles.emoji} aria-hidden="true">{emoji}</div>
      )}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{customMessage || message}</p>
    </div>
  );
};

export default EmptyState;
