import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  showModal$ = new BehaviorSubject(false);
  constructor() {}
}
