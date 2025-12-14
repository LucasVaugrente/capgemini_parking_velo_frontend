import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilisateurListComponent } from './pages/list-utilisateurs';
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./pages/home";
import {LoginComponent} from "./components/LoginComponent";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent }, // Page d'accueil
  { path: 'users', component: UtilisateurListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/', pathMatch: 'full' } // Redirection par défaut
];
@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
