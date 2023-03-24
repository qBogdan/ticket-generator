import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SequencesService {
  sequences$ = new BehaviorSubject([]);
  constructor() {}
}
