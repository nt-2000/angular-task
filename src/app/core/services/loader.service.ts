import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  // Create a BehaviorSubject to manage the loading state
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  // Observable to expose the loading state to other components
  loading$ = this.isLoadingSubject.asObservable();

  constructor() {}

  // Method to show the loader
  show() {
    this.isLoadingSubject.next(true); // Emit true to show the loader
    console.log('Loader is shown');
  }

  // Method to hide the loader
  hide() {
    this.isLoadingSubject.next(false); // Emit false to hide the loader
    console.log('Loader is hidden');
  }
}
