import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WindowComponent } from './window/window.component';
import { SequencesComponent } from './sequences/sequences.component';
import { OptionsComponent } from './options/options.component';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    SequencesComponent,
    OptionsComponent,
    TableComponent,
    FormComponent,
    ModalComponent,
  ],
  imports: [CommonModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
