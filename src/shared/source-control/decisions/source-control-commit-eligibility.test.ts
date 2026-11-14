import { describe, expect, it } from 'vitest'
import {
  isCommitMessageFieldDisabled,
  type CommitEligibilityInputs
} from './source-control-commit-eligibility'

const base: CommitEligibilityInputs = {
  stagedCount: 0,
  hasPartiallyStagedChanges: false,
  hasMessage: false,
  hasUnresolvedConflicts: false,
  isCommitting: false,
  isRemoteOperationActive: false
}

describe('isCommitMessageFieldDisabled', () => {
  it('stays editable with nothing staged', () => {
    expect(isCommitMessageFieldDisabled(base)).toBe(false)
  })
  it('locks during commit, remote, PR operations and conflicts', () => {
    expect(isCommitMessageFieldDisabled({ ...base, isCommitting: true })).toBe(true)
    expect(isCommitMessageFieldDisabled({ ...base, isRemoteOperationActive: true })).toBe(true)
    expect(isCommitMessageFieldDisabled({ ...base, isPullRequestOperationActive: true })).toBe(true)
    expect(isCommitMessageFieldDisabled({ ...base, hasUnresolvedConflicts: true })).toBe(true)
  })
})
