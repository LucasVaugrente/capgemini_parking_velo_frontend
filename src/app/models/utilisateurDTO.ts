export class Utilisateur {
  id?: number;
  nom: string = '';
  prenom: string = '';
  mail: string = '';
  username: string = '';
  password: string = '';

  updateUsername(): void {
    this.username = `${this.nom.toLowerCase()}.${this.prenom.toLowerCase()}`;
  }
}
