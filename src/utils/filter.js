export const getUniqueLanguages = (repos) => {
  if (!repos) return [];
  const langs = repos
    .map((r) => r.language)
    .filter(Boolean);
  return ['All', ...new Set(langs)].sort((a, b) =>
    a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b)
  );
};

export const filterRepos = (repos, language) => {
  if (!repos) return [];
  if (!language || language === 'All') return repos;
  return repos.filter((r) => r.language === language);
};
