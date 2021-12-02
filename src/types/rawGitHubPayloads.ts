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
import { BranchProtectionRuleEntity, EditableBranchRules } from "./factories/BranchProtectionRuleEntity";

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


type PayloadInjector<D> = {
  [E in keyof D]: {
    [A in keyof D[E]]: PayloadBase<D[E][A]>
  }
}

type CommonTypeInjector<Target, Payload> = {
  [Action in keyof Target]: Payload & Target[Action];
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

export type RawGitHubTypes = PayloadInjector<{
  branch_protection_rule: CommonTypeInjector<{
    created: {},
    edit: {
      changes: {
        [rule in keyof EditableBranchRules]?: {
          from: EditableBranchRules[rule]
        };
      };
    };
    deleted: {}
  }, { rule: BranchProtectionRuleEntity }>

  /**
   * ISSUES
   */
  issues: CommonTypeInjector<{
    opened: {};
    edited: {
      changes: {
        body?: {
          from: string
        },
        title?: {
          from: string
        }
      }
    };
    closed: {}
    reopened: {}
    transferred: {}
    deleted: {}
    pinned: {}
    unpinned: {}
    locked: {}
    unlocked: {}
    milestoned: {
      milestone: MilestoneEntity;
    };
    demilestoned: & RGT<"issues", "milestoned">
    assigned: {
      assignee: BaseUser;
    };
    unassigned: & RGT<"issues", "assigned">
    labeled: {
      label: LabelEntity
    };
    unlabeled: & RGT<"issues", "labeled">;
  }, { issue: IssueEntity }>;

  /**
   * ISSUE COMMENTS
   */
  issue_comment: CommonTypeInjector<{
    created: {
      issue: IssueEntity;
      comment: IssueComment;
    };
    edited: {
      changes: {
        body: {
          from: string;
        }
      }
    },
    deleted: {};
  }, {
    issue: IssueEntity;
    comment: IssueComment;
  }>;

  /**
   * LABELS
   */
  label: CommonTypeInjector<{
    created: {};
    edited: {
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
    deleted: {};
  }, { label: LabelEntity; }>;

  /**
   * MILESTONES
   */
  milestone: CommonTypeInjector<{
    created: {},
    edited: {
      changes: {
        title?: {
          from: string
        };
        description?: {
          from: string
        };
      };
    };
    deleted: {};
  }, {
    milestone: MilestoneEntity
  }>;

  /**
   * PROJECTS
   */
  project: CommonTypeInjector<{
    created: {}
    edited: {
      changes: {
        name?: {
          from: string;
        },
        body?: {
          from: string;
        }
      }
    };
    closed: {};
    reopened: {}; 
    deleted: {};
  }, {
    project: ProjectEntity;
  }>;

  /**
   * PROJECT CARDS
   */
  project_card: {
    created: {
      project_card: ProjectCardEntity;
      after_id: number | null;
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
  project_column: CommonTypeInjector<{
    created: {};
    edited: {
      changes: {
        name: {
          from: string;
        };
      };
    };
    deleted: {};
    moved: {};
  }, {
    project_column: ProjectColumnEntity;
    after_id: number | null;
  }>

  /**
   * REPOSITORY STARS
   */
  star: {
    created: {
      starred_at: string;
    };
    deleted: {
      starred_at: null;
    };
  };

  /**
   * REPOSITORY
   */
  repository:{
    created: {}
    deleted: {};
    archived: {};
    unarchived: {};
    edited: {};
    renamed: {};
    transferred: {};
    publicized: {};
    privitized: {};
  }

  /**
   * PULL REQUESTS
   */
  pull_request:  CommonTypeInjector<{
    opened: {};
    edited: {
      changes:  {
        body?: {
          from: string;
        };
        title?: {
          from: string;
        };
      };
    };
    closed: {}
    reopened: {}
    converted_to_draft: {}
    ready_for_review: {}
    assigned:{
      assignee: BaseUser;
    };
    unassigned: & RGT<"pull_request", "assigned">;
    labeled: {
      label: LabelEntity;
    };
    unlabeled: & RGT<"pull_request", "labeled">;
    locked: {}
    unlocked: & RGT<"pull_request", "locked">;
    review_request: {
      requested_reviewer: BaseUser;
    };
    review_request_removed: & RGT<"pull_request", "review_request">;
    synchronize: {}
    auto_merge_enabled: {};
    auto_merge_disabled: {};
  }, {
    number: number;
    pull_request: PullRequestEntity;
  }>;

  /**
   * PULL REQUEST REVIEWS
   */
  pull_request_review: CommonTypeInjector<{
    submitted: {};
    dismissed: {};
    edited: {
      changes: {
        body: {
          from: string;
        };
      };
    };
  }, {
    review: ReviewEntity;
    pull_request: PullRequestEntity;
  }>;

  /**
   * PULL REQUEST REVIEW COMMENTS
   */
   pull_request_review_comment: CommonTypeInjector<{
     created: {}
     edited: {
      changes: {
        body: {
          from: string;
        };
      };
    };
   }, {
    comment: PullRequestReviewCommentEntity;
    pull_request: PullRequestEntity
   }>;

   /**
    * PULL REQUEST REVIEW THREAD
    */
    pull_request_review_thread: {
      resolved: {
        pull_request: PullRequestEntity;
        thread: PullRequestReviewThread;
      };
    };
}>

function test<E extends keyof RawGitHubTypes, A extends keyof RawGitHubTypes[E]>(event: E, action: A): RawGitHubTypes[E][A] {
  return {} as RawGitHubTypes[E][A];
}
// test("branch_protection_rule", "deleted").