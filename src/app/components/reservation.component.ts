import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ReservationService } from '../services/reservation.service';
import { ReservationResponse } from '../models/reservation-response.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit {

  form!: FormGroup;
  reservations: ReservationResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      utilisateurId: ['', Validators.required],
      veloId: ['', Validators.required],
      reservation: ['', [Validators.required, Validators.min(1)]]
    });

    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getAll().subscribe(data => {
      this.reservations = data;
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.reservationService.create(this.form.value).subscribe(() => {
      this.form.reset();
      this.loadReservations();
    });
  }

  delete(r: ReservationResponse) {
    this.reservationService
      .delete(r.utilisateurId, r.veloId)
      .subscribe(() => this.loadReservations());
  }
}
