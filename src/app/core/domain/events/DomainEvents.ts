import { AggregateRoot } from '../AggregateRoot';
import { BehaviorSubject, Observable, pipe, UnaryFunction } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ActionEvents } from './ActionEvents.enum';

interface GlobalBS {
  [n: string]: {
    behaviourSubject: BehaviorSubject<any>,
    observable: Observable<any>,
    className: string
  }
}

type OptionType = ActionEvents.Observable | ActionEvents.BehaviorSubject;


export class DomainEvents<T> {
  private static handlersMap = {};
  private static markedAggregates: AggregateRoot<any>[] = [];
  private static globalBS: GlobalBS = {};

  public static markAggregateForBS<T>
    (aggregate: AggregateRoot<T>): void {
    if (aggregate instanceof AggregateRoot) {
      const aggregateFound = !!this.findAggregateByID(aggregate.id);
      if (!aggregateFound) {
        aggregate.domainBS = 
        new BehaviorSubject<AggregateRoot<T>>(aggregate);

        aggregate.domainObserver = aggregate.domainBS.asObservable();

        this.markedAggregates.push(aggregate);

        this.globalBS = {
          ...this.globalBS,
          [aggregate.id]: {
            behaviorSubject: aggregate.domainBS,
            observable: aggregate.domainObserver,
            className: aggregate.constructor.name 
          }
        } as GlobalBS;
      }
    }
  }

  public static dispatch<T>
    (aggregate: AggregateRoot<T>, 
    option: OptionType, 
    pipeCallback?: UnaryFunction<any, any>) {
    switch (option) {
      case ActionEvents.BehaviorSubject: {
        aggregate.domainBS = this.globalBS[aggregate.id][ActionEvents.BehaviorSubject];
        aggregate.domainBS.next(aggregate);
        return aggregate.domainBS;
      }
      case ActionEvents.Observable: {
        if (pipeCallback) {
          aggregate.domainObserver =
            this.globalBS[aggregate.id][ActionEvents.Observable].pipe(
              pipeCallback
            );
          return aggregate.domainObserver;
        }
      }
    }
  }

  private static findAggregateByClassName(className: string){
    return Object.values(this.globalBS).filter(aggeg => aggeg.className === className)[0]
  }

  private static findAggregateByID(id: string): AggregateRoot<any> {
    let found: AggregateRoot<any> = null;
    for (let aggregate of this.markedAggregates) {
      if (aggregate.id === id) {
        found = aggregate;
      }
    }
    return found;
  }

};