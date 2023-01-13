import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { GalleryService } from './../services/gallery/gallery.service';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  form!:FormGroup
  urls:string[]=[];
  currentProductId!: string;
  editmode:boolean=false
  isSubmitted:boolean=false
  constructor(private formBuilder:FormBuilder,private galleryService:GalleryService,private route:ActivatedRoute, private messageService:MessageService,private location:Location) { }

  ngOnInit(): void {
    this._initForm()
     this._checkEditMode()
  }


  private _initForm(){
    this.form = this.formBuilder.group({
      images:[''],
    })
  }

  get productForm(){
    return this.form.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid) return;
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key)=>{
      productFormData.append(key,this.productForm[key].value)
      console.log(this.productForm[key].value)
    })
      this._updateProduct(productFormData)
  }

  private _updateProduct(productData:FormData){
    this.galleryService.updateGallery(productData,this.currentProductId).subscribe((res:any)=>{
      //console.log(res)
      this.messageService.add({severity:'success', summary:'Service Message', detail:res.message});
      // timer(2000).toPromise().then(done=> this.location.back())
    }, (error)=>{
      this.messageService.add({severity:'error', summary:'Service Message', detail:'product can not be updated'});
    });
  }

  private _checkEditMode(){
    this.route.params.subscribe(params=>{
     if(params['id']){
       this.editmode = true
       this.currentProductId = params['id']
     }
    })
   }


  selectFiles(event:any){
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.form.patchValue({
            fileSource: this.urls
         });
         reader.readAsDataURL(event.target.files[file]);
      }
        }
      }
    }
}


