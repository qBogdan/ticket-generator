import { Component, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Observable, of, Subject, tap } from 'rxjs';
import { ModalServiceService } from '../modal-service.service';
import { SelectedFormService } from '../selected-form.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
})
export class WindowComponent {
  showModal$ = this.modalServiceService.showModal$;
  selectedMenu$ = this.selectedFormService.selectedMenu$;
  constructor(
    private modalServiceService: ModalServiceService,
    private selectedFormService: SelectedFormService
  ) {}
}
