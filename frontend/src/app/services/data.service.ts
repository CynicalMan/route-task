import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = environment.dataUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
}
