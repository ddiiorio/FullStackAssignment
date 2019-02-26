import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Username: ['', Validators.required],
        Password: ['', [Validators.required, Validators.minLength(8)]],
        Email: ['', Validators.required, Validators.email],
        Country: ['', Validators.required],
        MobileNumber: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get g() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
        this.authenticationService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    console.log(error);
                    this.loading = false;
                });
    }
}