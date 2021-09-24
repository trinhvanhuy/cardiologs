import { createAction, props } from '@ngrx/store';
import { CardData } from '@models/card';

export const GET_CARDS = '[MAIN PAGE] GET_CARDS';
export const GET_CARDS_SUCCESS = '[MAIN PAGE] GET_CARDS_SUCCESS';
export const GET_CARDS_FAILED = '[MAIN PAGE] GET_CARDS_FAILED';

export const UPDATE_CARD = '[MAIN PAGE] UPDATE_CARD';

export const GetCards = createAction(GET_CARDS);

export const GetCardsSuccess = createAction(
  GET_CARDS_SUCCESS,
  props<{ data: CardData[] }>()
);

export const GetCardsFailed = createAction(
  GET_CARDS_FAILED,
  props<{ error: Error }>()
);

export const UpdateCard = createAction(
  UPDATE_CARD,
  props<{ data: CardData; id: number }>()
);
