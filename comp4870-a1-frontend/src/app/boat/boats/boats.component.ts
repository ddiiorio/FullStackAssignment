import { Component, OnInit } from '@angular/core';
import { Boat } from '../../models/boat'
import { BoatService } from '../../services/boat.service'
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.css']
})
export class BoatsComponent implements OnInit {

  displayedColumns: string[] = [
    'BoatId',
    'BoatName', 
    'LengthInFeet',
    'Make'
  ];
  data: Boat[] = [];
  isLoadingResults = true;
  private snackBar: MatSnackBar;
  currentUser: User;

  constructor(
    private boatApi: BoatService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
    //this.snackBar.open('Welcome back ' + this.authenticationService.currentUser);
    this.boatApi.getBoats()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
