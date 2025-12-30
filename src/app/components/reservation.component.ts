import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { ReservationService } from '../services/reservation.service';
import { ReservationResponse } from '../models/reservation-response.model';
import { FormAddReservationComponent } from './form-add-reservation.component';
import { FormUpdateReservationComponent } from './form-update-reservation.component';

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
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  displayedColumns: string[] = ['utilisateur', 'velo', 'quantite', 'actions'];
  dataSource = new MatTableDataSource<ReservationResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private reservationService: ReservationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  openAddDialog(): void {
    this.dialog.open(FormAddReservationComponent, {
      width: '500px'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.reservationService.create(result)
          .subscribe(() => this.loadReservations());
      }
    });
  }

openEditDialog(r: ReservationResponse) {
  this.dialog.open(FormUpdateReservationComponent, {
    width: '400px',
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
    this.reservationService
      .delete(r.utilisateurId, r.veloId)
      .subscribe(() => this.loadReservations());
  }
}
