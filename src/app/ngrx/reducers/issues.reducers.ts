import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Issue } from "../../models/issue.model";
import { createReducer, on } from "@ngrx/store";
import * as IssueActions from '../actions/issues.actions'

export interface IssueState extends EntityState<Issue>{}

export const issueAdapter = createEntityAdapter<Issue>()

export const initialState = issueAdapter.getInitialState()

console.log(initialState)
console.log("check above")

export const issueReducer = createReducer(
    initialState,
    on(IssueActions.loadIssuesSuccess,(state,{issues})=>issueAdapter.setAll(issues,state)),
    on(IssueActions.addIssueSuccess,(state,{issue})=>issueAdapter.addOne(issue,state)),
    on(IssueActions.updateIssueSuccess,(state,{issue})=>issueAdapter.updateOne({id: issue.id,changes:issue},state)),
    on(IssueActions.deleteIssueSuccess,(state,{id})=>issueAdapter.removeOne(id,state))
)

