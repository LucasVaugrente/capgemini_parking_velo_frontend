import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-add-reservation',
  standalone: true,
  template: `
    <h1 mat-dialog-title>Ajouter une réservation</h1>

    <div mat-dialog-content>
      <form [formGroup]="form" class="form-container">

        <mat-form-field class="full-width">
          <mat-label>ID Utilisateur</mat-label>
          <input matInput type="number" formControlName="utilisateurId">
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>ID Vélo</mat-label>
          <input matInput type="number" formControlName="veloId">
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Quantité</mat-label>
          <input matInput type="number" formControlName="reservation">
        </mat-form-field>

      </form>
    </div>

    <div mat-dialog-actions class="actions-container">
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-button color="primary" [disabled]="form.invalid" (click)="onSubmit()">
        Ajouter
      </button>
    </div>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .full-width {
      width: 100%;
    }
    .actions-container {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ]
})
export class FormAddReservationComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormAddReservationComponent>
  ) {
    this.form = this.fb.group({
      utilisateurId: ['', Validators.required],
      veloId: ['', Validators.required],
      reservation: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
