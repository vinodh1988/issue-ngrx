// src/app/prioritization/state/prioritization.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadPriorities = createAction('[Prioritization] Load Priorities');
export const loadPrioritiesSuccess = createAction('[Prioritization] Load Priorities Success', props<{ priorities: string[] }>());
export const loadPrioritiesFailure = createAction('[Prioritization] Load Priorities Failure', props<{ error: any }>());
