import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RepoCard from '../components/RepoCard/RepoCard';
import { SkeletonGrid } from '../components/Loader/Loader';
import ErrorMessage from '../components/Error/ErrorMessage';
import EmptyState from '../components/EmptyState/EmptyState';
import useFetch from '../hooks/useFetch';
import { getUser, getUserRepos } from '../services/githubApi';
import { sortRepos, SORT_OPTIONS } from '../utils/sort';
import { filterRepos, getUniqueLanguages } from '../utils/filter';
import styles from './UserRepos.module.css';

const FolderIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>;
const UsersIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const UserCheckIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;

const StatBadge = ({ icon, label, value }) => (
  <div className={styles.statBadge} title={label}>
    <span aria-hidden="true">{icon}</span>
    <span>{value?.toLocaleString() ?? '—'}</span>
    <span className={styles.statLabel}>{label}</span>
  </div>
);

const UserRepos = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState('updated');
  const [language, setLanguage] = useState('All');

  const fetchUser = useCallback((signal) => getUser(username, signal), [username]);
  const fetchRepos = useCallback((signal) => getUserRepos(username, signal), [username]);

  const { data: user, loading: userLoading, error: userError, refetch: refetchUser } = useFetch(fetchUser, [username]);
  const { data: repos, loading: reposLoading, error: reposError, refetch: refetchRepos } = useFetch(fetchRepos, [username]);

  const languages = useMemo(() => getUniqueLanguages(repos), [repos]);

  const displayedRepos = useMemo(() => {
    const filtered = filterRepos(repos, language);
    return sortRepos(filtered, sortKey);
  }, [repos, language, sortKey]);

  const handleSortChange = useCallback((e) => setSortKey(e.target.value), []);
  const handleLangChange = useCallback((e) => setLanguage(e.target.value), []);

  const renderRepos = () => {
    if (reposLoading) return <SkeletonGrid count={9} type="repo" />;
    if (reposError) return <ErrorMessage error={reposError} onRetry={refetchRepos} />;
    if (!repos || repos.length === 0) return <EmptyState variant="repos" />;
    if (displayedRepos.length === 0) return <EmptyState variant="filtered" />;

    return (
      <div className={styles.repoGrid}>
        {displayedRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    );
  };

  return (
    <main className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)} aria-label="Go back">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      {/* User Profile Header */}
      {userLoading ? (
        <div className={styles.profileSkeleton} aria-hidden="true">
          <div className={styles.profileAvatarSkel} />
          <div className={styles.profileLinesSkel}>
            <div className={styles.profileLine1} />
            <div className={styles.profileLine2} />
          </div>
        </div>
      ) : userError ? (
        <ErrorMessage error={userError} onRetry={refetchUser} />
      ) : user ? (
        <section className={styles.profile}>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${username}'s GitHub profile`}>
            <img
              src={user.avatar_url}
              alt={`${username} avatar`}
              className={styles.avatar}
              width={96}
              height={96}
            />
          </a>
          <div className={styles.profileInfo}>
            <h1 className={styles.name}>{user.name || username}</h1>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className={styles.login}>
              @{username}
            </a>
            {user.bio && <p className={styles.bio}>{user.bio}</p>}
            <div className={styles.profileMeta}>
              {user.location && (
                <span className={styles.metaItem}>
                  <span aria-hidden="true">📍</span> {user.location}
                </span>
              )}
              {user.company && (
                <span className={styles.metaItem}>
                  <span aria-hidden="true">🏢</span> {user.company}
                </span>
              )}
              {user.blog && (
                <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className={styles.metaItem}>
                  <span aria-hidden="true">🔗</span> {user.blog}
                </a>
              )}
            </div>
          </div>
          <div className={styles.stats}>
            <StatBadge icon={<FolderIcon />} label="Repos" value={user.public_repos} />
            <StatBadge icon={<UsersIcon />} label="Followers" value={user.followers} />
            <StatBadge icon={<UserCheckIcon />} label="Following" value={user.following} />
          </div>
        </section>
      ) : null}

      {/* Controls */}
      {repos && repos.length > 0 && (
        <div className={styles.controls}>
          <div className={styles.repoCount}>
            <strong>{displayedRepos.length}</strong>
            {language !== 'All' || displayedRepos.length !== repos.length
              ? ` of ${repos.length} repos`
              : ' repositories'}
          </div>
          <div className={styles.selects}>
            <label htmlFor="sort-select" className={styles.srOnly}>Sort by</label>
            <select
              id="sort-select"
              className={styles.select}
              value={sortKey}
              onChange={handleSortChange}
              aria-label="Sort repositories"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <label htmlFor="lang-select" className={styles.srOnly}>Filter by language</label>
            <select
              id="lang-select"
              className={styles.select}
              value={language}
              onChange={handleLangChange}
              aria-label="Filter by language"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Repo grid */}
      <section className={styles.reposSection}>
        {renderRepos()}
      </section>
    </main>
  );
};

export default UserRepos;
