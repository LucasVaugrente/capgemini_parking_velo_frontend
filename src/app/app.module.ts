import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UtilisateurListComponent } from './components/list-utilisateurs.component';
import { UtilisateurFormComponent } from './components/form-utilisateur.component';
import { UtilisateurService } from './services/utilisateur.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppComponent,
    UtilisateurListComponent,
    UtilisateurFormComponent
  ],
  providers: [UtilisateurService],
})
export class AppModule { }
