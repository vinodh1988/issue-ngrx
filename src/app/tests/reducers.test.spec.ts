import { issueReducer, initialState } from '../ngrx/reducers/issues.reducers';
import * as issueActions from '../ngrx/actions/issues.actions';
import { EMPTY } from 'rxjs';
import { Issue } from '../models/issue.model';

describe('Issue Reducer Tests', () => {
  it('should return the initial state if empty event and state is passed', () => {
    const action = {} as any;
    expect(issueReducer(undefined, action)).toEqual(initialState);
  });

  it('should return the Loaded issues correctly', () => {
    const issues:Issue[] = [{ id: 1, description: 'New Issue', status: 'created'}];
    const action = issueActions.loadIssuesSuccess({ issues });
    const state = issueReducer(initialState, action);
    expect(state.entities['1']).toEqual(issues[0]);
  });


  it('should add a todo on addTodo action', () => {
    const issue = { id: 1, description: 'New Issue', status: 'created'};
    const action = issueActions.addIssueSuccess({ issue });
    const state = issueReducer(initialState, action);
    console.log(state.entities)
    expect(state.entities['1']).toEqual(issue);
  });

  it('should update a todo on updateTodo action', () => {
    const initialIssue ={ id: 1, description: 'New Issue', status: 'created'};
    const updatedIssue = { id: 1, description: 'Updated Issue', status: 'created'};
    const addAction = issueActions.addIssueSuccess({ issue: initialIssue });
    const updateAction = issueActions.updateIssueSuccess({ issue: updatedIssue });
    const stateAfterAdd = issueReducer(initialState, addAction);
    const updatedState = issueReducer(stateAfterAdd, updateAction);
    expect(updatedState.entities[1]).toEqual(updatedIssue);
  });

  it('should remove a todo on deleteTodo action', () => {
    const issue = { id: 1, description: 'New Issue', status: 'created'};
    const addAction = issueActions.addIssue({ issue });
    const deleteAction = issueActions.deleteIssue({ id: issue.id });
    const deleteResult = issueActions.deleteIssueSuccess({id: issue.id});
    const stateAfterAdd = issueReducer(initialState, addAction);
    const updatedState = issueReducer(stateAfterAdd, deleteAction);
    const deletedState = issueReducer(updatedState,deleteResult)
    expect(updatedState.entities[issue.id]).toBeUndefined();
    expect(deletedState.entities[issue.id]).toBeUndefined();
  });
});