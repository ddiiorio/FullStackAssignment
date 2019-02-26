import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snackBar: MatSnackBar, private zone: NgZone) { }

  public subj_notification: Subject<string> = new Subject();

  public openSnackBar(message: string): void {
    this.zone.run(() => {
      const snackBar = this.snackBar.open(message, '', {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 3000
      });
      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      })
    });
  }
}
