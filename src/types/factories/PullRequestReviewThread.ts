import { PullRequestReviewCommentEntity } from "./PullRequestReviewComment";

export interface PullRequestReviewThread {
  node_id: string;
  comments?: (PullRequestReviewCommentEntity)[] | null;
}