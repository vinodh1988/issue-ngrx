import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import {IssueEffects} from '../ngrx/effects/issues.effects'
import * as IssueActions from '../ngrx/actions/issues.actions';
import { IssueService } from '../services/issue.service';
import { Action } from '@ngrx/store';

describe('IssueEffects', () => {
  let effects: IssueEffects;
  let actions$: Observable<Action>;
  let issueService: jest.Mocked<IssueService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IssueEffects,
        provideMockActions(() => actions$),
        {
          provide: IssueService,
          useValue: {
            getIssues: jest.fn(),
            addIssue: jest.fn(),
            updateIssue: jest.fn(),
            deleteIssue: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.inject(IssueEffects);
    issueService = TestBed.inject(IssueService) as any;
  });

  describe('loadIssue$', () => {
    it('should return a LoadIssueSuccess action call', () => {
      const issues = [{ id: 1, description: 'Test Issie', status: 'created' }];
      const action = IssueActions.loadIssues();
      const outcome = IssueActions.loadIssuesSuccess({ issues });

      actions$ = of(action);
      issueService.getIssues.mockReturnValue(of(issues));

      effects.loadIssues$.subscribe(result => {
        console.log("###################################")
        expect(result).toEqual(outcome);
        expect(issueService.getIssues).toHaveBeenCalled();
      });
    });

    it('should return an AddIssueSucess and should addIssue service function', () => {
        const issue ={ id: 1, description: 'Test Issie', status: 'created' };
        const action = IssueActions.addIssue({ issue });
        const outcome = IssueActions.addIssueSuccess({ issue });

        actions$ = of(action);
        issueService.addIssue.mockReturnValue(of(issue)); // Assuming add method returns Observable of added Todo

        effects.addIssue$.subscribe(result => {
            expect(result).toEqual(outcome);
            expect(issueService.addIssue).toHaveBeenCalledWith(issue);
        });
    });

    it('should return an UpdateIssueSuccess action, with the updated Issue, on success', () => {
        const issue ={ id: 1, description: 'Test Issie', status: 'created' };
        const action = IssueActions.updateIssue({ issue });
        const outcome = IssueActions.updateIssueSuccess({ issue });

        actions$ = of(action);
        issueService.updateIssue.mockReturnValue(of(issue)); // Assuming update method returns Observable of updated Todo

        effects.updateIssue$.subscribe(result => {
            expect(result).toEqual(outcome);
            expect(issueService.updateIssue).toHaveBeenCalledWith(issue);
        });
    });

    it('should return a DeleteIssueSuccess action, with the id of the deleted Issue, on success', () => {
        const id = 2;
        const action = IssueActions.deleteIssue({ id });
        const outcome = IssueActions.deleteIssueSuccess({ id });

        actions$ = of(action);
       
        issueService.deleteIssue.mockReturnValue(EMPTY); // Assuming delete method returns Observable of deleted Todo ID

        effects.deleteIssue$.subscribe(result => {
            expect(result).toEqual(outcome);
            expect(issueService.deleteIssue).toHaveBeenCalledWith(id);
        });
    });

    it("should call the error handler when error is emitted in loadIssues ",   ()=>{
         
        const action=IssueActions.loadIssues();
        const errorAction= {type: "Load Issues Error"}
           
        actions$=of(action);
        console.log("This test case is running")
        const response$ = throwError(()=>new Error('Error Loading issues'));
        issueService.getIssues.mockReturnValue(response$);
        effects.loadIssues$.subscribe( {next: 
              result=>{
                console.log("############## Checked #################")
               expect(result).toEqual(errorAction);
             
              
            }
         })
     
        },15000)
        
       
        it("should call the error handler when error is emitted in addIssue ",   ()=>{
            const issue ={ id: 1, description: 'Test Issie', status: 'created' };
            const action=IssueActions.addIssue({issue});
            const errorAction= {"type": 'Add Issue error'}
               
            actions$=of(action);
            console.log("This test case is running")
            const response$ = throwError(()=>new Error('Error Loading issues'));
            issueService.addIssue.mockReturnValue(response$);
            effects.addIssue$.subscribe( {next: 
                  result=>{
                   
                   expect(result).toEqual(errorAction);
                 
                  
                }
             })
         
            })

            it("should call the error handler when error is emitted in updateIssue ",   ()=>{
                const issue ={ id: 1, description: 'Test Issie', status: 'created' };
                const action=IssueActions.updateIssue({issue});
                const errorAction= {"type": 'update Issue error'}
                   
                actions$=of(action);
              
                const response$ = throwError(()=>new Error('Error Loading issues'));
                issueService.updateIssue.mockReturnValue(response$);
                effects.updateIssue$.subscribe( {next: 
                      result=>{
                       
                       expect(result).toEqual(errorAction);
                     
                      
                    }
                 })
             
                })

                it("should call the error handler when error is emitted in deleteIssue ",   ()=>{
                    const id = 2;
                    const action = IssueActions.deleteIssue({ id });
                    const errorAction= {"type": 'delete Issue error'}
                       
                    actions$=of(action);
                  
                    const response$ = throwError(()=>new Error('Error Deleting issues'));
                    issueService.deleteIssue.mockReturnValue(response$);
                    effects.deleteIssue$.subscribe( {next: 
                          result=>{
                           
                           expect(result).toEqual(errorAction);
                         
                          
                        }
                     })
                 
                    })
    })

  });

  

