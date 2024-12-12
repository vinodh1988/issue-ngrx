import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Issue } from '../models/issue.model';
import { selectAllIssues } from '../ngrx/selectors/issues.selectors';
import { Observable } from 'rxjs';
import * as IssueActions from '../ngrx/actions/issues.actions'

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.css'
})
export class IssuesComponent {
issues$: Observable<Issue[]>
description:string=''
status=""
     constructor(private store: Store<{issues: Issue[]}>) {
            this.issues$ =this.store.pipe(select(selectAllIssues))
     }

     ngOnInit() {
       this.store.dispatch(IssueActions.loadIssues())
     }

     addIssue() {
       if(!this.description.length || this.description.length==0){
         return
       }
       const issue:Issue ={
        id: Number(Math.floor(Math.random()*5000)),
         description: this.description,
         status: "created",
       }
       this.store.dispatch(IssueActions.addIssue({issue:issue}))
       this.description=''
     }

     deleteIssue(id:number){
        this.store.dispatch(IssueActions.deleteIssue({id}))
     }

     updateIssue(status:string,issue:Issue){
        let updated:Issue= {...issue,status:status}
        this.store.dispatch(IssueActions.updateIssue({issue:updated}))
     }
}
