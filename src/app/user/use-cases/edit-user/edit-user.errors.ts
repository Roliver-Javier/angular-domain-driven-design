import { UseCaseError } from '../../../core/domain/UseCaseError';
import { Result } from '../../../core/logic/Result';
export namespace EditUserErrors {

  export class AccountAlreadyExists extends Result<UseCaseError>{
    constructor(email: string){
      super(false, {
        message: `The user with this email ${email} already exists`
      } as UseCaseError)
    }
  }

  export class FacebookTokenInvalid extends Result<UseCaseError>{
    constructor(email: string){
      super(false, {
        message: `The facebook token used to edit an acount is not valid`
      } as UseCaseError)
    }
  }
}