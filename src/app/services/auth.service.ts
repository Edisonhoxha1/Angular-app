import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public authentication: AngularFireAuth) { }

  getAccessToken() {
    let localStorageResponse = localStorage.getItem('response')
    console.log(localStorageResponse)
    return localStorageResponse ? localStorageResponse : null;
  }

  signOut(): void {
    this.authentication.signOut().then();
    localStorage.removeItem("response");
  }
}
