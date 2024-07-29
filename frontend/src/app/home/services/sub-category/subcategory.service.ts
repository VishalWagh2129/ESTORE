import { Injectable } from '@angular/core';
import { Category } from '../../components/types/categories.data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  // private baseUrl = 'http://localhost:3000/api';
  baseUrl : string = 'https://estore-rp4q.onrender.com/api';

  constructor(private http:HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllSubCategories`);
  }

  // Method to add a new product
  save(subcategory: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/save-subcategory`, subcategory);
  }

  // Method to get a product by ID
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getSubCategoryById/${id}`);
  }

  update(id: number, subcategory: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update-subcategory/${id}`, subcategory);
  }

  // Method to delete a subcategory by ID
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete-subcategory/${id}`);
  }
}
