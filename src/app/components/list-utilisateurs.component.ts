import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Utilisateur } from '../models/utilisateurDTO';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card my-5">
      <div class="card-body">
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
            <th scope="col">Mail</th>
            <th scope="col">Nom d'utilisateur</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let utilisateur of utilisateurs">
            <td>{{ utilisateur.id }}</td>
            <td>{{ utilisateur.nom }}</td>
            <td>{{ utilisateur.prenom }}</td>
            <td>{{ utilisateur.mail }}</td>
            <td>{{ utilisateur.username }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`


    table {
      border-radius: 5px;
      font-size: 12px;
      font-weight: normal;
      border: none;
      border-collapse: collapse;
      width: 100%;
      max-width: 100%;
      white-space: nowrap;
      background-color: white;
    }

    td, th {
      text-align: center;
      padding: 8px;
    }

    td {
      border-right: 1px solid #f8f8f8;
      font-size: 12px;
    }

    thead th {
      color: #ffffff;
      background: #324960;
    }

    tr:nth-child(even) {
      background: #F8F8F8;
    }

  `]
})
export class UtilisateurListComponent implements OnInit {

  utilisateurs: Utilisateur[] | undefined;

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.utilisateurService.getUtilisateurs().subscribe(data => {
      this.utilisateurs = data;
    });
  }
}
