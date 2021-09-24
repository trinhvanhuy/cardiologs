import { CardState } from "@mainPage/store";
import { RouterReducerState } from "@ngrx/router-store";

import * as fromRouter from '@store/router/reducers';

export interface AppState {
  cards: CardState;
  router: RouterReducerState<fromRouter.RouterStoreState>;
}
