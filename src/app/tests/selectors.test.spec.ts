
import * as issueReducer from '../ngrx/reducers/issues.reducers';
import * as issueSelector from '../ngrx/selectors/issues.selectors';


describe('Issue Selectors', () => {
  const initialState: any = {
    issues: issueReducer.issueAdapter.setAll(
      [{ id: 1, description:"Dummy issue",status:"created"}],
      issueReducer.initialState
    )
  };

  it('should select an Issue By id', () => {
    const result = issueSelector.selectIssueById(1).projector(
        issueSelector.selectAllIssues(initialState));
    expect(result).toEqual({ id: 1, description:"Dummy issue",status:"created"});

    })

  it('should select all Issues', () => {
    expect(issueSelector.selectAllIssues(initialState)).toEqual([{ id: 1, description:"Dummy issue",status:"created"}]);
  });

  
});
