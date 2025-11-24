import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilisateurFormComponent } from './components/form-utilisateur.component';
import { UtilisateurListComponent } from './components/list-utilisateurs.component';

export const routes: Routes = [
  { path: 'users', component: UtilisateurListComponent },
  { path: 'addUser', component: UtilisateurFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
