import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { filter, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements OnDestroy {
  private events = new BehaviorSubject<any>(null);

  constructor() {
    window.addEventListener('storage', this._listener);
  }

  private _listener(e: StorageEvent) {
    // console.log(e)
    // this.events.next({
    //     key: e.key,
    //     value: e.newValue
    // })
  }

  setItem(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.events.next({ key, value });
    } catch (e) {
      console.warn(/*'Local storage not available',*/ e);
    }
  }

  getItem(key: string) {
    try {
      const storredValue = localStorage.getItem(key)!;
      return storredValue ? JSON.parse(storredValue) : undefined;
    } catch (e) {
      console.warn('Local storage not available');
    }
    return undefined;
  }

  removeItem(key: string) {
    try {
      localStorage.removeItem(key);
      this.events.next({ key });
    } catch (e) {
      console.warn('Local storage not available');
    }
  }

  watchItem(key: string) {
    const currentValue = this.getItem(key);
    return this.events.pipe(
      filter((x: any) => {
        return x?.key == key;
      }),
      map((x) => x.value),
      startWith(currentValue)
    );
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this._listener, false);
  }
}
