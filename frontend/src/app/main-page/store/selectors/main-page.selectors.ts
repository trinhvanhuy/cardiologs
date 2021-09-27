import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as reducers from '@mainPageReducers/card.reducers';

export const getCardState = createFeatureSelector<reducers.CardState>('app');
export const getCardsListState = createSelector(getCardState, reducers.selectCards);

export const getAllCards = createSelector(getCardsListState, reducers.getCards);
