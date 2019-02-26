import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationsService } from './notifications.service';

@Injectable()
export class ErrorHandler implements HttpInterceptor {
    constructor(
        private notifications: NotificationsService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 400) {
                this.notifications.openSnackBar('Username already exists, try again');
            } else if (err.status === 401) {
                this.notifications.openSnackBar('Unsuccessful login, try again');
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}