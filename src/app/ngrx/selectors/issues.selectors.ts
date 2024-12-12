import { createFeatureSelector,createSelector } from "@ngrx/store";
import { issueAdapter,IssueState } from "../reducers/issues.reducers";

export const selectIssueState = createFeatureSelector<IssueState>('issues'); //reading the property from store

export const {selectAll: selectAllIssues} = issueAdapter.getSelectors(selectIssueState);

export const selectIssueById = (id: number)=> createSelector(
    selectAllIssues,
    issues=>issues.find(x=>x.id===id))

