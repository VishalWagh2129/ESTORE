import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {


  // private baseUrl = 'http://localhost:3000/api';
  baseUrl : string = 'https://estore-3ey7.onrender.com/api';

  constructor(private http: HttpClient) { }

  // Save a new brand
  save(brand: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveBrand`, brand);
  }

  getActive(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllActiveBrands`);
  }

  // Get all brands
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllBrands`);
  }

  // Get a brand by ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getBrandbyId/${id}`);
  }

  // Update an existing brand
  update(id: number, brand: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateBrand/${id}`, brand);
  }

  // Delete a brand by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteBrand/${id}`);
  }
}
