export interface Velo {
  id: number;
  nom: string;
  quantite: number;
  description?: string;
  coordonneesId: number;
}

export interface Coordonnees {
  id: number;
  latitude: number;
  longitude: number;
}

export interface VeloCreateDTO {
  nom: string;
  quantite: number;
  description?: string;
  latitude: string;
  longitude: string;
}

export interface VeloUpdateDTO {
  nom: string;
  quantite: number;
  description?: string;
  coordonneesId: number;
  latitude: string;
  longitude: string;
}
