import { BaseUser } from "./BaseUser";

export interface ProjectEntity {
  owner_url: string;
  url: string;
  html_url: string;
  columns_url: string;
  id: number;
  node_id: string;
  name: string;
  body: string;
  number: number;
  state: string;
  creator: BaseUser;
  created_at: string;
  updated_at: string;
}