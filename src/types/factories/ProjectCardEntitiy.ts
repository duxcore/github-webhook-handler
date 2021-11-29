import { BaseUser } from "./BaseUser";

export interface ProjectCardEntity {
  url: string;
  project_url: string;
  column_url: string;
  column_id: number;
  id: number;
  node_id: string;
  note?: null;
  archived: boolean;
  creator: BaseUser;
  created_at: string;
  updated_at: string;
  content_url: string;
}
