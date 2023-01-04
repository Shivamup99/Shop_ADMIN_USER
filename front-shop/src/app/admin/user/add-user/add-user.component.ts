import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { User } from 'src/app/models/user';
import { Location } from '@angular/common';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  form!:FormGroup;
  isSubmitted:boolean = false;
  editmode = false;
  currentUserId! :string;
  countries!: [];
  // for array is not working why ?

  constructor(private userService:UserService,private formBuilder:FormBuilder,private messageService:MessageService,private location : Location,private route:ActivatedRoute) { }

 ngOnInit(): void {
   this.form = this.formBuilder.group({
     name:['',Validators.required],
     email:['',[Validators.required,Validators.email]],
     password:['',Validators.required],
     phone:['',Validators.required],
     country:[''],
     zip:[''],
     street:[''],
     apartment:[''],
     isAdmin:[false],
     city:['']

   })
   this._checkEditMode()
  //  this._getCountries()
 }

 get userForm(){
   return this.form.controls;
 }

//  private _getCountries(){
//   return Countries.map((i:any)=>{
//      this.countries = i
//     // console.log(i)
//    });
//  }

 onSubmit(){
   this.isSubmitted = true
   if(this.form.invalid){
     return;
   }
   const user:User ={
     id:this.currentUserId,
     name:this.userForm['name'].value,
     email:this.userForm['email'].value,
     password:this.userForm['password'].value,
     phone:this.userForm['phone'].value,
     zip:this.userForm['zip'].value,
     street:this.userForm['street'].value,
     apartment:this.userForm['apartment'].value,
     city:this.userForm['city'].value,
     isAdmin:this.userForm['isAdmin'].value,
     country:this.userForm['country'].value
   }
   if(this.editmode){
     this._updateUser(user)
   } else{
     this._addUser(user)
   }

 }

 private _addUser(user:User){
   this.userService.createUser(user).subscribe((res:any)=>{
     //console.log(res)
     this.messageService.add({severity:'success', summary:'Service Message', detail:res.message});
     timer(2000).toPromise().then(done=> this.location.back())
   }, (error)=>{
     this.messageService.add({severity:'error', summary:'Service Message', detail:'user can not be cretaed'});
   });
 }

 private _updateUser(user:User){
   this.userService.updateUser(user).subscribe((res:any)=>{
     //console.log(res)
     this.messageService.add({severity:'success', summary:'Service Message', detail:res.message});
     timer(2000).toPromise().then(done=> this.location.back())

   }, (error)=>{
     this.messageService.add({severity:'error', summary:'Service Message', detail:'user can not be updated'});
   });
 }


 private _checkEditMode(){
   this.route.params.subscribe(params=>{
    if(params['id']){
      this.editmode = true
      this.currentUserId = params['id']
      this.userService.getUser(params['id']).subscribe((user)=>{
        this.userForm['name'].setValue(user.result.name);
        this.userForm['email'].setValue(user.result.email);
        this.userForm['password'].setValue(user.result.password);
        this.userForm['phone'].setValue(user.result.phone);
        this.userForm['city'].setValue(user.result.city);
        this.userForm['country'].setValue(user.result.country);
        this.userForm['zip'].setValue(user.result.zip);
        this.userForm['street'].setValue(user.result.street);
        this.userForm['apartment'].setValue(user.result.apartment);
        this.userForm['isAdmin'].setValue(user.result.isAdmin);
        this.userForm['password'].setValidators([]);
        this.userForm['password'].updateValueAndValidity();
      })
    }
   })
 }


 onCanel(){
   this.location.back();
 }
}
