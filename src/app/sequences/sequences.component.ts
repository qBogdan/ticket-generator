import { Component, OnInit } from '@angular/core';
import { ModalServiceService } from '../modal-service.service';
import { SelectedFormService } from '../selected-form.service';
import { LocalStorageService } from '../local-storage.service';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-sequences',
  templateUrl: './sequences.component.html',
  styleUrls: ['./sequences.component.css'],
})
export class SequencesComponent implements OnInit {
  showModal$ = this.modalServiceService.showModal$;
  selectedMenu$ = this.selectedFormService.selectedMenu$;
  sequences$!: Observable<any>;

  constructor(
    private modalServiceService: ModalServiceService,
    private selectedFormService: SelectedFormService,
    private localStorageService: LocalStorageService // private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.sequences$ = this.localStorageService.watchItem('formData').pipe(
      map((x) => {
        return x.sequences.map((s: any) => {
          let arr = [];
          for (let n in s) {
            arr.push(s[n]);
          }
          return arr;
        });
      })
    );
  }
}
