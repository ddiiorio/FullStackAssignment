import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Boat } from '../models/boat';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';
import { NotificationsService } from './notifications.service';

const boatsUrl = "https://ddboatsapi.azurewebsites.net/api/boats";


@Injectable({
  providedIn: 'root'
})
export class BoatService {
  currentUser: User;
  private httpOptions = {
    headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    })
  }

  constructor(
    private http: HttpClient, 
    private authenticationService: AuthenticationService,
    private notifications: NotificationsService
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getBoats(): Observable<Boat[]> {
    return this.http.get<Boat[]>(boatsUrl, this.httpOptions)
      .pipe(
        tap(heroes => console.log('fetched boats')),
        catchError(this.handleError('getBoats', []))
      );
  }
  
  getBoat(id: number): Observable<Boat> {
    const url = `${boatsUrl}/${id}`;
    return this.http.get<Boat>(url, this.httpOptions).pipe(
      tap(_ => console.log(`fetched boat id=${id}`)),
      catchError(this.handleError<Boat>(`getBoat id=${id}`))
    );
  }
  
  addBoat(boat: any): Observable<Boat> {
    this.notifications.openSnackBar('Boat Added');
    return this.http.post<Boat>(boatsUrl, boat, this.httpOptions).pipe(
      tap((boat: Boat) => console.log(`added boat w/ id=${boat.boatId}`)),
      catchError(this.handleError<Boat>('addBoat'))
    );
  }
  
  updateBoat(id: number, boat: any): Observable<any> {
    const url = `${boatsUrl}/${id}`;
    this.notifications.openSnackBar('Boat Updated');
    return this.http.put(url, boat, this.httpOptions).pipe(
      tap(_ => console.log(`updated boat id=${id}`)),
      catchError(this.handleError<any>('updateBoat'))
    );
  }
  
  deleteBoat(id: number): Observable<Boat> {
    const url = `${boatsUrl}/${id}`;
    this.notifications.openSnackBar('Boat Deleted');
    return this.http.delete<Boat>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted boat id=${id}`)),
      catchError(this.handleError<Boat>('deleteBoat'))
    );
  }
}
