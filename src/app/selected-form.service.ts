import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedFormService {
  selectedMenu$ = new BehaviorSubject<string>('');
  constructor() {}
}
