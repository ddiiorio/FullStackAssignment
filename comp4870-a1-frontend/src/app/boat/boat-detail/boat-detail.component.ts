import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Boat } from '../../models/boat'
import { BoatService } from '../../services/boat.service'
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-boat-detail',
  templateUrl: './boat-detail.component.html',
  styleUrls: ['./boat-detail.component.css']
})
export class BoatDetailComponent implements OnInit {
  currentUser: User;
  _id: any;
  boat: Boat = {
    BoatId: null,
    BoatName: '',
    LengthInFeet: null,
    Make: '',
    Picture: '',
    Description: ''
  };
  isLoadingResults = true;
  isAdmin = true;

  constructor(
    private route: ActivatedRoute, 
    private boatApi: BoatService,
    private authenticationService: AuthenticationService, 
    private router: Router,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    //this.isAdmin = this.currentUser.Role === 'ADMIN' ? true : false;

    // this.route.params.subscribe(params => {
    //   this._id = + params['id'];
    // });

    
   }

  ngOnInit() {
    // this.route.params.subscribe((evt) => {
    //   console.log('testing id ' + evt.state.root.params['id']);
    // });
    this._id = this.route.snapshot.paramMap.get('id');
    this.getBoatDetails(this._id);
  }

  getBoatDetails(id: number) {
    this.boatApi.getBoat(id)
      .subscribe(data => {
        this.boat = data;
        console.log(this.boat);
        this.isLoadingResults = false;
      });
  }

  deleteBoat(_id) {
    this.isLoadingResults = true;
    this.boatApi.deleteBoat(_id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/boats']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
