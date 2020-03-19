import { AggregateRoot } from '../../core/domain/AggregateRoot';

export interface TravelProps {
   location: string;
   destiny: string;
   origin: string;
   date: Date;
}

export class Travel extends AggregateRoot<TravelProps>{
  constructor( props: TravelProps, id?: string){
    super(props, id);
  }
  get id() { 
    return this._id;
  }
  get location (){
    return this.props.location;
  }

  get destiny () {
    return this.props.destiny;
  }

  get origin () {
    return this.props.origin;
  }

  static create(props: TravelProps): Travel{ 
    //..... some validations and logic here
    const travel = new Travel({ ...props, date: new Date });
    return travel;
  }

}