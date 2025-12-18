import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Coordonnées de base (exemple : centre de la ville)
    const center = { lat: 47.2184, lng: -1.5536 }; // Nantes, France

    // Initialisation de la carte
    this.map = L.map('map').setView(center, 13);

    // Ajout de la couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Exemple : Ajout de marqueurs pour les vélos
    this.addBikeMarkers();
  }

  private addBikeMarkers(): void {
    // Exemple de données de vélos (à remplacer par tes données réelles)
    const bikes = [
      { lat: 47.2184, lng: -1.5536, name: "Vélo 1" },
      { lat: 47.2200, lng: -1.5550, name: "Vélo 2" },
      { lat: 47.2170, lng: -1.5520, name: "Vélo 3" },
    ];

    bikes.forEach(bike => {
      L.marker([bike.lat, bike.lng])
        .addTo(this.map)
        .bindPopup(`<b>${bike.name}</b>`);
    });
  }
}
