import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <div>
      <h1 mat-dialog-title>Confirmation</h1>
      <div mat-dialog-content>
        <p>{{ data.message }}</p>
      </div>
      <div mat-dialog-actions class="actions-container">
        <button mat-button (click)="onCancel()">Annuler</button>
        <button mat-button color="warn" (click)="onConfirm()">Confirmer</button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogTitle
  ],
  styles: [`
    div {
      padding: 10px;
    }

    .actions-container {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 8px 16px 16px;
    }
  `]
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
