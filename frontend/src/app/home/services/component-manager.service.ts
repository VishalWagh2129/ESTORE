import { Injectable } from '@angular/core';
import { CurrentUserModel } from '../components/types/common.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ComponentManagerService {
  private currentUser: CurrentUserModel | null = null;
  user: CurrentUserModel = new CurrentUserModel();
  loggedIn: Boolean = false;
  private userCookieKey = 'currentUser';

  constructor(private cookieService: CookieService) {
    this.loadUserFromCookie();
  }

  setCurrentUser(user: CurrentUserModel): void {
    this.user = user;
    this.loggedIn = true;
    this.saveUserToCookie();
  }

  private saveUserToCookie(): void {
    this.cookieService.set(this.userCookieKey, JSON.stringify(this.user));
  }

  private loadUserFromCookie(): void {
    const userJson = this.cookieService.get(this.userCookieKey);
    if (userJson) {
      this.user = JSON.parse(userJson) as CurrentUserModel;
      this.loggedIn = true;
    }
  }

 
}
