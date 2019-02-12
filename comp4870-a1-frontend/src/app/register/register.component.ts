import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Username: new FormGroup({
    Password: new FormControl(''),
    Email: new FormControl(''),
    Country: new FormControl(''),
    MobileNumber: new FormControl('')
    })
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Username: ['', Validators.required],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        Email: ['', Validators.required],
        Country: ['', Validators.required],
        MobileNumber: ['', Validators.required]
    });
}

}
