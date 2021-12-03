import { App, PullRequestsEntity } from "./CheckRunEntity";

export interface CheckSuite {
  id: number;
  node_id: string;
  head_branch: string;
  head_sha: string;
  status: string;
  conclusion?: null;
  url: string;
  before: string;
  after: string;
  pull_requests?: (PullRequestsEntity)[] | null;
  app: App;
  created_at: string;
  updated_at: string;
}