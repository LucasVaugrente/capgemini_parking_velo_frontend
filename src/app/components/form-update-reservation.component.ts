import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-form-update-reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  template: `
    <h1 mat-dialog-title>Modifier la réservation</h1>

    <div mat-dialog-content>
      <form [formGroup]="form" class="form-container">

        <mat-form-field class="full-width">
          <mat-label>Utilisateur</mat-label>
          <input matInput [value]="data.utilisateurUsername" disabled>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Vélo</mat-label>
          <input matInput [value]="data.veloNom" disabled>
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
        Valider
      </button>
    </div>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      width: 400px;
    }
    .full-width {
      width: 100%;
    }
    .actions-container {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `]
})
export class FormUpdateReservationComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormUpdateReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      reservation: [data.reservation, [Validators.required, Validators.min(1)]]
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
