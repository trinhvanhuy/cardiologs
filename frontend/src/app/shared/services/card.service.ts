import { Inject, Injectable } from '@angular/core';
import { CardDataFromBE } from '@models/card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@tokens/api.token';
import { RouterPaths } from '@shared/constants/router-path.const';

@Injectable({ providedIn: 'root' })
export class CardService {
  constructor(
    @Inject(API_URL) private readonly apiUrl: string,
    private readonly http: HttpClient
  ) {}

  getCards(): Observable<CardDataFromBE[]> {
    return this.http.get<CardDataFromBE[]>(
      `${this.apiUrl}${RouterPaths.CARDS_PATH}`
    );
  }
}
