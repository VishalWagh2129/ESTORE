import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {

  // apiUrl:string = 'http://localhost:3000/api';
  apiUrl : string = 'https://estore-rp4q.onrender.com/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllProducts`);
  }

  // Method to add a new product
  save(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/saveProduct`, product);
  }

  // Method to get a product by ID
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getProductById/${id}`);
  }

  update(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateProduct/${id}`, product);
  }

  // Method to delete a product by ID
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteProduct/${id}`);
  }

  upload(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/saveLogo`, data);
  }

  getAllLogo():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getAllLogo`)
  }
}
