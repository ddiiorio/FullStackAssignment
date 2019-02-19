import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Globals } from '../globals'

@Injectable({ 
    providedIn: 'root' 
})
export class UserService {
    private apiUrl: string;

    constructor(private http: HttpClient, private globals: Globals) {
        this.apiUrl = globals.apiUrl;
    }

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }
}