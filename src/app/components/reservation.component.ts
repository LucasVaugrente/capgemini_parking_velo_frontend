import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ReservationService } from '../services/reservation.service';
import { ReservationResponse } from '../models/reservation-response.model';
import { FormAddReservationComponent } from './form-add-reservation.component';
import { FormUpdateReservationComponent } from './form-update-reservation.component';
import { ConfirmationReserDialogComponent } from './confirmation-reser-dialog.component';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  template: `
    <button mat-button color="primary" (click)="openAddDialog()">
      + Ajouter une réservation
    </button>

    <table mat-table [dataSource]="reservations" class="mat-elevation-z1">

      <!-- Utilisateur -->
      <ng-container matColumnDef="utilisateur">
        <th mat-header-cell *matHeaderCellDef> Utilisateur </th>
        <td mat-cell *matCellDef="let r"> {{ r.utilisateurUsername }} </td>
      </ng-container>

      <!-- Vélo -->
      <ng-container matColumnDef="velo">
        <th mat-header-cell *matHeaderCellDef> Vélo </th>
        <td mat-cell *matCellDef="let r"> {{ r.veloNom }} </td>
      </ng-container>

      <!-- Quantité -->
      <ng-container matColumnDef="quantite">
        <th mat-header-cell *matHeaderCellDef> Quantité </th>
        <td mat-cell *matCellDef="let r"> {{ r.reservation }} </td>
      </ng-container>

      <!-- Actions -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let r">
          <button mat-button color="primary" (click)="openEditDialog(r)">
            Mettre à jour
          </button>
          <button mat-button color="warn" (click)="delete(r)">
            Supprimer
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>

    </table>
  `
})
export class ReservationComponent implements OnInit {

  displayedColumns = ['utilisateur', 'velo', 'quantite', 'actions'];
  reservations: ReservationResponse[] = [];

  constructor(
    private reservationService: ReservationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAll().subscribe(data => {
      this.reservations = data;
    });
  }

  openAddDialog(): void {
    this.dialog.open(FormAddReservationComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.reservationService.create(result)
            .subscribe(() => this.loadReservations());
        }
      });
  }

  openEditDialog(r: ReservationResponse): void {
    this.dialog.open(FormUpdateReservationComponent, {
      data: r
    }).afterClosed().subscribe(result => {
      if (result) {
        this.reservationService.update(
          r.utilisateurId,
          r.veloId,
          {
            utilisateurId: r.utilisateurId,
            veloId: r.veloId,
            reservation: result.reservation
          }
        ).subscribe(() => this.loadReservations());
      }
    });
  }

  delete(r: ReservationResponse): void {
  const dialogRef = this.dialog.open(ConfirmationReserDialogComponent, {
    width: '400px',
    data: {
      message: 'Êtes-vous sûr de vouloir supprimer cette réservation ?'
    }
  });

  dialogRef.afterClosed().subscribe(confirmed => {
    if (confirmed) {
      this.reservationService
        .delete(r.utilisateurId, r.veloId)
        .subscribe(() => this.loadReservations());
    }
  });
}

}
