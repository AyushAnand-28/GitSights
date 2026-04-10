import styles from './Loader.module.css';

export const SkeletonUserCard = () => (
  <div className={styles.userCard} aria-hidden="true">
    <div className={`${styles.shimmer} ${styles.avatar}`} />
    <div className={styles.lines}>
      <div className={`${styles.shimmer} ${styles.line} ${styles.lineLong}`} />
      <div className={`${styles.shimmer} ${styles.line} ${styles.lineShort}`} />
    </div>
  </div>
);

export const SkeletonRepoCard = () => (
  <div className={styles.repoCard} aria-hidden="true">
    <div className={`${styles.shimmer} ${styles.line} ${styles.lineMed}`} />
    <div className={`${styles.shimmer} ${styles.line} ${styles.lineLong}`} />
    <div className={`${styles.shimmer} ${styles.line} ${styles.lineXs}`} />
    <div className={styles.metaRow}>
      <div className={`${styles.shimmer} ${styles.dot}`} />
      <div className={`${styles.shimmer} ${styles.line} ${styles.lineStat}`} />
      <div className={`${styles.shimmer} ${styles.line} ${styles.lineStat}`} />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 12, type = 'user' }) => (
  <div className={type === 'user' ? styles.userGrid : styles.repoGrid} role="status" aria-label="Loading…">
    {Array.from({ length: count }).map((_, i) =>
      type === 'user'
        ? <SkeletonUserCard key={i} />
        : <SkeletonRepoCard key={i} />
    )}
  </div>
);
