import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddTravelUseCase } from '../use-cases/add-travel/add-travel.usecase';
import { AddTravelDTO } from '../use-cases/add-travel/add-travel.dto';
import { TravelState } from '../utils/state.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  constructor(private addTravelUseCase: AddTravelUseCase) { }

  
  ngOnInit() {
    const travelDto =  
    {
      location: '123123,1232344',
      destiny: 'DOP',
      origin: 'USA',
      state: TravelState.WAITING,
      date: new Date()
    } as AddTravelDTO;

    this.subscription.add(
      this.addTravelUseCase.execute(travelDto).subscribe()
    );
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}