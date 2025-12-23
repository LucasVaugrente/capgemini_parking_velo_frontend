import {Injectable} from "@angular/core";
import {AuthService} from "../services/Auth.service";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
