import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  Observable,
  of,
  Subject,
  map,
  tap,
  merge,
} from 'rxjs';
import { ModalServiceService } from '../modal-service.service';
import { SelectedFormService } from '../selected-form.service';
import { SequencesService } from '../sequences.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
})
export class WindowComponent implements OnInit {
  showModal$ = this.modalServiceService.showModal$;
  selectedMenu$ = this.selectedFormService.selectedMenu$;

  sequences$!: Observable<any>;

  constructor(
    private modalServiceService: ModalServiceService,
    private selectedFormService: SelectedFormService,
    private sequencesService: SequencesService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    // console.log(this.tableCombinations());
    // console.log(this.firstSequences());
    // console.log(this.lastSequence());

    this.sequences$ = this.localStorageService.watchItem('formData').pipe(
      map((x) => {
        return x.sequences.map((s: any) => {
          let arr = [];
          for (let n in s) {
            arr.push(s[n]);
          }
          return arr;
        });
      }),
      tap((x) => console.log(x))
    );
  }

  sequences = [
    [1, 2, 4, 7, 8, 10, 12, 15, 17, 18, 21, 22],
    [4, 5, 7, 8, 10, 11, 15, 16, 18, 20, 22, 24],
    [1, 3, 4, 5, 9, 11, 12, 13, 16, 17, 19, 21],
    [2, 3, 6, 8, 9, 12, 15, 16, 18, 19, 20, 21],
    [1, 6, 10, 11, 12, 15, 17, 18, 19, 20, 22, 24],
    [5, 6, 7, 9, 11, 12, 13, 15, 17, 18, 19, 20],
  ];

  getRowsAndCols() {
    return this.sequences.map((s: number[]) => {
      let rows = [];
      let cols = [];

      for (let r = 0; r < 5; r++) {
        let row: number[] = [];
        for (let i = 1; i < 25; i++) {
          if (i > r * 5 && i < r * 5 + 6 && s.includes(i)) row.push(i);
        }
        rows.push(row);
      }

      for (let c = 1; c < 6; c++) {
        let col: number[] = [];
        for (let j = 1; j < 25; j++) {
          if ((j - 1) % 5 === c - 1 && s.includes(j)) col.push(j);
        }
        cols.push(col);
      }

      return {
        rows: this.mergePairs(rows.map((r) => this.getPairs(r))),
        cols: this.mergePairs(cols.map((c) => this.getPairs(c))),
      };
    });
  }

  getPairs(numbers: number[]) {
    let pairs: number[][] = [];

    for (let i = 0; i < numbers.length - 1; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        pairs.push([numbers[i], numbers[j]]);
      }
    }
    return pairs;
  }

  mergePairs(pairs: any) {
    let merged: number[][] = [];

    pairs.forEach((pair: number[][]) => {
      pair.forEach((p) => {
        merged.push(p);
      });
    });

    return merged;
  }

  lastSequence() {
    let sequences = this.getRowsAndCols();
    let lastSequence = sequences.pop();
    let pairsSorted: {}[] = [];
    let pairs = [];

    lastSequence?.cols.forEach((p) =>
      pairsSorted.push({ type: 'col', pair: p })
    );
    lastSequence?.rows.forEach((r) =>
      pairsSorted.push({ type: 'row', pair: r })
    );

    for (let i = 0; i < pairsSorted.length - 1; i++) {
      for (let j = i + 1; j < pairsSorted.length; j++) {
        pairs.push([pairsSorted[i], pairsSorted[j]]);
      }
    }

    return pairs;
  }

  firstSequences() {
    let sequences = this.getRowsAndCols();
    sequences.pop();

    let firstSequences: {}[] = [];

    sequences.forEach((s) => {
      s.cols.forEach((x) => firstSequences.push({ type: 'col', pair: x }));
      s.rows.forEach((x) => firstSequences.push({ type: 'row', pair: x }));
    });

    let firstSequencesCombinations: {}[][] = [];

    for (let i = 0; i < firstSequences.length - 1; i++) {
      for (let j = i + 1; j < firstSequences.length; j++) {
        firstSequencesCombinations.push([firstSequences[i], firstSequences[j]]);
      }
    }

    return firstSequencesCombinations;
  }

  oddEvenArray(array: number[]) {
    let even = 0;
    let odd = 0;

    array.forEach((n: number) => {
      if (n % 2 === 0) even++;
      else odd++;
    });

    return even === odd;
  }

  tableCombinations() {
    let tables: {}[][] = [];
    let lastSequence = this.lastSequence();
    let firstSequences = this.firstSequences();

    // console.log(firstSequences);

    lastSequence.forEach((s) => {
      firstSequences.forEach((f) => {
        tables.push([...s, ...f]);
      });
    });

    return tables
      .map((t) => {
        let numbers: number[] = [];
        t.forEach((p: any) => {
          numbers.push(p.pair);
        });

        if (this.oddEvenArray(numbers.flat())) {
          return this.prepareTable(t);
        } else return null;
      })
      .filter((o) => o !== null);
  }

  prepareTable(rawTable: {}[]) {
    let tableData: {}[] = [];

    for (let i = 1; i < 25; i++) {
      tableData.push({ v: i, s: this.determineType(rawTable, i) });
    }

    return tableData;
  }

  determineType(rawTable: {}[], n: number) {
    let res = '';
    rawTable.forEach((p: any) => {
      if (p.pair.includes(n)) {
        if (p.type === 'col') res = 'c';
        if (p.type === 'row') res = 'r';
      }
    });

    return res;
  }

  @Input() mockTable = [
    { v: 1, s: 'r' },
    { v: 2, s: '' },
    { v: 3, s: '' },
    { v: 4, s: 'r' },
    { v: 5, s: '' },
    { v: 6, s: 'c' },
    { v: 7, s: '' },
    { v: 8, s: '' },
    { v: 9, s: '' },
    { v: 10, s: '' },
    { v: 11, s: 'c' },
    { v: 12, s: 'r' },
    { v: 13, s: '' },
    { v: 14, s: '' },
    { v: 15, s: 'r' },
    { v: 16, s: '' },
    { v: 17, s: '' },
    { v: 18, s: '' },
    { v: 19, s: 'c' },
    { v: 20, s: '' },
    { v: 21, s: '' },
    { v: 22, s: '' },
    { v: 23, s: '' },
    { v: 24, s: 'c' },
  ];
}
