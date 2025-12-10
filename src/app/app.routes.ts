import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilisateurListComponent } from './pages/list-utilisateurs.component';
import {ReactiveFormsModule} from "@angular/forms";

export const routes: Routes = [
  { path: 'users', component: UtilisateurListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
