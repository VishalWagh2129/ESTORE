import { Injectable } from '@angular/core';
import { Category } from '../../components/types/categories.data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // private baseUrl = 'http://localhost:3000/api';
  baseUrl : string = 'https://estore-3ey7.onrender.com/api';

  constructor(private http:HttpClient) { }

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}/getAllCategories`);
  }

  getAllMainCategory():Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/getAllMainCategories`);
  }
}
