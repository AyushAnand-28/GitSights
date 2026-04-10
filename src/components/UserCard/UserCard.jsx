import { useNavigate } from 'react-router-dom';
import styles from './UserCard.module.css';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/user/${user.login}`);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${user.login}'s repositories`}
    >
      <div className={styles.avatarWrapper}>
        <img
          className={styles.avatar}
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          loading="lazy"
          width={72}
          height={72}
        />
        <div className={styles.avatarGlow} aria-hidden="true" />
      </div>
      <div className={styles.info}>
        <span className={styles.login}>{user.login}</span>
        <span className={styles.type}>{user.type}</span>
      </div>
      <div className={styles.arrow} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
};

export default UserCard;
