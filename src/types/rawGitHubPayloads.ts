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

/**
 * ISSUES
 */

// event - issues
// action - opened
export interface RawGitHubIssueOpened extends PayloadBase {
  issue: IssueEntity;
}

// event - issues
// action - edited
export interface RawGitHubIssueEdited
  extends RawGitHubIssueOpened {
    changes: {
      body?: {
        from: string
      },
      title?: {
        from: string
      }
    }
}

// event - issues
// action - closed
export interface RawGitHubIssueClosed
  extends RawGitHubIssueOpened {}

// event - issues
// action - deleted
export interface RawGitHubIssueDeleted
  extends RawGitHubIssueOpened {}

// event - issues
// action - pinned
export interface RawGitHubIssuePinned
  extends RawGitHubIssueOpened {}

// event - issues
// action - unpinned
export interface RawGitHubIssueUnpinned
  extends RawGitHubIssueOpened {}

// event - issues
// action - locked
export interface RawGitHubIssueLocked
  extends RawGitHubIssueOpened {}

// event - issues
// action - unlocked
export interface RawGitHubIssueUnlocked
  extends RawGitHubIssueOpened {}

// event - issues
// action - milestoned
export interface RawGitHubIssueMilestoned
  extends RawGitHubIssueOpened {
    milestone: MilestoneEntity;
  }

// event - issues
// action - demilestoned
export interface RawGitHubIssueDemilestoned
  extends RawGitHubIssueOpened {
    milestone: MilestoneEntity;
  } 

// event - issues
// action - assigned
export interface RawGitHubIssueUserAssigned extends PayloadBase {
  issue: IssueEntity;
  assignee: BaseUser;
}

// event - issues
// action - unassigned
export interface RawGitHubIssueUserUnassigned extends PayloadBase {
  issue: IssueEntity;
  assignee: BaseUser;
}

// event - issues
// action - labeled
export interface RawGitHubIssueLabelAdded extends PayloadBase {
  issue: IssueEntity;
  label: LabelEntity;
}

// event - issues
// action - unlabeled
export interface RawGitHubIssueLabelRemoved extends PayloadBase {
  issue: IssueEntity;
  label: LabelEntity;
}

/**
 * ISSUE COMMENTS
 */

// event - issue_comment
// action - created
export interface RawGitHubIssueCommentCreated extends PayloadBase{
  issue: IssueEntity;
  comment: IssueComment;
}

// event - issue_comment
// action - edited
export interface RawGitHubIssueCommentEdited  
  extends RawGitHubIssueCommentCreated {
    changes: {
      body: {
        from: string;
      }
    }
  }

// event - issue_comment
// action - deleted
export interface RawGitHubissueCommentDeleted 
  extends RawGitHubIssueCommentCreated {}



/**
 * LABELS
 */

// event - label
// action - created
export interface RawGitHubLabelCreated {
  action: string;
  label: LabelEntity;
  repository: BaseRepository;
  organization: BaseOrganization;
  sender: BaseUser;
}

// event - label
// action - edited
export interface RawGitHubLabelEdited 
  extends RawGitHubLabelCreated {
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
  }

// event - label
// action - deleted
export interface RawGitHubLabelDeleted 
  extends RawGitHubLabelCreated {}

/**
 * MILESTONES
 */

// event - milestone
// action - created
export interface RawGitHubMilestoneCreated {
  action: string;
  milestone: MilestoneEntity;
  repository: BaseRepository;
  organization: BaseOrganization;
  sender: BaseUser;
}

// event - milestone
// action - edited
export interface RawGitHubMilestoneEdited
  extends RawGitHubMilestoneCreated {
    changes: {
      title?: {
        from: string
      },
      description?: {
        from: string
      }
    }
  }

// event - milestone
// action - deleted
export interface RawGitHubMilestoneDeleted
  extends RawGitHubMilestoneCreated {}

/**
 * PROJECTS
 */

// event - project
// action - created
export interface RawGitHubProjectCreated extends PayloadBase {
  project: ProjectEntity;
}

// event - project
// action - edited
export interface RawGitHubProjectEdited extends PayloadBase{
  project: ProjectEntity;
}

