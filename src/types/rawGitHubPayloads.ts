import { BaseUser } from "./factories/BaseUser";
import { CommitEntity } from "./factories/CommitEntity";
import { IssueEntity } from "./factories/Issue";
import { IssueComment } from "./factories/IssueComment";
import { LabelEntity } from "./factories/LabelEntity";
import { MilestoneEntity } from "./factories/MilestoneEntity";
import { BaseOrganization } from "./factories/Organization";
import { ProjectCardEntity } from "./factories/ProjectCardEntitiy";
import { ProjectColumnEntity } from "./factories/ProjectColumnEntity";
import { ProjectEntity } from "./factories/ProjectEntity";
import { Pusher } from "./factories/Pusher";
import { BaseRepository } from "./factories/Repository";
import { ForkeeEntity } from "./factories/ForkeeEntity";
import { PullRequestEntity } from "./factories/PullRequestEntity";
import { ReviewEntity } from "./factories/ReviewEntity";
import { PullRequestReviewCommentEntity } from "./factories/PullRequestReviewComment";
import { PullRequestReviewThread } from "./factories/PullRequestReviewThread";

type PayloadBase<P = {}> = P & {
  action: string;
  repository: BaseRepository;
  organization: BaseOrganization;
  sender: BaseUser;  
}

type ActionlessPayloadBase<P = {}> = P & {
  repository: BaseRepository;
  organization: BaseOrganization;
  sender: BaseUser;
}



// event - pull
// action (null because its default)
export interface RawGitHubPush {
  ref: string;
  before: string;
  after: string;
  repository: BaseRepository;
  pusher: Pusher;
  organization: BaseOrganization;
  sender: BaseUser;
  created: boolean;
  deleted: boolean;
  forced: boolean;
  base_ref?: null;
  compare: string;
  commits?: (CommitEntity)[] | null;
  head_commit: CommitEntity;
}

// event - fork
// action - (undefined)
export interface RawGitHubRepositoryForked extends ActionlessPayloadBase {
  forkee: ForkeeEntity
}

type RGT<E extends keyof RawGitHubTypes, A extends keyof RawGitHubTypes[E]> = RawGitHubTypes[E][A]

export interface RawGitHubTypes  {

  /**
   * ISSUES
   */
  issues: {
    opened: PayloadBase & {
      issue: IssueEntity;
    };
    edited: RawGitHubTypes["issues"]["opened"] & {
      changes: {
        body?: {
          from: string
        },
        title?: {
          from: string
        }
      }
    };
    closed: & RGT<"issues", "opened">;
    deleted: & RGT<"issues", "opened">;
    pinned: & RGT<"issues", "opened">;
    unpinned: & RGT<"issues", "opened">;
    locked: & RGT<"issues", "opened">;
    unlocked: & RGT<"issues", "opened">;
    milestoned: & RGT<"issues", "opened"> & {
      milestone: MilestoneEntity;
    };
    demilestoned: & RGT<"issues", "milestoned">
    assigned: & RGT<"issues", "opened"> & {
      assignee: BaseUser;
    };
    unassigned: & RGT<"issues", "assigned">
    labeled: & RGT<"issues", "opened"> & {
      label: LabelEntity
    };
    unlabeled: & RGT<"issues", "labeled">;
  };

  /**
   * ISSUE COMMENTS
   */
  issue_comment: {
    created: PayloadBase & {
      issue: IssueEntity;
      comment: IssueComment;
    };
    edited: RGT<"issue_comment", "created"> & {
      changes: {
        body: {
          from: string;
        }
      }
    },
    deleted: & RGT<"issue_comment", "created">;
  };

  /**
   * LABELS
   */
  label: {
    created: PayloadBase & {
      label: LabelEntity;
    };
    edited: & RGT<"label", "created"> & {
      changes: {
        name?: {
          from: string;
        },
        color?: {
          from: string;
        },
        description?: {
          from: string;
        }
      }
    };
    deleted: & RGT<"label", "created">;
  };

