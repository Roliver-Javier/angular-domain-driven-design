import { UseCase } from '../../../core/domain/UseCase';
import { EditUserDTO } from './edit-user.dto';
import { EditUserErrors } from './edit-user.errors';
import { Result } from '../../../core/logic/Result';
import { User } from '../../domain/user';
import { Injectable } from '@angular/core';

interface CreateUserDTO {

}

@Injectable({ providedIn: 'root' })


export class EditUserUseCase implements UseCase<EditUserDTO, Promise<any>>{
  constructor(){}
  
  async execute(): Promise<any>{
    // Business Logic here!!!
  }

}

export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<any>>{
  constructor(){}
  
  async execute(): Promise<any>{
    // Business Logic here!!!
  }

}

