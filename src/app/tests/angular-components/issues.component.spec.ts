import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';

import * as IssueActions from '../../ngrx/actions/issues.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IssuesComponent } from '../../issues/issues.component';
import { selectAllIssues } from '../../ngrx/selectors/issues.selectors';

describe('TodoComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let store: MockStore;
  const initialState = { issues: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuesComponent ],
      imports: [ FormsModule, StoreModule.forRoot({}) ],
      providers: [ provideMockStore({ initialState }) ]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectAllIssues, []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadIssues on init', () => {
    const action = IssueActions.loadIssues();
    const spy = jest.spyOn(store, 'dispatch');//call will be bypassed
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should add new Action when addAction is called', () => {
    const issueDescription = 'Test Todo';
    component.description = issueDescription;
    
    
    const spy = jest.spyOn(store, 'dispatch');
    component.addIssue();
    
    expect(spy).toHaveBeenCalled();
    expect(component.description).toBe(''); 
  });

  it('should not add a action when input is empty', () => {
    component.description = '';
    const spy = jest.spyOn(store, 'dispatch');
    component.addIssue();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should dispatch updateIssue  when issue state is changed', () => {
    const issue = { id: 1, description: 'Test Issue', status: "Assigned" };
    const spy = jest.spyOn(store, 'dispatch');
    component.updateIssue("Resolved",issue);
    expect(spy).toHaveBeenCalledWith(IssueActions.updateIssue({ issue: { ...issue, status: "Resolved" } }));
  });

  it('should dispatch deleteTodo when delete button is clicked', () => {
    const id = 1;
    const spy = jest.spyOn(store, 'dispatch');
    component.deleteIssue(id);
    expect(spy).toHaveBeenCalledWith(IssueActions.deleteIssue({ id }));
  });
});
