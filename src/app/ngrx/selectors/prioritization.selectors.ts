import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/prioritization.reducers'; // adjust path as needed

export const selectPrioritizationState = createFeatureSelector<State>('prioritization');



export const selectPriorities = createSelector(
 selectPrioritizationState,
  (state) => state.priorities
);
