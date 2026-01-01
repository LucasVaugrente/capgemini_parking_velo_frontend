export interface ReservationResponse {
  id?: number;
  utilisateurId: number;
  utilisateurUsername: string;

  veloId: number;
  veloNom: string;

  reservation: number;
}
