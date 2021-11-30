import { BaseUser } from "./BaseUser";
import { HeadOrBase } from "./HeadOrBase";
import { LabelEntity } from "./LabelEntity";
import { MilestoneEntity } from "./MilestoneEntity";

export interface PullRequestEntity {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: BaseUser;
  body: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string | null;
  assignee: BaseUser | null;
  assignees?: (BaseUser)[] | null;
  requested_reviewers?: (BaseUser)[] | null;
  requested_teams?: (null)[] | null;
  labels?: (LabelEntity)[] | null;
  milestone: MilestoneEntity;
  draft: boolean;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  head: HeadOrBase;
  base: HeadOrBase;
  _links: Links;
  author_association: string;
  auto_merge?: null;
  active_lock_reason: string | null;
  merged: boolean;
  mergeable?: null;
  rebaseable?: null;
  mergeable_state: string;
  merged_by: BaseUser | null;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

export interface Links {
  self: LinkObject;
  html: LinkObject;
  issue: LinkObject;
  comments: LinkObject;
  review_comments: LinkObject;
  review_comment: LinkObject;
  commits: LinkObject;
  statuses: LinkObject;
}
export interface LinkObject {
  href: string;
}
