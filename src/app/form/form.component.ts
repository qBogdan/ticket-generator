import { sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SequencesService } from '../sequences.service';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  UntypedFormGroup,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ModalServiceService } from '../modal-service.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  sequenceForm!: FormGroup;
  formData!: FormGroup;
  localStorage = this.localStorageService;

  sequences$ = this.sequencesService.sequences$;
  showModal$ = this.modalServiceService.showModal$;

  constructor(
    private sequencesService: SequencesService,
    private modalServiceService: ModalServiceService,
    private localStorageService: LocalStorageService
  ) {}

  get sequences() {
    return this.sequenceForm.get('sequences') as FormArray;
  }

  ngOnInit() {
    this.sequenceForm = new FormGroup({
      sequences: new FormArray([]),
    });

    this.sequenceForm.patchValue(this.localStorage.getItem('sequences'));

    // this.sequenceForm.valueChanges
    //   .pipe(
    //     tap((x) => this.localStorage.setItem('sequences', x)),
    //     map((x) => x.sequences),
    //     map((x) => {
    //       return x.map((s: any) => {
    //         let arr = [];
    //         for (let n in s) {
    //           arr.push(s[n]);
    //         }
    //         return arr;
    //       });
    //     })
    //   )
    //   .subscribe((x) => {
    //     this.sequences$.next(x);
    //     console.log(this.localStorage.getItem('sequences'));
    //   });
  }

  addRow() {
    const sequenceRow = new FormGroup({});
    for (let i = 0; i < 12; i++) {
      sequenceRow.addControl(
        i.toString(),
        new FormControl('', Validators.required)
      );
    }
    this.sequences.push(sequenceRow);
  }

  save(e: any) {
    e.preventDefault();
    this.localStorage.setItem('sequences', this.sequenceForm);
  }
}
