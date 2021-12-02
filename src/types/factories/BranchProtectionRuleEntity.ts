export interface BranchProtectionRuleEntity extends EditableBranchRules {
  id: number;
  repository_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface EditableBranchRules {
  pull_request_reviews_enforcement_level: string;
  required_approving_review_count: number;
  dismiss_stale_reviews_on_push: boolean;
  require_code_owner_review: boolean;
  authorized_dismissal_actors_only: boolean;
  ignore_approvals_from_contributors: boolean;
  required_status_checks?: (string)[] | null;
  required_status_checks_enforcement_level: string;
  strict_required_status_checks_policy: boolean;
  signature_requirement_enforcement_level: string;
  linear_history_requirement_enforcement_level: string;
  admin_enforced: boolean;
  allow_force_pushes_enforcement_level: string;
  allow_deletions_enforcement_level: string;
  merge_queue_enforcement_level: string;
  required_deployments_enforcement_level: string;
  required_conversation_resolution_level: string;
  authorized_actors_only: boolean;
  authorized_actor_names?: (string)[] | null;
}