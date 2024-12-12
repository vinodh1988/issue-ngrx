import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from '../models/issue.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
 apiUrl = "http://localhost:4500/issues"
  constructor(private http:HttpClient) { }

  getIssues(): Observable<Issue[]>{
    return this.http.get<Issue[]>(this.apiUrl)
  }
  addIssue(issue:Issue): Observable<Issue>{
    return this.http.post<Issue>(this.apiUrl,issue)
  }
  
  updateIssue(issue:Issue): Observable<Issue>{
    return this.http.put<Issue>(this.apiUrl+"/"+issue.id,issue)
  }

  deleteIssue(id:number): Observable<void>{
    return this.http.delete<void>(this.apiUrl+"/"+id)
  }
  

}
