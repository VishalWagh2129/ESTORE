import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { ComponentManagerService } from './component-manager.service';
import { CurrentUserModel } from '../components/types/common.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // apiUrl:string = 'http://localhost:3000/api';
  apiUrl : string = 'https://estore-rp4q.onrender.com/api';

  constructor(private http: HttpClient,
     private componentManagerService: ComponentManagerService,
     private cookieService: CookieService) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/admin-login`, { email, password }).pipe(
      map(response => {
        if (response.success) {       
          this.saveDataToCookie('token',response.data);
          const decodeUser = this.decodeUserFromToken(response.data);
          this.setCurrentUser(decodeUser);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  saveDataToCookie(key: string, value: string): void {
    this.cookieService.set(key, value);
  }

  decodeUserFromToken(token) {
    return jwtDecode(token);
  }

  setCurrentUser(decodedUser:any){
    const currentUser = new CurrentUserModel();
    currentUser.udId = decodedUser.UDID;
    currentUser.userType = decodedUser.USER_TYPE;
    currentUser.loginType = decodedUser.LOGIN_TYPE;
    currentUser.userName = decodedUser.USERNAME;
    currentUser.email = decodedUser.EMAIL;
    currentUser.mobile = decodedUser.MOBILE;
    currentUser.profileImage = decodedUser?.PROFILE_IMAGE;
    this.componentManagerService.setCurrentUser(decodedUser);
  }

  signup(username: string, mobile: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin-signup`, { username, mobile, email, password }).pipe(
      map(response => {
        if (response.success) {
          return true;
        }else{
         return false;
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get('token');
  }

  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('currentUser');
    this.componentManagerService.user = new CurrentUserModel();
    this.componentManagerService.loggedIn = false;
  }
}
