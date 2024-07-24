import { Injectable } from '@angular/core';
import { Product } from '../../components/types/products.type';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { loggedInUser, loginToken, User } from '../../components/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // apiUrl:string = 'http://localhost:3000/api';
  apiUrl : string = 'https://estore-3ey7.onrender.com/api';
  private autoLogoutTimer: any;
  private authToken:string;
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  private loggedInUserInfo: BehaviorSubject<loggedInUser> = new BehaviorSubject(
    <loggedInUser>{}
  );

  constructor(private httpClient: HttpClient) { 
    this.loadToken();
  }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get loggedInUser$(): Observable<loggedInUser> {
    return this.loggedInUserInfo.asObservable();
  }

  get loggedInUser(): loggedInUser {
    return this.loggedInUserInfo.value;
  }

  get token():string{
    return this.authToken;
  }


  createUser(user: User): Observable<any> {
    // const url: string = 'http://localhost:3000/api/signup';
    const url:string = 'https://estore-3ey7.onrender.com/api/signup';
    return this.httpClient.post(url, user);
  }

  login(email: string, password: string) {
    // const url: string = 'http://localhost:3000/api/login';
    const url:string = 'https://estore-3ey7.onrender.com/api/login';
    return this.httpClient.post(url, { email: email, password: password });
  }

  activateToken(token: loginToken): void {
    localStorage.setItem('token', token.token);
    localStorage.setItem(
      'expiry',
      new Date(Date.now() + token.expiresInSeconds * 1000).toISOString()
    );
    localStorage.setItem('firstName', token.user.firstName);
    localStorage.setItem('lastName', token.user.lastName);
    localStorage.setItem('address', token.user.address);
    localStorage.setItem('city', token.user.city);
    localStorage.setItem('state', token.user.state);
    localStorage.setItem('pin', token.user.pin);
    localStorage.setItem('email', token.user.email);
    localStorage.setItem('udid', token.user.udid);

    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.user);
    this.setAutoLogoutTimer(token.expiresInSeconds * 1000);
    this.authToken = token.token;
  }

  logout():void{
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.loggedInUserInfo.next(<loggedInUser>{});
    clearTimeout(this.autoLogoutTimer);
  }

  private setAutoLogoutTimer(duration: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  loadToken(): void {
    const token: string | null = localStorage.getItem('token');
    const expiry: string | null = localStorage.getItem('expiry');
    if (!token || !expiry) {
      return;
    } else {
      const expiresIn: number =
        new Date(expiry).getTime() - new Date().getTime();
      if (expiresIn > 0) {
        const firstName: string | null = localStorage.getItem('firstName');
        const lastName: string | null = localStorage.getItem('lastName');
        const address: string | null = localStorage.getItem('address');
        const city: string | null = localStorage.getItem('city');
        const state: string | null = localStorage.getItem('state');
        const pin: string | null = localStorage.getItem('pin');
        const email: string | null = localStorage.getItem('email');
        const udid: string | null = localStorage.getItem('udid');

        const user: loggedInUser = {
          firstName: firstName !== null ? firstName : '',
          lastName: lastName !== null ? lastName : '',
          address: address !== null ? address : '',
          city: city !== null ? city : '',
          state: state !== null ? state : '',
          pin: pin !== null ? pin : '',
          email: email !== null ? email : '',
          udid: udid !== null ? udid : ''
        };

        this.isAuthenticated.next(true);
        this.loggedInUserInfo.next(user);
        this.setAutoLogoutTimer(expiresIn);
        this.authToken = token;
      } else {
        this.logout();
      }
    }
  }

  getAllCustomers():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/getAllCustomers`);
  }

  getCustomerById(id:string):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/getCustomerById/${id}`);
  }
}
