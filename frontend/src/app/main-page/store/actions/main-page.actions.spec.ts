import { CARD_STATUS } from '@app/shared/models/card-status';
import * as mainPageActions from '@mainPageActions/main-page.actions';

describe('Main Page Actions', () => {
  const mockCardData = {
    arrhythmias: ['Test1'],
    createdDate: new Date(),
    id: 1,
    patientName: 'Patient1',
    status: CARD_STATUS.DONE,
  };
  it('should Get ALl Card', () => {
    const action = mainPageActions.GetCards();
    expect({ ...action }).toEqual({ type: mainPageActions.GET_CARDS });
  });
  it('should Get ALl Card Success', () => {
    const action = mainPageActions.GetCardsSuccess({ data: [mockCardData] });
    expect({ ...action }).toEqual({
      type: mainPageActions.GET_CARDS_SUCCESS,
      data: [mockCardData],
    });
  });
  it('should Get ALl Card Success', () => {
    const error = new Error();
    const action = mainPageActions.GetCardsFailed({ error  });
    expect({ ...action }).toEqual({
      type: mainPageActions.GET_CARDS_FAILED,
      error,
    });
  });
  it('should Update Card Success', () => {
    const id  = 1;
    const action = mainPageActions.UpdateCard({ data: mockCardData, id  });
    expect({ ...action }).toEqual({
      type: mainPageActions.UPDATE_CARD,
      data: mockCardData,
      id
    });
  });
});
