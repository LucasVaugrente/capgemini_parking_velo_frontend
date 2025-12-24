import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ReservationService } from '../services/reservation.service';
import { ReservationResponse } from '../models/reservation-response.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservations: ReservationResponse[] = [];
  form!: FormGroup;

  showForm = false;
  isEditMode = false;
  reservationToEdit: ReservationResponse | null = null;

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

  openCreateForm() {
    this.form.reset();
    this.isEditMode = false;
    this.reservationToEdit = null;
    this.showForm = true;
  }

  edit(r: ReservationResponse) {
    this.isEditMode = true;
    this.showForm = true;
    this.reservationToEdit = r;

    this.form.patchValue({
      utilisateurId: r.utilisateurId,
      veloId: r.veloId,
      reservation: r.reservation
    });
  }

  submit() {
    if (this.form.invalid) return;

    if (this.isEditMode && this.reservationToEdit) {
      this.reservationService.update(
        this.reservationToEdit.utilisateurId,
        this.reservationToEdit.veloId,
        this.form.value
      ).subscribe(() => this.afterSave());
    } else {
      this.reservationService.create(this.form.value)
        .subscribe(() => this.afterSave());
    }
  }

  delete(r: ReservationResponse) {
    this.reservationService
      .delete(r.utilisateurId, r.veloId)
      .subscribe(() => this.loadReservations());
  }

  cancel() {
    this.showForm = false;
    this.form.reset();
  }

  afterSave() {
    this.showForm = false;
    this.form.reset();
    this.loadReservations();
  }
}
