import { CardData } from '@models/card';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as MainPageActions from '@app/main-page/store/actions/main-page.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface CardDataState extends EntityState<CardData> {}
const adapterCard = createEntityAdapter<CardData>({
  selectId: (card: CardData) => card.id,
});
export const cardsInitialState: CardDataState = adapterCard.getInitialState();

export interface CardState {
  cards: CardDataState;
}

export const initialState: CardState = {
  cards: cardsInitialState,
};

const cardReducer = createReducer(
  initialState,
  on(MainPageActions.GetCardsSuccess, (state: CardState, { data }) => {
    return {
      ...state,
      cards: adapterCard.addMany(data, state.cards),
    };
  }),

  on(MainPageActions.UpdateCard, (state: CardState, { data }) => {
    return {
      ...state,
      cards: adapterCard.upsertOne(data, state.cards)
    };
  })
);

export function reducer(state: CardState | undefined, action: Action) {
    return cardReducer(state, action);
}


export const selectCards = (state: CardState) => state.cards;
export const { selectAll: getCards } = adapterCard.getSelectors();