import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardData } from '@app/shared/models/card';
import { CARD_STATUS } from '@app/shared/models/card-status';

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CardColumnComponent } from './card-column.component';

describe('CardColumnComponent', () => {
  let component: CardColumnComponent;
  let fixture: ComponentFixture<CardColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change card status when move card', async () => {
    const mockCardData = {
      arrhythmias: ['Test1'],
      createdDate: new Date(),
      id: 1,
      patientName: 'Patient1',
      status: CARD_STATUS.DONE
    }
    const mockDragEvent = {
      item: {
        data: mockCardData
      },
      container: {
        id: CARD_STATUS.DONE
      }
    } as CdkDragDrop<CardData[]>;
    spyOn(component.changeCardStatus, 'emit');
    // WHEN
    component.changeStatus( mockDragEvent);
    // THEN
    await new Promise<void>(res => setTimeout(() => {
      expect(component.changeCardStatus.emit).toHaveBeenCalledTimes(1);
      expect(component.changeCardStatus.emit).toHaveBeenCalledWith(mockCardData);
      res();
    }, 10));
  });
});
