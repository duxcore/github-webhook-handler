import { BaseUser } from "./factories/BaseUser";
import { CommitEntity } from "./factories/CommitEntity";
import { IssueEntity } from "./factories/Issue";
import { IssueComment } from "./factories/IssueComment";
import { LabelEntity } from "./factories/LabelEntity";
import { MilestoneEntity } from "./factories/MilestoneEntity";
import { Organization } from "./factories/Organization";
import { ProjectCardEntity } from "./factories/ProjectCardEntitiy";
import { ProjectColumnEntity } from "./factories/ProjectColumnEntity";
import { ProjectEntity } from "./factories/ProjectEntity";
import { Pusher } from "./factories/Pusher";
import { BaseRepository } from "./factories/Repository";

// event - pull
// action (null because its default)
export interface RawGitHubPush {
  ref: string;
  before: string;
  after: string;
  repository: BaseRepository;
  pusher: Pusher;
  organization: Organization;
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
export interface RawGitHubIssueOpened {
  action: string;
  issue: IssueEntity;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - issues
// action - edited
export interface RawGitHubIssueCommentEdited
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
// action - deleted
export interface RawGithubIssueDeleted
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

/**
 * ISSUE COMMENTS
 */

// event - issue_comment
// action - created
export interface RawGitHubIssueComment {
  action: string;
  issue: IssueEntity;
  comment: IssueComment;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - issues
// action - assigned
export interface RawGitHubIssueUserAssigned {
  action: string;
  issue: IssueEntity;
  assignee: BaseUser;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - issues
// action - unassigned
export interface RawGitHubIssueUserUnassigned {
  action: string;
  issue: IssueEntity;
  assignee: BaseUser;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - issues
// action - labeled
export interface RawGitHubIssueLabelAdded {
  action: string;
  issue: IssueEntity;
  label: LabelEntity;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - issues
// action - unlabeled
export interface RawGitHubIssueLabelRemoved {
  action: string;
  issue: IssueEntity;
  label: LabelEntity;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

/**
 * LABELS
 */

// event - label
// action - created
export interface RawGitHubLabelCreated {
  action: string;
  label: LabelEntity;
  repository: BaseRepository;
  organization: Organization;
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
  organization: Organization;
  sender: BaseUser;
}

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

/**
 * PROJECTS
 */

// event - project
// action - created
export interface RawGitHubProjectCreated {
  action: string;
  project: ProjectEntity;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - project
// action - edited
export interface RawGitHubProjectEdited {
  action: string;
  project: ProjectEntity;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - project
// action - closed
export interface RawGitHubProjectCreated {
  action: string;
  project: ProjectEntity;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - project
// action - deleted
export interface RawGitHubProjectDeleted {
  action: string;
  project: ProjectEntity;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

/**
 * PROJECT CARDS
 */

// event - project_card
// action - created
export interface RawGitHubProjectCardCreated {
  action: string;
  project_card: ProjectCardEntity;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
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
export interface RawGithubProjectCardConverted extends RawGitHubProjectCardEdited {}

/**
 * PROJECT COLUMN
 */

// event - project_column
// action - created
export interface RawGitHubProjectColumnCreated {
  action: string;
  project_column: ProjectColumnEntity;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
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

