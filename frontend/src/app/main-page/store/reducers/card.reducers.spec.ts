import { CARD_STATUS } from '@app/shared/models/card-status';
import * as fromCardReducer from '@mainPageReducers/card.reducers';
import * as fromMainPageActions from '@mainPageActions/main-page.actions';

describe('Load card reducer reducer', () => {
  const mockCardData = {
    arrhythmias: ['Test1'],
    createdDate: new Date(),
    id: 1,
    patientName: 'Patient1',
    status: CARD_STATUS.DONE,
  };
  it('should return default state', () => {
    const { initialState } = fromCardReducer;
    const action = {} as any;
    const state = fromCardReducer.reducer(undefined, action);
    expect(state.cards).toBe(initialState.cards);
  });
  it('should get all cards', () => {
    const { initialState } = fromCardReducer;
    const action = fromMainPageActions.GetCardsSuccess({
      data: [mockCardData],
    });
    const state = fromCardReducer.reducer(initialState, action);
    expect(state.cards).toEqual({ ids: [1], entities: { 1: mockCardData } });
  });

  it('should update card', () => {
    const { initialState } = fromCardReducer;
    const updatedData = {...mockCardData, patientName: 'Patient2'};
    const action = fromMainPageActions.UpdateCard({
      data: updatedData,
      id: 1
    });
    const state = fromCardReducer.reducer(initialState, action);
    expect(state.cards).toEqual({ ids: [1], entities: { 1: updatedData } });
  });
});
