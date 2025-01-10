import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilteredDataService<T> {

  private arraySubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  array$: Observable<T[]> =this.arraySubject.asObservable();

  constructor() { }

  updateArray(newArray:T[]){
    this.arraySubject.next(newArray)
  }

  getArray(){
    return this.arraySubject.value
  }
}
