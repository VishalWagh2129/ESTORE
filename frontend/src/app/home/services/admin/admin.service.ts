import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AdminService {

    // apiUrl: string = 'http://localhost:3000/api';
    apiUrl : string = 'https://estore-3ey7.onrender.com/api';

    constructor(private http: HttpClient) { }

    getAdminDetails(id:any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getAdminDetails/${id}`);
    }

    update(id: any, data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/updateAdmin/${id}`, data);
    }
}