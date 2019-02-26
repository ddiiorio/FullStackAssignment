import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BoatService } from '../../services/boat.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Boat } from 'src/app/models/boat';

@Component({
  selector: 'app-boat-edit',
  templateUrl: './boat-edit.component.html',
  styleUrls: ['./boat-edit.component.css']
})
export class BoatEditComponent implements OnInit {
  boatForm: FormGroup;
  isLoadingResults = false;
  _id: any;
  boat: Boat = {
    boatId: null,
    boatName: '',
    lengthInFeet: null,
    make: '',
    picture: '',
    description: ''
  };

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private boatApi: BoatService, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.getBoat(this._id);
    this.boatForm = this.formBuilder.group({
      BoatId: [{value: '', disabled: true}],
      BoatName: ['', Validators.required],
      LengthInFeet: ['', Validators.required],
      Make: ['', Validators.required],
      Picture: ['', Validators.required],
      Description: ['']
    });
  }

  getBoat(id: number) {
    this.boatApi.getBoat(id)
      .subscribe(data => {
      this.boat = data;
      this.boatForm.setValue({
        BoatId: this.boat.boatId,
        BoatName: this.boat.boatName,
        Picture: this.boat.picture,
        LengthInFeet: this.boat.lengthInFeet,
        Make: this.boat.make,
        Description: this.boat.description
      });
    });
  }

  onSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.boatApi.updateBoat(this._id, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/boat-details/' + this._id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}