import { createReducer, on } from '@ngrx/store';
import * as PrioritizationActions from '../actions/pririoritization.actions'

export const prioritizationFeatureKey = 'prioritization';

export interface State {
  priorities: string[];
  error: any;
  loaded: boolean;
}

export const initialState: State = {
  priorities: [],
  error: null,
  loaded: false
};

export const reducer = createReducer(
  initialState,
  on(PrioritizationActions.loadPrioritiesSuccess, (state, { priorities }) =>{ 
   
    return {
    ...state,
    priorities,
    loaded: true
  }})
,
  on(PrioritizationActions.loadPrioritiesFailure, (state, { error }) => ({
    ...state,
    error,
    loaded: false
  }))
);
