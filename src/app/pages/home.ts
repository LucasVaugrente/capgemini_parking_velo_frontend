import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <mat-card>
        <mat-card-content>
          <h1>Bienvenue sur l'application de gestion des réservations de vélos !</h1>
          <p>Ici, vous pouvez gérer les utilisateurs, réservations et vélos.</p>
          <p>Utilisez le menu pour naviguer vers la liste des utilisateurs, réservations, vélos et même la carte pour localiser.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      text-align: center;
    }
  `],
  imports: [MatCardModule]
})
export class HomeComponent {}
