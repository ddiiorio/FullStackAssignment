import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Boat } from '../../models/boat'
import { BoatService } from '../../services/boat.service'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-boat-add',
  templateUrl: './boat-add.component.html',
  styleUrls: ['./boat-add.component.css']
})
export class BoatAddComponent implements OnInit {
  boatForm: FormGroup;
  isLoadingResults = false;
  submitted = false;
  BoatId: number;

  constructor(
    private router: Router, 
    private boatApi: BoatService, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.boatForm = this.formBuilder.group({
      BoatId: ['', Validators.required],
      BoatName: ['', Validators.required],
      LengthInFeet: ['', Validators.required],
      Make: ['', Validators.required],
      Picture: ['', Validators.required],
      Description: ['', Validators.required]
    });
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.boatForm.invalid) {
      console.log('invalid form')
      return;
    }

    this.isLoadingResults = true;
    this.boatApi.addBoat(form)
      .subscribe(res => {
          //let id = res['BoatId'];
          this.isLoadingResults = false;
          this.router.navigate(['/boat-details/' + this.boatForm.controls.boatId]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
