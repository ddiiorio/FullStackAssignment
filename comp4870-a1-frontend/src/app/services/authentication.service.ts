import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { NotificationsService } from './notifications.service';

const apiUrl: string = 'https://comp4870-a1-backend2.azurewebsites.net';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private notifications: NotificationsService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public login(username: string, password: string) {
        return this.http.post<any>(`${apiUrl}/login`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    console.log('token: ' + user.token)
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('role', user.role);
                    this.currentUserSubject.next(user);
                    this.notifications.openSnackBar('Welcome');
                }
                
                return user;
            }));
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.currentUserSubject.next(null);
        this.notifications.openSnackBar('Successfully Logged Out');
    }

    register(user: User) {
        return this.http.post(`${apiUrl}/register`, user);
    }

    public getToken(): string {
        return localStorage.getItem('token')
    }

    public isAdmin(): boolean {
        return localStorage.getItem('role') === "Admin";
    }
}