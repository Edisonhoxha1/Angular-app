import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  SignUpForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public authentication: AngularFireAuth,
              private router: Router,
              private authService: AuthService) {
    this.SignUpForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  ngOnInit(): void {
  }

  signUp() {
    if(this.SignUpForm.invalid)
      return this.SignUpForm.markAllAsTouched();

    this.authentication.createUserWithEmailAndPassword(this.SignUpForm.get('email')?.value, this.SignUpForm.get('password')?.value).then(res => {
      if(res) {
        this.router.navigate(['login']);
      }
    })
  }

}
