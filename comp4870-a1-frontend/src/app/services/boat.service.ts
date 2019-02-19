import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Boat } from '../models/boat';
import { Globals } from '../globals'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoatService {
  private apiUrl: string;

  constructor(private http: HttpClient, private globals: Globals) {
      this.apiUrl = globals.apiUrl;
  }

  getAll() {
    return this.http.get<Boat[]>(`${this.apiUrl}/boats`);
  }
}
