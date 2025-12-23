import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import {VeloUpdateDTO} from "../models/veloDTO";

@Component({
  selector: 'app-formulaire-mise-a-jour',
  imports: [
    MatInput,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatFormField,
    MatLabel
  ],
  standalone: true,
  template: `
    <h1 mat-dialog-title>Mettre à jour le vélo</h1>
    <div mat-dialog-content>
      <form [formGroup]="form" class="form-container">
        <mat-form-field class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput formControlName="nom" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Quantité</mat-label>
          <input matInput formControlName="quantite" type="number" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description"></textarea>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Latitude</mat-label>
          <input matInput formControlName="latitude" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Longitude</mat-label>
          <input matInput formControlName="longitude" required>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions class="actions-container">
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-button color="primary" [disabled]="form.invalid" (click)="onSubmit()">Mettre à jour</button>
    </div>

  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      width: 500px;
    }
    .full-width {
      width: 100%;
    }
    .actions-container {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 8px 16px 16px;
    }
  `]
})

export class FormulaireMiseAJourComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormulaireMiseAJourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { velo: VeloUpdateDTO },
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nom: [this.data.velo.nom, Validators.required],
      quantite: [this.data.velo.quantite, Validators.required],
      description: [this.data.velo.description],
      latitude: [this.data.velo.latitude, Validators.required],
      longitude: [this.data.velo.longitude, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const result = {
        ...this.form.value,
        coordonneesId: this.data.velo.coordonneesId,
      };
      this.dialogRef.close(result);
    }
  }
}
