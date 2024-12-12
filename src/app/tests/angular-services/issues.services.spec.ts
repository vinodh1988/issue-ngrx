import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue.model';

describe('TodoService', () => {
  let service: IssueService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IssueService]
    });
    service = TestBed.inject(IssueService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpController.verify();
  });

  it('should retrieve all issues', () => {
    const mockIssues: Issue[] = [{ id: 1, description: 'Test Issue', status: "created" }];

    service.getIssues().subscribe(issues => {
      expect(issues).toEqual(mockIssues);
    });

    const req = httpController.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockIssues); //avoid making http calls instead return mockdate
  });

  it('should add a issue', () => {
    const newIssue: Issue ={ id: 1, description: 'Test Issue', status: "created" };

    service.addIssue(newIssue).subscribe({next: 
        (issue:Issue) => {
               expect(issue).toEqual(newIssue);
                }
    });

    const req = httpController.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newIssue);
    req.flush(newIssue);
  });

  it('should update an issue', () => {
    const updatedIssue: Issue = { id: 1, description: 'Test Issue', status: "Assigned" };

    service.updateIssue(updatedIssue).subscribe(issue=> {
      expect(issue).toEqual(updatedIssue);
    });

    const req = httpController.expectOne(`${service.apiUrl}/${updatedIssue.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedIssue);
    req.flush(updatedIssue);
  });

  it('should delete an issue', () => {
    const issueId = 1;

    service.deleteIssue(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpController.expectOne(`${service.apiUrl}/${issueId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
