import { Component, OnInit } from '@angular/core';
import { ModalServiceService } from '../modal-service.service';
import { SelectedFormService } from '../selected-form.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  showModal$ = this.modalServiceService.showModal$;
  selectedMenu$ = this.selectedFormService.selectedMenu$;
  constructor(
    private modalServiceService: ModalServiceService,
    private selectedFormService: SelectedFormService
  ) {}
}
