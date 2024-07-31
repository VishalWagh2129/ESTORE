import { Injectable } from '@angular/core';
import { Category } from '../../home/components/types/categories.data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // private baseUrl = 'http://localhost:3000/api';
  baseUrl : string = 'https://estore-rp4q.onrender.com/api';

  constructor(private http:HttpClient) { }

  getAllCategories():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/getAllCategories`);
  }

  getAllActiveCategories():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/getAllActiveCategories`);
  }

  getAllMainCategory():Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/getAllMainCategories`);
  }

  // Method to add a new product
  save(category: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/savecategory`, category);
  }

  // Method to get a product by ID
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getCategoryById/${id}`);
  }

  update(id: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update-category/${id}`, category);
  }

  // Method to delete a category by ID
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete-category/${id}`);
  }
}
