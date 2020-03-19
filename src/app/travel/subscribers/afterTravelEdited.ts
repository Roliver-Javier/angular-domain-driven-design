import { IHandle } from '../../core/domain/events/IHandle';
import { Injectable } from '@angular/core';
import { UnaryFunction,pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
@Injectable(
  { providedIn: 'root' }
)
export class AfterTravelEdited implements IHandle{
   onPipe(): UnaryFunction<any, any> {
     return (
      pipe(
        tap(() => console.log('hey There !!! travel edited' )),
        tap(() => console.log('hey There!!! travel edited')),
        tap(() => console.log('hey There!!! travel edited')),
        tap(() => console.log('hey There!!! travel edited')),
        map((val) => val)
      )
     )
   }
}