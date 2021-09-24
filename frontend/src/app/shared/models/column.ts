import { CARD_STATUS } from '@models/card-status';
import { CardData } from './card';
export interface Column {
  status: CARD_STATUS;
  cards: CardData[];
}