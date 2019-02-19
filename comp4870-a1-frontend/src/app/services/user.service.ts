import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/user';
import { Globals } from '../globals'

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl: string;

    constructor(private http: HttpClientModule, private globals: Globals) {
        this.apiUrl = globals.apiUrl;
     }

     // todo: change this to get all boat data once logged in
    getAll() {
        //return this.http.get<User[]>(`${this.apiUrl}/users`);
    }
}