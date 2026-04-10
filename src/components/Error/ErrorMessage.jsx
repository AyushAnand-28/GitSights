import styles from './Error.module.css';

const ErrorMessage = ({ error, onRetry }) => {
  const isRateLimit = error?.isRateLimit;

  return (
    <div className={styles.wrapper} role="alert" aria-live="assertive">
      <div className={styles.icon} aria-hidden="true">
        {isRateLimit ? '⏳' : '⚠️'}
      </div>
      <h2 className={styles.title}>
        {isRateLimit ? 'Rate Limit Reached' : 'Something went wrong'}
      </h2>
      <p className={styles.message}>
        {error?.message || 'An unexpected error occurred. Please try again.'}
      </p>
      {isRateLimit && (
        <p className={styles.hint}>
          GitHub allows 60 unauthenticated requests per hour.
          Add a <code>VITE_GITHUB_TOKEN</code> env variable to increase limits.
        </p>
      )}
      {onRetry && !isRateLimit && (
        <button className={styles.retry} onClick={onRetry} type="button">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
