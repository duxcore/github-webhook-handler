import { BaseUser } from "./BaseUser";

export interface ReviewEntity {
  id: number;
  node_id: string;
  user: BaseUser;
  body: string;
  commit_id: string;
  submitted_at: string;
  state: string;
  html_url: string;
  pull_request_url: string;
  author_association: string;
  _links: Links;
}

export interface Links {
  html: HtmlOrPullRequest;
  pull_request: HtmlOrPullRequest;
}
export interface HtmlOrPullRequest {
  href: string;
}
