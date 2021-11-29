export interface CommitEntity {
  id: string;
  tree_id: string;
  distinct: boolean;
  message: string;
  timestamp: string;
  url: string;
  author: AuthorOrCommitter;
  committer: AuthorOrCommitter;
  added?: (string)[] | null;
  removed?: (string)[] | null;
  modified?: (string)[] | null;
}

interface AuthorOrCommitter {
  name: string;
  email: string;
  username: string;
}