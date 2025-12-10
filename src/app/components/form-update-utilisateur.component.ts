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
import { Utilisateur } from '../models/utilisateurDTO';

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
    <h1 mat-dialog-title>Mettre à jour l'utilisateur</h1>
    <div mat-dialog-content>
      <form [formGroup]="form" class="form-container">
        <mat-form-field class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput formControlName="nom" required>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Prénom</mat-label>
          <input matInput formControlName="prenom" required>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Email</mat-label>
          <input matInput formControlName="mail" type="email" required>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Nom d'utilisateur</mat-label>
          <input matInput formControlName="username" required>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Mot de passe (laisser vide pour ne pas modifier)</mat-label>
          <input matInput formControlName="password" type="password">
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
    @Inject(MAT_DIALOG_DATA) public data: { utilisateur: Utilisateur },
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [data.utilisateur.id],
      nom: [data.utilisateur.nom, Validators.required],
      prenom: [data.utilisateur.prenom, Validators.required],
      mail: [data.utilisateur.mail, [Validators.required, Validators.email]],
      username: [data.utilisateur.username, Validators.required],
      password: [''],
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
