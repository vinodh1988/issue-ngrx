import { createAction, props } from "@ngrx/store";
import { Issue } from "../../models/issue.model";

export const loadIssues = createAction("[Issue] Load Issues")
export const loadIssuesSuccess = createAction("[Issue] Load Issues Success",props<{issues: Issue[]}>())

export const addIssue = createAction("[Issue] Add Issue",props<{issue: Issue}>())
export const addIssueSuccess = createAction("[Issue] Add Issue Success",props<{issue: Issue}>())

export const updateIssue = createAction("[Issue] Update Issues",props<{issue: Issue}>())
export const updateIssueSuccess = createAction("[Issue] Update Issue Success",props<{issue: Issue}>())

export const deleteIssue= createAction("[Issue] Delete Issue",props<{id:number}>())
export const deleteIssueSuccess = createAction("[Issue] Delete Success",props<{id:number}>())
