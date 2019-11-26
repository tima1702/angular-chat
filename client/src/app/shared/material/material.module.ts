import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [],
  providers: []
})
export class MaterialModule { }
