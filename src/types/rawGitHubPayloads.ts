import { BaseUser } from "./factories/BaseUser";
import { CommitEntity } from "./factories/CommitEntity";
import { Issue } from "./factories/Issue";
import { IssueComment } from "./factories/IssueComment";
import { LabelEntity } from "./factories/LabelEntity";
import { Organization } from "./factories/Organization";
import { ProjectCardEntity } from "./factories/ProjectCardEntitiy";
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
export interface RawGitHubIssue {
  action: string;
  issue: Issue;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - issue_comment
// action - created
export interface RawGitHubIssueComment {
  action: string;
  issue: Issue;
  comment: IssueComment;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - issues
// action - assigned
export interface RawGitHubIssueUserAssigned {
  action: string;
  issue: Issue;
  assignee: BaseUser;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - issues
// action - unassigned
export interface RawGitHubIssueUserUnassigned {
  action: string;
  issue: Issue;
  assignee: BaseUser;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - issues
// action - labeled
export interface RawGitHubIssueLabelAdded {
  action: string;
  issue: Issue;
  label: LabelEntity;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
}

// event - issues
// action - unlabeled
export interface RawGitHubIssueLabelRemoved {
  action: string;
  issue: Issue;
  label: LabelEntity;
  repository: BaseRepository;
  organization: Organization;
  sender: BaseUser;
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
// action - converted
export interface RawGithubProjectCardConverted extends RawGitHubProjectCardEdited {}

