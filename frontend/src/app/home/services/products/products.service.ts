import { Injectable } from '@angular/core';
import { Product } from '../../components/types/products.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private httpClient:HttpClient) { }

  getAllProducts(query?:string):Observable<Product[]>{
    let url:string = 'http://localhost:3000/api/getAllProducts';
    if(query){
      url += '?' + query;
    }
    return this.httpClient.get<Product[]>(url)
  }

  getProduct(id: number): Observable<Product[]> {
    const url: string = 'http://localhost:3000/api/getProductById/' + id;
    return this.httpClient.get<Product[]>(url);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/getAllProducts`);
  }

  // Method to add a new product
  save(product: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/add-Product`, product);
  }

  // Method to get a product by ID
  getById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/getProductById/${id}`);
  }

  update(id: number, product: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/updateProduct/${id}`, product);
  }

  // Method to delete a product by ID
  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/deleteProduct/${id}`);
  }

  upload(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}/saveLogo`, data);
  }

  getAllLogo():Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/getAllLogo`)
  }
}
