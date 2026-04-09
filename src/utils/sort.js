export const SORT_OPTIONS = [
  { value: 'updated', label: 'Recently Updated' },
  { value: 'stars', label: 'Most Stars' },
  { value: 'forks', label: 'Most Forks' },
  { value: 'name', label: 'Name (A–Z)' },
];

export const sortRepos = (repos, sortKey) => {
  if (!repos) return [];
  const sorted = [...repos];
  switch (sortKey) {
    case 'stars':
      return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    case 'forks':
      return sorted.sort((a, b) => b.forks_count - a.forks_count);
    case 'updated':
      return sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};
