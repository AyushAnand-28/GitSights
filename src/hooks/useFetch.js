import { useState, useEffect, useCallback, useRef } from 'react';

const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const execute = useCallback(async () => {
    // Abort any in-flight request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn(controller.signal);
      if (!controller.signal.aborted) {
        setData(result);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    execute();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [execute]);

  return { data, loading, error, refetch: execute };
};

export default useFetch;
