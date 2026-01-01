import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationResponse } from '../models/reservation-responseDTO';
import { ReservationCreate } from '../models/reservation-createDTO';

@Injectable({ providedIn: 'root' })
export class ReservationService {

  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ReservationResponse[]>(this.apiUrl);
  }

  create(data: ReservationCreate) {
    return this.http.post(this.apiUrl, data);
  }

  update(utilisateurId: number, veloId: number, data: Partial<ReservationCreate>) {
    return this.http.put(
      `${this.apiUrl}/utilisateur/${utilisateurId}/velo/${veloId}`,
      data
    );
  }

  delete(utilisateurId: number, veloId: number) {
    return this.http.delete(
      `${this.apiUrl}/utilisateur/${utilisateurId}/velo/${veloId}`
    );
  }
}
