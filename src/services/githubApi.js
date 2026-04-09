const BASE_URL = 'https://api.github.com';

const buildHeaders = () => {
  const headers = {
    Accept: 'application/vnd.github+json',
  };
  if (import.meta.env.VITE_GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`;
  }
  return headers;
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const isRateLimit = res.status === 403 || res.status === 429;
    const data = await res.json().catch(() => ({}));
    const error = new Error(
      isRateLimit
        ? 'GitHub API rate limit exceeded. Please wait a moment and try again.'
        : data.message || `Request failed with status ${res.status}`
    );
    error.status = res.status;
    error.isRateLimit = isRateLimit;
    throw error;
  }
  return res.json();
};

export const searchUsers = async (query, page = 1, signal) => {
  const url = `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=12`;
  const res = await fetch(url, { headers: buildHeaders(), signal });
  return handleResponse(res);
};

export const getUser = async (username, signal) => {
  const url = `${BASE_URL}/users/${encodeURIComponent(username)}`;
  const res = await fetch(url, { headers: buildHeaders(), signal });
  return handleResponse(res);
};

export const getUserRepos = async (username, signal) => {
  const url = `${BASE_URL}/users/${encodeURIComponent(username)}/repos?per_page=100`;
  const res = await fetch(url, { headers: buildHeaders(), signal });
  return handleResponse(res);
};
