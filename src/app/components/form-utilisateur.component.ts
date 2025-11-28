import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateurDTO';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-form',
  standalone: true,
  template: `
    <div class="card my-5">
      <div class="card-body">
        <form (ngSubmit)="onSubmit()" #userForm="ngForm">
          <div class="form-group">
            <label for="name">Nom</label>
            <input type="text" [(ngModel)]="utilisateur.nom"
                   class="form-control"
                   id="nom"
                   name="nom"
                   placeholder="Entrer votre nom"
                   required #nom="ngModel">
          </div>
          <div [hidden]="!nom.pristine" class="alert alert-danger">Le nom est requis</div>
          <div class="form-group">
            <label for="name">Prénom</label>
            <input type="text" [(ngModel)]="utilisateur.prenom"
                   class="form-control"
                   id="prenom"
                   name="prenom"
                   placeholder="Entrer votre prénom"
                   required #prenom="ngModel">
          </div>
          <div [hidden]="!prenom.pristine" class="alert alert-danger">Le prénom est requis</div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" [(ngModel)]="utilisateur.mail"
                   class="form-control"
                   id="email"
                   name="email"
                   placeholder="Enter your email address"
                   required #email="ngModel">
            <div [hidden]="!email.pristine" class="alert alert-danger">Email is required</div>
          </div>
          <button type="submit" [disabled]="!userForm.form.valid"
                  class="btn btn-info">Submit
          </button>
        </form>
      </div>
    </div>
  `,
  imports: [
    FormsModule
  ],
  styles: [` `]
})
export class UtilisateurFormComponent {

  utilisateur: Utilisateur;

  constructor(private router: Router, private UtilisateurService: UtilisateurService) {
    // @ts-ignore
    this.utilisateur = new Utilisateur();
  }

  onSubmit() {
    this.UtilisateurService.addUtilisateur(this.utilisateur).subscribe(() => this.gotoUserList());
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
