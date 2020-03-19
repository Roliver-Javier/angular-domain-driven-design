export class Result<T>{
  public isSuccess: boolean;
  public isFailure: boolean
  public error: T | string;
  private _value: T;

  constructor(isSuccess: boolean, error?: T | string, value?: T){
    if(isSuccess && error){
      throw new Error("InvalidOperation: A result cannot be successful");
    }
    if(!isSuccess && !error){
      throw new Error("InvalidOperation: A failing result needs to contain an error message");
    }
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);

  }

  public errorValue (): T {
    return this.error as T;
  }

  public static ok<U> (value?: U) : Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U> (error: any): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine (results: Result<any>[]) : Result<any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }

  
}