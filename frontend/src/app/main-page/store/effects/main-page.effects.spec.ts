import { of, ReplaySubject, Subject } from 'rxjs';
import { MainPageEffects } from '@mainPageEffects/main-page.effects';
import { CardService } from '@shared/services/card.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { environment } from '@environments/environment';
import { provideMockActions } from '@ngrx/effects/testing';
import { API_URL } from '@tokens/api.token';
import * as mainPageActions from '@mainPageActions/main-page.actions';
import { CARD_STATUS } from '@app/shared/models/card-status';

describe('MainPageEffects', () => {
  let actions: Subject<any>;
  let effects: MainPageEffects;
  let cardService: CardService;
  const mockCardData = {
    arrhythmias: ['Test1'],
    createdDate: new Date(),
    id: 1,
    patientName: 'Patient1',
    status: CARD_STATUS.DONE,
  };
  const mockCardDataFromBE = {
    arrhythmias: ['Test1'],
    created_date: new Date(),
    id: 1,
    patient_name: 'Patient1',
    status: CARD_STATUS.DONE,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule, StoreModule.forRoot({})],
      providers: [
        CardService,
        MainPageEffects,
        { provide: API_URL, useValue: environment.apiUrl },
        provideMockActions(() => actions),
      ],
    });
    effects = TestBed.get(MainPageEffects);
    cardService = TestBed.get(CardService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
    expect(cardService).toBeTruthy();
  });
  it('should get All cards', done => {
    // GIVEN
    spyOn(cardService, 'getCards').and.returnValue(of([mockCardDataFromBE]));
    const action = mainPageActions.GetCards();
    const completion = mainPageActions.GetCardsSuccess({ data: [mockCardData] });
    // WHEN
    actions = new ReplaySubject(1);
    actions.next(action);
    // // THEN
    effects.getCards$.subscribe(value => {
      expect(cardService.getCards).toHaveBeenCalledTimes(1);
      expect(value).toEqual(completion);
      done();
    });
  });
});
