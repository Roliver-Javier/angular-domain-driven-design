import { Entity } from './Entity';
import { DomainEvents } from './events/DomainEvents';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActionEvents } from './events/ActionEvents.enum';
import { pipe, UnaryFunction } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: any[] = [];
  private _domainObserver: Observable<AggregateRoot<T>>;
  private _domainBS: BehaviorSubject<AggregateRoot<T>>;

  get id() {
    return this._id;
  }

  get domainEvents(): any[] {
    return this._domainEvents;
  }

  get domainObserver(): Observable<AggregateRoot<T>>{
    return this._domainObserver;
  }

  set domainObserver(domainEvent: Observable<AggregateRoot<T>>){
    this._domainObserver = domainEvent;
  }

  get domainBS(): BehaviorSubject<AggregateRoot<T>>{
    return this._domainBS;
  }

  set domainBS(domainEvent: BehaviorSubject<AggregateRoot<T>>){
    this._domainBS = domainEvent;
  }

  protected addDomainEvent (domainEvent: any){
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForBS(this);
    this.logDomainEventAdded(domainEvent);
  } 

  private logDomainEventAdded (domainEvent: any){
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.log('[Domain Event Created]: ', thisClass.constructor.name);
    
  }

  protected dispatchObserver(domainPipe: UnaryFunction<any, any>){
    DomainEvents.dispatch(this, ActionEvents.Observable,domainPipe);
  }

  protected dispatchBS(){
    DomainEvents.dispatch(this, ActionEvents.BehaviorSubject);
  }
}