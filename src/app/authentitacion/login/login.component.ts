import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public router: Router,
              public authentication: AngularFireAuth,) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  //admin: test@test.com
  //       12345678
  onSubmit() {
    if(this.loginForm.invalid)
      return this.loginForm.markAllAsTouched();
    this.authentication.signInWithEmailAndPassword(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then(res => {
        if(res) {
          res.user?.getIdTokenResult().then(res => {
            localStorage.setItem('response', JSON.stringify(res.token));
          })

          if (res.user?.email == 'test@test.com') {
            this.router.navigate(['product-list/admin']);
          } else {
            this.router.navigate(['product-list/user']);
          }
        }

    })

  }

}
