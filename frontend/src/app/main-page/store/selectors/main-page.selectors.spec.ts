import { TestBed } from '@angular/core/testing';
import { CARD_STATUS } from '@app/shared/models/card-status';
import { Store, StoreModule } from '@ngrx/store';
import * as fromCard from '@mainPageReducers/card.reducers';
import * as fromSelectors from '@mainPageSelectors/main-page.selectors';

describe('Main page Selectors', () => {
  const mockCardData = {
    arrhythmias: ['Test1'],
    createdDate: new Date(),
    id: 1,
    patientName: 'Patient1',
    status: CARD_STATUS.DONE,
  };
  const cardInitialSate = {
    ids: [1],
    entities: {
      1: mockCardData,
    },
  };
  let store: Store<fromCard.CardState>;
  const initialState: fromCard.CardState = {
    cards: cardInitialSate,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('app', (s: any) => s, { initialState }),
      ],
    });
    store = TestBed.get(Store);
  });

  it('should return cards', () => {
    store.select(fromSelectors.getAllCards).subscribe((value) => {
      expect(value).toEqual([mockCardData]);
    });
  });
});
