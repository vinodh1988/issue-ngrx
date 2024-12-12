import * as IssueActions from '../ngrx/actions/issues.actions';

describe('Issue Actions', () => {
  it('should create an action to load Issues', () => {
    expect(IssueActions.loadIssues().type).toBe('[Issue] Load Issues');
  });

  it('should create an action to load Issues success', () => {
    const payload = { issues: [{ id: 1, description: 'Test Issue', status: "created" }] };
    const action = IssueActions.loadIssuesSuccess(payload);
    expect(action.type).toBe('[Issue] Load Issues Success');
    expect(action.issues).toEqual(payload.issues);
  });

  it('should create an action to add an Issue', () => {
    const issue = { id: 2, description: 'New Issue', status: "assigned" };
    const action = IssueActions.addIssue({ issue });
    expect(action.type).toBe('[Issue] Add Issue');
    expect(action.issue).toEqual(issue);
  });

  it('should create an action to update an Issue', () => {
    const issue = { id: 2, description: 'New Issue', status: "assigned" };
    const action = IssueActions.updateIssue({issue});
    expect(action.type).toBe('[Issue] Update Issues');
    expect(action.issue).toEqual(issue);
  });

  it('should create an action to delete an Issue', () => {
    const id = 2;
    const action = IssueActions.deleteIssue({ id });
    expect(action.type).toBe('[Issue] Delete Issue');
    expect(action.id).toEqual(id);
  });
});
