import { TravelState } from '../../utils/state.enum';

export interface AddTravelDTO {
  location: string;
  destiny: string;
  origin: string;
  state: TravelState;
  date: Date;
} 