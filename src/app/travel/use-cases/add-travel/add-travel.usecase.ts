import { UseCase } from '../../../core/domain/UseCase';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { AddTravelDTO } from './add-travel.dto';
import { Travel } from '../../domain/travel';
import { User } from '../../../user/domain/user';
import { tap, map } from 'rxjs/operators';
import { TravelState } from '../../utils/state.enum';
import { AfterTravelCreated } from '../../subscribers/afterTravelCreated';

@Injectable(
  { providedIn: 'root' }
)
export class AddTravelUseCase implements UseCase<AddTravelDTO, Observable<AddTravelDTO>>{

  constructor(
    private afterTravel: AfterTravelCreated){
  }
  
  execute(entry: AddTravelDTO) : Observable<AddTravelDTO>{
    // some business Logic
    let travel = null;
    
    if(entry){
      if (entry.destiny === 'DOP') {
        travel =
          Travel.create({
            ...entry,
            state: TravelState.CANCELED,
            date: new Date()
          });
          travel.addDomainEvent(travel);
          travel.dispatchObserver(this.afterTravel.onPipe());
      }
    }
    
    return travel.domainObserver;
  }

}