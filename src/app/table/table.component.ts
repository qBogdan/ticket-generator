import { Component, Input, OnInit } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { SequencesService } from '../sequences.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  sequences$ = this.sequencesService.sequences$;
  @Input() table!: { v: number; s: string }[];
  constructor(private sequencesService: SequencesService) {}

  ngOnInit() {}
}
