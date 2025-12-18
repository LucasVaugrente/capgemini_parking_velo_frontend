import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilisateurListComponent } from './pages/list-utilisateurs';
import {ReactiveFormsModule} from "@angular/forms";
import {MapComponent} from "./map/map.component";
import {HomeComponent} from "./pages/home";
import {VeloListComponent} from "./pages/list-velos";

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Page d'accueil
  { path: 'users', component: UtilisateurListComponent },
  { path: 'velos', component: VeloListComponent },
  { path: 'map', component: MapComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' } // Redirection par défaut
];
@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
