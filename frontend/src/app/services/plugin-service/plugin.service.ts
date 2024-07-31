import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllPlugin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllPlugins`);
  }

  getPluginById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getPluginById/${id}`);
  }

  createPlugin(plugin: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createPlugin`, plugin);
  }

  updatePlugin(id: string, plugin: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatePlugin/${id}`, plugin);
  }

  deletePlugin(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletePlugin/${id}`);
  }
}
