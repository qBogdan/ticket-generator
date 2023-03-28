import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SequencesService {
  sequences$ = new BehaviorSubject([]);

  constructor(private localStorageService: LocalStorageService) {}
}
