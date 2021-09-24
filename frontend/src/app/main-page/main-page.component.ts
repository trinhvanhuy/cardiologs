import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { GetCards, UpdateCard } from '@mainPageActions/main-page.actions';
import { CardData } from '@shared/models/card';
import { CARD_STATUS } from '@shared/models/card-status';
import { getAllCards } from '@mainPageStore/selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BaseComponent } from '@app/base.component';
import { Column } from '@app/shared/models/column';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent extends BaseComponent implements OnInit {
  onDestroy$ = new Subject();
  listColumn: Column[] = [{
    status: CARD_STATUS.PENDING,
    cards: []
  }, {
    status: CARD_STATUS.DONE,
    cards: []
  }, {
    status: CARD_STATUS.REJECTED,
    cards: []
  }];

  constructor(readonly store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(GetCards());
    this.store
      .pipe(select(getAllCards), takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.listColumn.forEach(col => {
          col.cards = data.filter(card => card.status === col.status);
        })
      });
  }
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  changeStatus(cardUpdated: CardData) {
    this.store.dispatch(UpdateCard({data: cardUpdated, id: cardUpdated.id}));
  }

  
}
