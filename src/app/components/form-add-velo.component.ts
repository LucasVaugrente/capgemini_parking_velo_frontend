import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-formulaire-ajout',
  standalone: true,
  template: `
    <h1 mat-dialog-title>Ajouter un vélo</h1>
    <div mat-dialog-content>
      <form [formGroup]="form" class="form-container">
        <mat-form-field class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput formControlName="nom" placeholder="Nom du vélo" required>
          <mat-error *ngIf="form.get('nom')?.hasError('required')">
            Le nom est requis
          </mat-error>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Quantité</mat-label>
          <input matInput formControlName="quantite" type="number" placeholder="Quantité" required>
          <mat-error *ngIf="form.get('quantite')?.hasError('required')">
            La quantité est requise
          </mat-error>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Description"></textarea>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Latitude</mat-label>
          <input matInput formControlName="latitude" placeholder="Latitude" required>
          <mat-error *ngIf="form.get('latitude')?.hasError('required')">
            La latitude est requise
          </mat-error>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Longitude</mat-label>
          <input matInput formControlName="longitude" placeholder="Longitude" required>
          <mat-error *ngIf="form.get('longitude')?.hasError('required')">
            La longitude est requise
          </mat-error>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions class="actions-container">
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-button color="primary" [disabled]="form.invalid" (click)="onSubmit()">Ajouter</button>
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
      padding: 8px 16px 16px;
    }
  `],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    NgIf
  ],
})
export class FormulaireAjoutComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormulaireAjoutComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      quantite: [null, Validators.required],
      description: [''],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
