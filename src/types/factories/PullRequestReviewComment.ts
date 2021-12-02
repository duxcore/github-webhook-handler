import { BaseUser } from "./BaseUser";
import { Reactions } from "./Reactions";

export interface PullRequestReviewCommentEntity {
  url: string;
  pull_request_review_id: number;
  id: number;
  node_id: string;
  diff_hunk: string;
  path: string;
  position: number;
  original_position: number;
  commit_id: string;
  original_commit_id: string;
  user: BaseUser;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  pull_request_url: string;
  author_association: string;
  _links: Links;
  reactions: Reactions;
  start_line?: null;
  original_start_line?: null;
  start_side?: null;
  line: number;
  original_line: number;
  side: string;
}

export interface Links {
  self: SelfOrHtmlOrPullRequest;
  html: SelfOrHtmlOrPullRequest;
  pull_request: SelfOrHtmlOrPullRequest;
}
export interface SelfOrHtmlOrPullRequest {
  href: string;
}