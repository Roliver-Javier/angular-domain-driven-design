
import { IHandle } from '../../core/domain/events/IHandle';
import { Injectable } from '@angular/core';
import { UnaryFunction,pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
@Injectable(
  { providedIn: 'root' }
)
export class AfterTravelCreated implements IHandle{
  style = `
    font-weight:bold;
    font-size: 30px; 
    color: green; 
    text-shadow: 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black;
  `;
   onPipe(): UnaryFunction<any, any> {
     return (
      pipe(
        tap(() => console.log('%c El viaje se ha creado!',this.style)),
        map((val) => val)
      )
     )
   }
}