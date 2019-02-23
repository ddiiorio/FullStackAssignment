import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Boat } from '../models/boat';
import { Globals } from '../globals'
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const boatsUrl = "/api/boats";

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

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getBoats (): Observable<Boat[]> {
    return this.http.get<Boat[]>(boatsUrl)
      .pipe(
        tap(heroes => console.log('fetched boats')),
        catchError(this.handleError('getBoats', []))
      );
  }
  
  getBoat(id: number): Observable<Boat> {
    const url = `${boatsUrl}/${id}`;
    return this.http.get<Boat>(url).pipe(
      tap(_ => console.log(`fetched boat id=${id}`)),
      catchError(this.handleError<Boat>(`getBoat id=${id}`))
    );
  }
  
  addBoat (boat): Observable<Boat> {
    return this.http.post<Boat>(boatsUrl, boat, httpOptions).pipe(
      tap((boat: Boat) => console.log(`added boat w/ id=${boat.id}`)),
      catchError(this.handleError<Boat>('addBoat'))
    );
  }
  
  updateBoat (id, boat): Observable<any> {
    const url = `${boatsUrl}/${id}`;
    return this.http.put(url, boat, httpOptions).pipe(
      tap(_ => console.log(`updated boat id=${id}`)),
      catchError(this.handleError<any>('updateBoat'))
    );
  }
  
  deleteBoat (id): Observable<Boat> {
    const url = `${boatsUrl}/${id}`;
  
    return this.http.delete<Boat>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted boat id=${id}`)),
      catchError(this.handleError<Boat>('deleteBoat'))
    );
  }
}
