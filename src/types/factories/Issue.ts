import { BaseUser } from "./BaseUser";
import { LabelEntity } from "./LabelEntity";
import { MilestoneEntity } from "./MilestoneEntity";
import { Reactions } from "./Reactions";

export interface IssueEntity {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: BaseUser;
  labels?: (LabelEntity)[] | null;
  state: string;
  locked: boolean;
  assignee: BaseUser;
  assignees?: (BaseUser)[] | null;
  milestone: MilestoneEntity;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  author_association: string;
  active_lock_reason?: null;
  body: string;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app?: null;
}