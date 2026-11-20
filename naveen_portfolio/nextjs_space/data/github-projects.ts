export interface GithubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  homepage: string | null;
  topics: string[];
  created: string;
  updated: string;
}

export const githubRepos: GithubRepo[] = [
  {
    name: 'VALENTINES',
    description: 'A Valentine\'s Day themed web project',
    language: 'HTML',
    stars: 0,
    forks: 0,
    url: 'https://github.com/NAVEENPAUL257/VALENTINES',
    homepage: null,
    topics: [],
    created: '2024-07-04T11:44:06Z',
    updated: '2026-02-08T13:52:03Z',
  },
];
