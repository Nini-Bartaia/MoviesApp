import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  // loader : BehaviorSubject<boolean>= new BehaviorSubject<boolean>(true)
  isLoading$ = new BehaviorSubject<boolean>(true);

  show(){
  this.isLoading$.next(true)

  }

  hide(){

    this.isLoading$.next(false)

    // setTimeout(() => {

    //   this.isLoading$.next(false)
    
      
      
    // }, 1000);
    

  }

  

}
