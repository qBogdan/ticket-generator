import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModalServiceService } from './modal-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showModal$!: Observable<boolean>;

  constructor(private modalServiceService: ModalServiceService) {}

  ngOnInit() {
    this.showModal$ = this.modalServiceService.showModal$;
  }

  title = 'ticket-generator';
}
