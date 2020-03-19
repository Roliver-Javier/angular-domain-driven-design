import { UnaryFunction } from 'rxjs';

export interface IHandle {
  onPipe(): UnaryFunction<any, any>;
}