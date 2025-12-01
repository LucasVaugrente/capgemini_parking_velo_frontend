import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Utilisateur } from '../models/utilisateurDTO';
import { UtilisateurService } from '../services/utilisateur.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, RouterLink],
  template: `
    <div>
      <div>

        <div class="block-btn">
          <a routerLink="/addUser" class="btn">Ajouter un utilisateur</a>
        </div>

        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef> # </th>
            <td mat-cell *matCellDef="let utilisateur"> {{ utilisateur.id }} </td>
          </ng-container>

          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef> Nom </th>
            <td mat-cell *matCellDef="let utilisateur"> {{ utilisateur.nom }} </td>
          </ng-container>

          <ng-container matColumnDef="prenom">
            <th mat-header-cell *matHeaderCellDef> Prenom </th>
            <td mat-cell *matCellDef="let utilisateur"> {{ utilisateur.prenom }} </td>
          </ng-container>

          <ng-container matColumnDef="mail">
            <th mat-header-cell *matHeaderCellDef> Mail </th>
            <td mat-cell *matCellDef="let utilisateur"> {{ utilisateur.mail }} </td>
          </ng-container>

          <ng-container matColumnDef="username">
            <th mat-header-cell *matHeaderCellDef> Nom d'utilisateur </th>
            <td mat-cell *matCellDef="let utilisateur"> {{ utilisateur.username }} </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 20]"
                       showFirstLastButtons
                       aria-label="Sélectionner la page des utilisateurs">
        </mat-paginator>

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

    .block-btn {
      margin: 20px;
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #405cf5;
      border-radius: 6px;
      box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0;
      padding: 15px;
      color: white;
      text-decoration: none;
      width: 150px;
      font-weight: bold;
      transition: 0.2s ease-in-out;
    }

    .btn:hover {
      background-color: #354fdf;
    }

  `]
})
export class UtilisateurListComponent implements OnInit, AfterViewInit { // 3. Implémenter AfterViewInit

  displayedColumns: string[] = ['id', 'nom', 'prenom', 'mail', 'username'];

  dataSource = new MatTableDataSource<Utilisateur>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.utilisateurService.getUtilisateurs().subscribe(data => {
      // 6. Affecter les données à la source de la table
      this.dataSource.data = data;
    });
  }

  // 7. Affecter le paginator à la source de données après l'initialisation de la vue
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