  /**
   * MILESTONES
   */
  milestone: {
    created: PayloadBase & {
      milestone: MilestoneEntity;
    },
    edited: & RGT<"milestone", "created"> & {
      changes: {
        title?: {
          from: string
        };
        description?: {
          from: string
        };
      };
    };
    deleted: & RGT<"milestone", "created">;
  };

  /**
   * PROJECTS
   */
  project: {
    created: PayloadBase & {
      project: ProjectEntity;
    };
    edited: & RGT<"project", "created">;
    closed: & RGT<"project", "created">;
    deleted: & RGT<"project", "created">;
  };

  /**
   * PROJECT CARDS
   */
  project_card: {
    created: PayloadBase & {
      project_card: ProjectCardEntity;
    };
    edited: & RGT<"project_card", "created"> & {
      changes: {
        note: {
          from: string;
        };
      };
    };
    deleted: & RGT<"project_card", "created">;
    moved: & RGT<"project_card", "created"> & {
      changes: {
        collumn_id: {
          from: number;
        };
      };
    };
    converted: & RGT<"project_card", "created">;
  };

  /**
   * PROJECT COLUMNS
   */
  project_column: {
    created: PayloadBase & {
      project_column: ProjectColumnEntity;
    };
    edited: & RGT<"project_column", "created"> & {
      changes: {
        name: {
          from: string;
        };
      };
    };
    deleted: & RGT<"project_column", "created">;
    moved: & RGT<"project_column", "created">;
  }

  /**
   * REPOSITORY STARS
   */
  star: {
    created: PayloadBase & {
      starred_at: string;
    };
    deleted: PayloadBase & {
      starred_at: null;
    };
  };

  /**
   * REPOSITORY
   */
  repository: {
    publicized: PayloadBase;
  }

  /**
   * PULL REQUESTS
   */
  pull_request:  {
    opened: PayloadBase & {
      number: number;
      pull_request: PullRequestEntity;
    };
    edited: & RGT<"pull_request", "opened"> & {
      changes:  {
        body?: {
          from: string;
        };
        title?: {
          from: string;
        };
      };
    };
    closed: & RGT<"pull_request", "opened">;
    reopened: & RGT<"pull_request", "opened">;
    converted_to_draft: & RGT<"pull_request", "opened">;
    ready_for_review: & RGT<"pull_request", "opened">;
    assigned: & RGT<"pull_request", "opened"> & {
      assignee: BaseUser;
    };
    unassigned: & RGT<"pull_request", "assigned">;
    labeled: & RGT<"pull_request", "opened"> & {
      label: LabelEntity;
    };
    unlabeled: & RGT<"pull_request", "labeled">;
    locked: & RGT<"pull_request", "opened">;
    unlocked: & RGT<"pull_request", "locked">;
    review_request: & RGT<"pull_request", "opened"> & {
      requested_reviewer: BaseUser;
    };
    review_request_removed: & RGT<"pull_request", "review_request">;
  }

  /**
   * PULL REQUEST REVIEWS
   */
  pull_request_review: {
    submitted: PayloadBase & {
      review: ReviewEntity;
      pull_request: PullRequestEntity;
    };
    edited: & RGT<"pull_request_review", "submitted"> & {
      changes: {
        body: {
          from: string;
        };
      };
    };
  };

  /**
   * PULL REQUEST REVIEW COMMENTS
   */
   pull_request_review_comment: {
     created: PayloadBase & {
      comment: PullRequestReviewCommentEntity;
      pull_request: PullRequestEntity
     };
     edited: & RGT<"pull_request_review_comment", "created"> & {
      changes: {
        body: {
          from: string;
        };
      };
    };
   };

   /**
    * PULL REQUEST REVIEW THREAD
    */
    pull_request_review_thread: {
      resolved: PayloadBase & {
        pull_request: PullRequestEntity;
        thread: PullRequestReviewThread;
      };
    };


}

function test<E extends keyof RawGitHubTypes, A extends keyof RawGitHubTypes[E]>(event: E, action: A): RawGitHubTypes[E][A] {
  return {} as RawGitHubTypes[E][A];
}

console.log((typeof test("issues", "edited")) == (typeof test("issues", "opened")))