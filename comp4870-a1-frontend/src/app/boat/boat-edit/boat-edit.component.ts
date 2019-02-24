import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BoatService } from '../../services/boat.service'
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-boat-edit',
  templateUrl: './boat-edit.component.html',
  styleUrls: ['./boat-edit.component.css']
})
export class BoatEditComponent implements OnInit {
  boatForm: FormGroup;
  isLoadingResults = false;
  BoatId: number;
  BoatName: string;
  Picture: string;
  LengthInFeet: number;
  Make: string;
  Description: string;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private boatApi: BoatService, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getBoat(this.route.snapshot.params['id']);
    this.boatForm = this.formBuilder.group({
      'BoatId': ['', Validators.required],
      'BoatName': ['', Validators.required],
      'LengthInFeet': ['', Validators.required],
      'Make': ['', Validators.required],
      'Picture': ['', Validators.required],
      'Description': ['', Validators.required]
    });
  }

  getBoat(id: number) {
    this.boatApi.getBoat(id).subscribe(data => {
      this.BoatId = data.BoatId;
      this.boatForm.setValue({
        BoatName: data.BoatName,
        Picture: data.Picture,
        LengthInFeet: data.LengthInFeet,
        Make: data.Make,
        Description: data.Description
      });
    });
  }

  onSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.boatApi.updateBoat(this.BoatId, form)
      .subscribe(res => {
          let id = res['BoatId'];
          this.isLoadingResults = false;
          this.router.navigate(['/boat-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
