import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationCreate } from '../models/reservation-create.model';
import { ReservationResponse } from '../models/reservation-response.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(this.apiUrl);
  }

  create(reservation: ReservationCreate): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(this.apiUrl, reservation);
  }

  delete(utilisateurId: number, veloId: number) {
    return this.http.delete(
      `${this.apiUrl}/utilisateur/${utilisateurId}/velo/${veloId}`
    );
  }
}
