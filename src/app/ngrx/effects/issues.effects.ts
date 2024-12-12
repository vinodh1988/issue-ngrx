import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IssueService } from "../../services/issue.service";
import * as IssueActions from '../actions/issues.actions'
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class IssueEffects{
    constructor(private actions$:Actions,private issueService:IssueService){

    }

    loadIssues$= createEffect(()=> this.actions$.pipe(
           ofType(IssueActions.loadIssues),
           mergeMap(
            ()=>this.issueService.getIssues().pipe(
                map(issues => IssueActions.loadIssuesSuccess({issues})),
                catchError(()=> of({type: 'Load Issues error'}))
            )
           )
    ))

    addIssue$ = createEffect(()=> this.actions$.pipe(
        ofType(IssueActions.addIssue),
        mergeMap(
            ({issue})=> this.issueService.addIssue(issue).pipe(
                map(addedIssue=> IssueActions.addIssueSuccess({issue: addedIssue})),
                catchError(()=> of({type: 'Add Issue error'}))
            )
        )
    ))

    updateIssue$ = createEffect(()=> this.actions$.pipe(
        ofType(IssueActions.updateIssue),
        mergeMap(
            ({issue})=> this.issueService.updateIssue(issue).pipe(
                map(addedIssue=> IssueActions.updateIssueSuccess({issue: addedIssue})),
                catchError(()=> of({type: 'update Issue error'}))
            )
        )
    ))

    deleteIssue$ = createEffect(()=> this.actions$.pipe(
        ofType(IssueActions.deleteIssue),
        mergeMap(
            ({id})=> this.issueService.deleteIssue(id).pipe(
                map(()=> IssueActions.deleteIssueSuccess({id})),
                catchError(()=> of({type: 'delete Issue error'}))
            )
        )
    ))
}