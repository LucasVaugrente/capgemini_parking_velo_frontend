import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Velo, VeloUpdateDTO, VeloCreateDTO, Coordonnees} from '../models/veloDTO';
import {HttpClient} from "@angular/common/http";
import { switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeloService {

  private readonly velosUrl = '/api/velos';
  private readonly coordonneesUrl = '/api/coordonnees';

  constructor(private http: HttpClient) {}

  getVelos(): Observable<Velo[]> {
    return this.http.get<Velo[]>(this.velosUrl);
  }

  getAllCoordonnees(): Observable<Coordonnees[]> {
    return this.http.get<Coordonnees[]>(this.coordonneesUrl);
  }

  getVelosWithCoordonnees(): Observable<Array<Velo & Coordonnees>> {
    return forkJoin([
      this.getVelos(),
      this.getAllCoordonnees()
    ]).pipe(
      map(([velos, coordonnees]) => {
        return velos
          .map(velo => {
            const coord = coordonnees.find(c => c.id === velo.coordonneesId);
            if (coord) {
              return { ...velo, latitude: coord.latitude, longitude: coord.longitude };
            }
            return null;
          })
          .filter(velo => velo !== null) as Array<Velo & Coordonnees>;
      })
    );
  }


  addVelo(velo: VeloCreateDTO): Observable<Velo> {
    return this.http.post<Velo>(this.velosUrl, velo);
  }

  updateVelo(id: number, velo: VeloUpdateDTO): Observable<Velo> {
    return this.http.put<Velo>(`${this.velosUrl}/${id}`, velo);
  }

  supprimerVelo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.velosUrl}/${id}`);
  }
}
