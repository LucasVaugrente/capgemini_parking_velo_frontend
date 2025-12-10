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
    <h1 mat-dialog-title>Ajouter un utilisateur</h1>
    <div mat-dialog-content>
      <form [formGroup]="form" class="form-container">
        <mat-form-field class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput formControlName="nom" placeholder="Entrer votre nom" required>
          <mat-error *ngIf="form.get('nom')?.hasError('required')">
            Le nom est requis
          </mat-error>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Prénom</mat-label>
          <input matInput formControlName="prenom" placeholder="Entrer votre prénom" required>
          <mat-error *ngIf="form.get('prenom')?.hasError('required')">
            Le prénom est requis
          </mat-error>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Email</mat-label>
          <input matInput formControlName="mail" type="email" placeholder="Entrer votre email" required>
          <mat-error *ngIf="form.get('mail')?.hasError('required')">
            L'email est requis
          </mat-error>
          <mat-error *ngIf="form.get('mail')?.hasError('email')">
            L'email doit être valide
          </mat-error>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Mot de passe</mat-label>
          <input matInput formControlName="password" type="password" placeholder="Entrer un mot de passe" required>
          <mat-error *ngIf="form.get('password')?.hasError('required')">
            Le mot de passe est requis
          </mat-error>
          <mat-error *ngIf="form.get('password')?.hasError('minlength')">
            Le mot de passe doit faire au moins 6 caractères
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
      prenom: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
