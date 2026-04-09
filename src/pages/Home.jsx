import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import UserCard from '../components/UserCard/UserCard';
import { SkeletonGrid } from '../components/Loader/Loader';
import ErrorMessage from '../components/Error/ErrorMessage';
import EmptyState from '../components/EmptyState/EmptyState';
import useDebounce from '../hooks/useDebounce';
import { searchUsers } from '../services/githubApi';
import styles from './Home.module.css';

const RESULTS_PER_PAGE = 12;

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 400);

  const doSearch = useCallback(async (q, p, signal) => {
    if (!q.trim()) {
      setUsers([]);
      setTotalCount(0);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchUsers(q, p, signal);
      if (!signal?.aborted) {
        setUsers(data.items || []);
        setTotalCount(data.total_count || 0);
      }
    } catch (err) {
      if (err.name !== 'AbortError') setError(err);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setPage(1);
    setSearchParams(debouncedQuery ? { q: debouncedQuery } : {}, { replace: true });
    doSearch(debouncedQuery, 1, controller.signal);
    return () => controller.abort();
  }, [debouncedQuery, doSearch, setSearchParams]);

  useEffect(() => {
    if (page === 1) return;
    const controller = new AbortController();
    doSearch(debouncedQuery, page, controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = Math.min(Math.ceil(totalCount / RESULTS_PER_PAGE), 100);

  const renderContent = () => {
    if (loading) return <SkeletonGrid count={12} type="user" />;
    if (error) return <ErrorMessage error={error} onRetry={() => doSearch(debouncedQuery, page)} />;
    if (!debouncedQuery) return <EmptyState variant="initial" />;
    if (users.length === 0) return <EmptyState variant="search" />;

    return (
      <>
        <p className={styles.resultCount} aria-live="polite">
          Showing <strong>{users.length}</strong> of{' '}
          <strong>{totalCount.toLocaleString()}</strong> users
        </p>
        <div className={styles.grid}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Search results pagination">
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ← Prev
            </button>
            <span className={styles.pageInfo}>
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              Next →
            </button>
          </nav>
        )}
      </>
    );
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Explore <span className={styles.accent}>GitHub</span>
        </h1>
        <p className={styles.heroSub}>
          Search developers, browse repositories, and discover amazing open-source work.
        </p>
        <SearchBar value={query} onChange={setQuery} />
      </section>
      <section className={styles.results}>
        {renderContent()}
      </section>
    </main>
  );
};

export default Home;
