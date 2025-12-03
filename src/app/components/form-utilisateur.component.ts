import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateurDTO';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-form',
  standalone: true,
  template: `
    <div class="card my-5">
      <div class="card-body">
        <h2>Ajouter un utilisateur</h2>
        <form (ngSubmit)="onSubmit()" #userForm="ngForm">
          <div class="form-group">
            <label for="nom">Nom</label>
            <input type="text" [(ngModel)]="utilisateur.nom"
                   class="form-control"
                   id="nom"
                   name="nom"
                   placeholder="Entrer votre nom"
                   required #nom="ngModel">
            <div *ngIf="nom.invalid && (nom.dirty || nom.touched)" class="alert alert-danger">
              Le nom est requis
            </div>
          </div>
          <div class="form-group">
            <label for="prenom">Prénom</label>
            <input type="text" [(ngModel)]="utilisateur.prenom"
                   class="form-control"
                   id="prenom"
                   name="prenom"
                   placeholder="Entrer votre prénom"
                   required #prenom="ngModel">
            <div *ngIf="prenom.invalid && (prenom.dirty || prenom.touched)" class="alert alert-danger">
              Le prénom est requis
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" [(ngModel)]="utilisateur.mail"
                   class="form-control"
                   id="email"
                   name="email"
                   placeholder="Entrer votre email"
                   required #email="ngModel">
            <div *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger">
              L'email est requis
            </div>
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password"
                   [(ngModel)]="utilisateur.password"
                   class="form-control"
                   id="password"
                   name="password"
                   placeholder="Entrer un mot de passe"
                   required
                   minlength="6"
                   #password="ngModel">
            <div *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger">
              <div *ngIf="password.errors?.['required']">Le mot de passe est requis</div>
              <div *ngIf="password.errors?.['minlength']">Le mot de passe doit faire au moins 6 caractères</div>
            </div>
          </div>
          <button type="submit" [disabled]="!userForm.form.valid" class="btn btn-info">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  `,
  imports: [
    FormsModule,
    NgIf
  ],
  styles: [`
    .card {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      background: white;
      border: none;
    }

    .card-body {
      padding: 0;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .form-control:focus {
      border-color: #405cf5;
      outline: none;
      box-shadow: 0 0 0 3px rgba(64, 92, 245, 0.1);
    }

    .alert {
      margin-top: 0.5rem;
      padding: 0.5rem;
      font-size: 0.875rem;
      border-radius: 4px;
    }

    .alert-danger {
      background-color: #ffebee;
      color: #c62828;
    }

    button[type="submit"] {
      background-color: #405cf5;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button[type="submit"]:hover {
      background-color: #354fdf;
    }

    button[type="submit"]:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .btn-info {
      background-color: #405cf5;
    }
  `]
})
export class UtilisateurFormComponent {
  utilisateur = new Utilisateur();

  constructor(private router: Router, private utilisateurService: UtilisateurService) {}

  onSubmit() {
    this.utilisateur.updateUsername();
    this.utilisateurService.addUtilisateur(this.utilisateur)
      .subscribe(() => this.gotoUserList());
  }

  gotoUserList() {
    this.router.navigate(['/users']).then();
  }
}
