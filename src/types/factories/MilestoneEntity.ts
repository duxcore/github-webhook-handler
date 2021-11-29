import { BaseUser } from "./BaseUser";

export interface MilestoneEntity {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  description: string;
  creator: BaseUser;
  open_issues: number;
  closed_issues: number;
  state: string;
  created_at: string;
  updated_at: string;
  due_on?: null;
  closed_at?: null;
}