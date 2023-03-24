import { Component } from '@angular/core';
import { ModalServiceService } from '../modal-service.service';
import { SelectedFormService } from '../selected-form.service';
import { SequencesService } from '../sequences.service';

@Component({
  selector: 'app-sequences',
  templateUrl: './sequences.component.html',
  styleUrls: ['./sequences.component.css'],
})
export class SequencesComponent {
  showModal$ = this.modalServiceService.showModal$;
  selectedMenu$ = this.selectedFormService.selectedMenu$;
  sequences$ = this.sequencesService.sequences$;

  constructor(
    private modalServiceService: ModalServiceService,
    private selectedFormService: SelectedFormService,
    private sequencesService: SequencesService
  ) {}
}