// event - project
// action - closed
export interface RawGitHubProjectCreated extends PayloadBase {
  project: ProjectEntity;
}

// event - project
// action - deleted
export interface RawGitHubProjectDeleted extends PayloadBase{
  project: ProjectEntity;
}

/**
 * PROJECT CARDS
 */

// event - project_card
// action - created
export interface RawGitHubProjectCardCreated extends PayloadBase{
  project_card: ProjectCardEntity;
}

// event - project_card
// action - edited
export interface RawGitHubProjectCardEdited extends RawGitHubProjectCardCreated {
  changes: {
    note: {
      from: string;
    },
  }
}

// event - project_card
// action - moved
export interface RawGitHubProjectCardMoved
  extends RawGitHubProjectCardCreated {
    changes: {
      column_id: {
        from: number
      }
    }
  }

// event - project_card
// action - converted
export interface RawGitHubProjectCardConverted extends RawGitHubProjectCardEdited {}

/**
 * PROJECT COLUMN
 */

// event - project_column
// action - created
export interface RawGitHubProjectColumnCreated extends PayloadBase {
  project_column: ProjectColumnEntity;
}

// event - project_column
// action - edited
export interface RawGitHubProjectColumnEdited
  extends RawGitHubProjectColumnCreated {
    changes: {
      name: {
        from: string
      }
    }
  }

// event - project_column
// action - deleted
export interface RawGitHubProjectColumnDeleted
  extends RawGitHubProjectColumnCreated {}

// event - project_column
// action - moved
export interface RawGitHubProjectColumnMoved
  extends RawGitHubProjectColumnCreated {}

/**
 * REPOSITORY STARS
 */

// event - star
// action - created
export interface RawGitHubStarCreated extends PayloadBase{
  starred_at: string;
}

// event - star
// action - deleted
export interface RawGitHubStarDeleted extends PayloadBase {
  starred_at: null;
}

/**
 * REPOSITORY WATCH
 */

// event - watch
// action - started
export interface RawGitHubWatchStarted extends PayloadBase {}

/**
 * REPOSITORY
 */

// event - repository
// action - publicized
export interface RawGitHubRepositoryPublicized extends PayloadBase {}

// event - fork
// action - (undefined)
export interface RawGitHubRepositoryForked extends ActionlessPayloadBase {
  forkee: ForkeeEntity
}

/**
 * PULL REQUESTS
 */

// event - pull_request
// action - opened
export interface RawGitHubPullRequestOpened extends PayloadBase {
  number: number;
  pull_request: PullRequestEntity
}

// event - pull_request
// action - edited
export interface RawGitHubPullRequestEdited extends RawGitHubPullRequestOpened {
  changes:  {
    body?: {
      from: string
    },
    title?: {
      from: string
    }
  }
}

// event - pull_request
// action - closed
export interface RawGitHubPullRequestClosed extends RawGitHubPullRequestOpened {}

// event - pull_request
// action - converted_to_draft
export interface RawGitHubPullRequestConvertedToDraft extends RawGitHubPullRequestOpened {}

// event - pull_request
// action - ready_for_review
export interface RawGitHubPullRequestReadyForReview extends RawGitHubPullRequestOpened {}

// event - pull_request
// action - assigned
export interface RawGitHubPullRequestUserAssigned extends RawGitHubPullRequestOpened {
  assignee: BaseUser;
}

// event - pull_request
// action - labeled
export interface RawGitHubPullRequestLabeled extends RawGitHubPullRequestOpened {
  label: LabelEntity
}

// event - pull_request
// action - unlabeled
export interface RawGitHubPullRequestUnlabeled extends RawGitHubPullRequestOpened {
  label: LabelEntity
}

// event - pull_request
// action - unassigned
export interface RawGitHubPullRequestUserUnassigned extends RawGitHubPullRequestOpened {
  assignee: BaseUser;
}

// event - pull_request
// action - review_requested
export interface RawGitHubPullRequestReviewRequested extends RawGitHubPullRequestOpened {
  requested_reviewer: BaseUser
}

