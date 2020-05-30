import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InstantDashboardService {
  constructor() {}

  getDataFromLocalStorage(localStorageKey: string) {
    localStorage.getItem(localStorageKey);
  }

  setDataTolocalStorage(localStorageKey: string, data): void {
    localStorage.setItem(localStorageKey, data);
  }
}
