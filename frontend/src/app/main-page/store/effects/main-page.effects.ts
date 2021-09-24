import { Injectable } from '@angular/core';
import { CardService } from '@shared/services/card.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CardData, CardDataFromBE } from '@models/card';
import { Observable, of } from 'rxjs';
import * as mainPageActions from '@mainPageActions/main-page.actions';
import { Action } from '@ngrx/store';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class MainPageEffects {
  constructor(
    private readonly actions$: Actions,
    readonly cardService: CardService
  ) {}

  getCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mainPageActions.GetCards),
      switchMap(() =>
        this.cardService
          .getCards()
          .pipe(
            switchMap((data: CardDataFromBE[]) => {
              const cardsData: CardData[] = data.map(dataFromBE => {
                return {
                  arrhythmias: dataFromBE.arrhythmias,
                  createdDate: dataFromBE.created_date,
                  id: dataFromBE.id,
                  patientName: dataFromBE.patient_name,
                  status: dataFromBE.status
                } as CardData;
              });
              return of(mainPageActions.GetCardsSuccess({ data: cardsData }));
            })
          )
      ),
      catchError((error) => of(mainPageActions.GetCardsFailed({ error })))
    )
  );
}
