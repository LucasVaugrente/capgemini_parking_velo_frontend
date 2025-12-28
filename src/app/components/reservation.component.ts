import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ReservationService } from '../services/reservation.service';
import { ReservationResponse } from '../models/reservation-response.model';
import { MatDialog } from '@angular/material/dialog';
import { FormAddReservationComponent } from './form-add-reservation.component';

@Component({
  selector: 'app-reservation',
  standalone: true, 
  imports: [
    CommonModule,
    MatTableModule,    
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit {

  reservations: ReservationResponse[] = [];

  constructor(
    private reservationService: ReservationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

loadReservations() {
  this.reservationService.getAll().subscribe(data => {
    console.log('DATA BACKEND:', data);
    this.reservations = data;
  });
}


  openAddDialog() {
    this.dialog.open(FormAddReservationComponent, {
      width: '500px'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.reservationService.create(result)
          .subscribe(() => this.loadReservations());
      }
    });
  }

  delete(r: ReservationResponse) {
    this.reservationService
      .delete(r.utilisateurId, r.veloId)
      .subscribe(() => this.loadReservations());
  }
}
