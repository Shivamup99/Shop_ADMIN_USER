import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auths/auth.service';
import { LocalStorageService } from '../services/local/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginFormGroup!:FormGroup
  isSubmitted:boolean=false;
  authError:boolean = false;
  authMessage='Email or Password is wrong'
  constructor(private formBuilder:FormBuilder,private router:Router,private authService:AuthService,private localStorageService:LocalStorageService) {}

  ngOnInit(): void {
    this._initLoginForm()
  }

  private _initLoginForm(){
    this.loginFormGroup = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  onSubmit(){
    this.isSubmitted=true;
    const loginData={
      email:this.loginForm['email'].value,
      password:this.loginForm['password'].value,
    }
    if(this.loginFormGroup.invalid) return;
    this.authService.login(loginData.email,loginData.password).subscribe((user:any)=>{
      this.authError = false
      this.localStorageService.setItemToLocalStorage(user.token)
      this.router.navigate(['/'])
    },(error:HttpErrorResponse)=>{
      this.authError=true;
      if(error.status!==400){
        this.authMessage='Somthing went wrong ? try again'
      }
    })
  }

  get loginForm(){
    return this.loginFormGroup.controls;
  }

}
