import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category/category.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentCategoryId!: string;
 constructor(private categoryService:CategoryService,private formBuilder:FormBuilder,private messageService:MessageService,private location : Location,private route:ActivatedRoute) { }

 ngOnInit(): void {
   this.form = this.formBuilder.group({
     name:['',Validators.required],
     icon:['',Validators.required],
     color:['#fff']

   })
   this._checkEditMode()
 }

 get categoryForm(){
   return this.form.controls;
 }

 onSubmit(){
   this.isSubmitted = true
   if(this.form.invalid){
     return;
   }
   const category:Category ={
     id:this.currentCategoryId,
     name:this.categoryForm['name'].value,
     icon:this.categoryForm['icon'].value,
     color:this.categoryForm['color'].value
   }
   if(this.editmode){
     this._updateCategory(category)
   } else{
     this._addCategory(category)
   }
 }

 private _addCategory(category:Category){
   this.categoryService.createCategories(category).subscribe((res:any)=>{
     //console.log(res)
     this.messageService.add({severity:'success', summary:'Service Message', detail:res.message});
     timer(2000).toPromise().then(done=> this.location.back())
   }, (error)=>{
     this.messageService.add({severity:'error', summary:'Service Message', detail:'category can not be cretaed'});
   });
 }

 private _updateCategory(category:Category){
   this.categoryService.updateCategory(category).subscribe((res:any)=>{
     //console.log(res)
     this.messageService.add({severity:'success', summary:'Service Message', detail:res.message});
     timer(2000).toPromise().then(done=> this.location.back())
   }, (error)=>{
     this.messageService.add({severity:'error', summary:'Service Message', detail:'category can not be updated'});
   });
 }

 private _checkEditMode(){
  this.route.params.subscribe(params=>{
   if(params['id']){
     this.editmode = true
     this.currentCategoryId = params['id']
     this.categoryService.getCategory(params['id']).subscribe((cat)=>{
       this.categoryForm['name'].setValue(cat.result.name);
       this.categoryForm['icon'].setValue(cat.result.icon);
       this.categoryForm['color'].setValue(cat.result.color);
     })
   }
  })
}

onCancle(){
  this.location.back();
}

}
