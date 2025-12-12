import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Velo } from '../models/veloDTO';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VeloService {

  private readonly usersUrl = '/api/velos';

  constructor(private http: HttpClient) {}

  getVelos(): Observable<Velo[]> {
    return this.http.get<Velo[]>(this.usersUrl);
  }

  addVelo(velo: Velo): Observable<Velo> {
    return this.http.post<Velo>(this.usersUrl, velo);
  }

  updateVelo(id: number, velo: Velo): Observable<Velo> {
    return this.http.put<Velo>(`${this.usersUrl}/${id}`, velo);
  }

  supprimerVelo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${id}`);
  }
}
