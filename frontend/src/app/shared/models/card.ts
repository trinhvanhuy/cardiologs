import { CARD_STATUS } from '@models/card-status';
export interface CardData {
  arrhythmias: string[];
  createdDate: Date;
  id: number;
  patientName: string;
  status: CARD_STATUS;
}
export interface CardDataFromBE {
  arrhythmias: string[];
  created_date: Date;
  id: number;
  patient_name: string;
  status: string;
}
