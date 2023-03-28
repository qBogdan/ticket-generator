import { sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SequencesService } from '../sequences.service';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  UntypedFormGroup,
  FormBuilder,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ModalServiceService } from '../modal-service.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  sequences$ = this.sequencesService.sequences$;
  showModal$ = this.modalServiceService.showModal$;

  sequenceForm!: FormGroup;
  sequences!: FormArray;
  formData!: any;

  constructor(
    private sequencesService: SequencesService,
    private modalServiceService: ModalServiceService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.sequenceForm = this.fb.group({
      sequences: new FormArray([]),
    });

    this.sequences = this.sequenceForm.get('sequences') as FormArray;

    const savedData = this.localStorageService.getItem('formData');
    if (savedData) {
      this.formData = savedData;
      this.patchForm();
    }

    this.sequenceForm.valueChanges
      .pipe(
        startWith(this.sequenceForm.value),
        // map((x) => x.sequences),
        map((x) => {
          return x.sequences.map((s: any) => {
            let arr = [];
            for (let n in s) {
              arr.push(s[n]);
            }
            return arr;
          });
        })
      )
      .subscribe((x) => {
        this.sequences$.next(x);
      });
  }

  patchForm() {
    // Loop through the form data and patch the form
    for (let sequence of this.formData.sequences) {
      const sequenceRow = new FormGroup({});
      for (let i = 0; i < 12; i++) {
        sequenceRow.addControl(
          i.toString(),
          new FormControl(sequence[i], Validators.required)
        );
      }
      this.sequences.push(sequenceRow);
    }
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

    this.localStorageService.setItem('formData', this.sequenceForm.value);
  }
}
