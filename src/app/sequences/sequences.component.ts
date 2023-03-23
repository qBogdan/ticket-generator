import { Component } from '@angular/core';
import { ModalServiceService } from '../modal-service.service';
import { SelectedFormService } from '../selected-form.service';

@Component({
  selector: 'app-sequences',
  templateUrl: './sequences.component.html',
  styleUrls: ['./sequences.component.css'],
})
export class SequencesComponent {
  showModal$ = this.modalServiceService.showModal$;
  selectedMenu$ = this.selectedFormService.selectedMenu$;
  constructor(
    private modalServiceService: ModalServiceService,
    private selectedFormService: SelectedFormService
  ) {}
}
