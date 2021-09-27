import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CardData } from '@shared/models/card';
import { CARD_STATUS } from '@shared/models/card-status';
import { BaseComponent } from '@app/base.component';
import { Column } from '@app/shared/models/column';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card-column',
  templateUrl: './card-column.component.html',
  styleUrls: ['./card-column.component.scss'],
})
export class CardColumnComponent extends BaseComponent {
  @Input() column: Column = {
    status: CARD_STATUS.NONE,
    cards: [],
  };

  @Input() status: CARD_STATUS = CARD_STATUS.NONE;

  @Output() public changeCardStatus = new EventEmitter<CardData>();
  listStatus = Object.values(CARD_STATUS);
  constructor() {
    super();
  }
  changeStatus($event: CdkDragDrop<CardData[]>) {
    const item: CardData = { ...$event.item.data };
    item.status = $event.container.id as CARD_STATUS;
    this.changeCardStatus.emit(item);
  }
}
