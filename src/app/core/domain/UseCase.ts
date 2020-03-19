import { Observable } from 'rxjs';

export interface UseCase <EntryObject, ExitObject>{
  execute (entry?: EntryObject) : Observable<ExitObject> | Promise<ExitObject> | ExitObject;
}