import { createContext, useContext, useState, useCallback } from 'react';

const BookmarkContext = createContext(null);

const STORAGE_KEY = 'gs-bookmarks';

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const save = (bookmarks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(load);

  const addBookmark = useCallback((repo) => {
    setBookmarks((prev) => {
      if (prev.find((r) => r.id === repo.id)) return prev;
      const next = [...prev, repo];
      save(next);
      return next;
    });
  }, []);

  const removeBookmark = useCallback((repoId) => {
    setBookmarks((prev) => {
      const next = prev.filter((r) => r.id !== repoId);
      save(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (repoId) => bookmarks.some((r) => r.id === repoId),
    [bookmarks]
  );

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error('useBookmarks must be used inside BookmarkProvider');
  return ctx;
};
