import { UseCase } from '../../../core/domain/UseCase';
import { EditUserDTO } from './edit-user.dto';
import { EditUserErrors } from './edit-user.errors';
import { Result } from '../../../core/logic/Result';
import { User } from '../../domain/user';
import { Injectable } from '@angular/core';

type Response = 
EditUserErrors.AccountAlreadyExists |
EditUserErrors.FacebookTokenInvalid |
Result<any>;

@Injectable(
  { providedIn: 'root' }
)
export class EditUserUseCase implements UseCase<EditUserDTO, Promise<Response>>{
  constructor(){}
  
  async execute(): Promise<Response>{
    // some business logic
    console.log('%c','color:blue','hi!');
    const user = User.create(
      {
        email: 'roliverjavier@gmail.com',
        username: 'roliverj',
        firstName: 'roliver',
        lastName: 'Javier Rodriguez',
        password:'123123',
        facebookId: 1,
        googleId: 2,
        isEmailVerified: true,
        profilePicture: ''
      }
    );
     user.addDomainEvent(user);
     // return new Promise((resolve)=> resolve(user));
  }

}