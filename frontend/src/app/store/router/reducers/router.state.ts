import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { Params, Data } from '@angular/router';
import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';
import { AppState } from '@store/app.state';
export interface RouterStoreState {
  url: string;
  params: Params;
  queryParams: Params;
  data?: Data;
}
export interface State {
  router: RouterReducerState<RouterStoreState>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

export const getRouterReducerState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStoreState>
>('router');

export const getRouterState = createSelector(
  getRouterReducerState,
  routerReducerState => routerReducerState && routerReducerState.state
);
