import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import * as mainPageActions from '@app/main-page/store/actions/main-page.actions';
import * as mainPage from '@mainPageStore/index';
import { MainPageComponent } from './main-page.component';
import { EffectsModule } from '@ngrx/effects';
import { CARD_STATUS } from '@app/shared/models/card-status';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  const mockCardData = {
    arrhythmias: ['Test1'],
    createdDate: new Date(),
    id: 1,
    patientName: 'Patient1',
    status: CARD_STATUS.DONE,
  };
  const mockCardData2 = {
    arrhythmias: ['Test2'],
    createdDate: new Date(),
    id: 1,
    patientName: 'Patient2',
    status: CARD_STATUS.DONE,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(mainPage.reducer),
        EffectsModule.forRoot([]),
      ],
      declarations: [ MainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change status', () => {
    spyOn(component['store'], 'dispatch');
    const updatedCard = {...mockCardData, status: CARD_STATUS.REJECTED};
    component.changeStatus(updatedCard);
    expect(component['store'].dispatch).toHaveBeenCalledTimes(1);
      expect(component['store'].dispatch).toHaveBeenCalledWith(
        mainPageActions.UpdateCard({
          data: updatedCard,
          id: updatedCard.id
        }),
      );
  });

  it('should search for a text', () => {
    component.originalListColumn = [{
      status: CARD_STATUS.DONE,
      cards: [mockCardData, mockCardData2]
    }]
    component.searchForCard(({target: {value: ''}} as any));
    let columnSearched = component.listColumn.find(x => x.status === CARD_STATUS.DONE);
    expect(columnSearched?.cards[0].patientName).toEqual(mockCardData.patientName);
    component.searchForCard(({target: {value: 'Patient2'}} as any));
    columnSearched = component.listColumn.find(x => x.status === CARD_STATUS.DONE);
    expect(columnSearched?.cards[0].patientName).toEqual('Patient2');
    component.searchForCard(({target: {value: 'Test1'}} as any));
    columnSearched = component.listColumn.find(x => x.status === CARD_STATUS.DONE);
    expect(columnSearched?.cards[0].patientName).toEqual('Patient1');
  });
});
