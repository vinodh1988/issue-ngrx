import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as PrioritizationActions from '../actions/pririoritization.actions';

@Injectable()
export class PrioritizationEffects {

  loadPriorities$ = createEffect(() => this.actions$.pipe(
    ofType(PrioritizationActions.loadPriorities),
    mergeMap(() => of(['High', 'Medium', 'Low']).pipe(
      map(priorities => PrioritizationActions.loadPrioritiesSuccess({ priorities })),
      catchError(error => of(PrioritizationActions.loadPrioritiesFailure({ error })))
    ))
  ));

  constructor(private actions$: Actions) {}
}
