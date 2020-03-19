
import { AggregateRoot } from '../../core/domain/AggregateRoot';

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  profilePicture?: string;
  googleId?: number;
  facebookId?: number;
  username?: string;
}

export class User extends AggregateRoot<UserProps>{

  constructor(props: UserProps, id?: string){
    super(props, id);
  }

  get id() {
    return this._id;
  }

  get firstName (): string {
    return this.props.firstName;
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get email () {
    return this.props.email;
  }

  get password () {
    return this.props.password;
  }

  static create(props: UserProps): User{
    //--------condiciones y/o validaciones de un User para poder realizar la creacion
    const prop = {
      ...props,
      isEmailVerified: true
    }
    
    const user = new User({...prop});
      return user;
  }

}