import { BaseUser } from "./factories/BaseUser";
import { Issue } from "./factories/Issue";
import { Organization } from "./factories/Organization";
import { Reactions } from "./factories/Reactions";
import { RepositoryRaw } from "./factories/Repository";

export interface RawGitHubIssue {
  action: string;
  issue: Issue;
  repository: RepositoryRaw;
  organization: Organization;
  sender: BaseUser;
}