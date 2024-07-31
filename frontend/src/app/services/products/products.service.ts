import { Injectable } from '@angular/core';
import { Product } from '../../home/components/types/products.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private baseUrl = 'http://localhost:3000/api';
  baseUrl : string = 'https://estore-rp4q.onrender.com/api';

  constructor(private httpClient:HttpClient) { }

  getAllProducts(query?:string):Observable<Product[]>{
    // let url:string = 'http://localhost:3000/api/getAllProducts';
    let url:string = 'https://estore-rp4q.onrender.com/api/getAllProducts';
    if(query){
      url += '?' + query;
    }
    return this.httpClient.get<Product[]>(url)
  }

  getProduct(id: string): Observable<Product[]> {
    // let url:string = 'http://localhost:3000/api/getProductById/' + id;
    const url: string = 'https://estore-rp4q.onrender.com/api/getProductById/' + id;
    return this.httpClient.get<Product[]>(url);
  }
}
