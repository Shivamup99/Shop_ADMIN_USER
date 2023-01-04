import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { CategoryService } from '../../services/category/category.service';
import { ProductService } from '../../services/product/product.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
   form!: FormGroup;
   isSubmitted:boolean = false;
   editmode = false;
   categories!:[]
   imageDisplay!:string | ArrayBuffer;
   currentProductId!:string

  constructor(private productService:ProductService,private categoryService:CategoryService,private route:ActivatedRoute,private formBuilder:FormBuilder,private messageService:MessageService,private location:Location){}
  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode()
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      brand:['',Validators.required],
      price:['',Validators.required],
      countInStock:['',Validators.required],
      category:['',Validators.required],
      description:['',Validators.required],
      about:[''],
      image:['',Validators.required],
      isFeatured:[false]
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
      //console.log(this.productForm[key].value)
    })
    if(this.editmode){
      this._updateProduct(productFormData)
    } else{
      this._addProduct(productFormData)
    }
  }

  private _getCategories(){
   this.categoryService.getCategories().subscribe((res:any)=>{
    this.categories = res.result;
   })
  }

  private _addProduct(productData:FormData){
    this.productService.createProduct(productData).subscribe((res:any)=>{
      //console.log(res)
      this.messageService.add({severity:'success', summary:'Service Message', detail:res.message});
      timer(2000).toPromise().then(done=> this.location.back())
    }, (error)=>{
      this.messageService.add({severity:'error', summary:'Service Message', detail:'product can not be cretaed'});
    });
  }

  private _updateProduct(productData:FormData){
    this.productService.updateProduct(productData,this.currentProductId).subscribe((res:any)=>{
      //console.log(res)
      this.messageService.add({severity:'success', summary:'Service Message', detail:res.message});
      timer(2000).toPromise().then(done=> this.location.back())
    }, (error)=>{
      this.messageService.add({severity:'error', summary:'Service Message', detail:'product can not be updated'});
    });
  }


  // for display image during upload
  onImageUpload(event: any){
    const file = event.target.files[0];
    this.form.patchValue({image:file})
    this.form.get('image')!.updateValueAndValidity();
    if(file){
      const fileReader = new FileReader()
      fileReader.onload=()=>{
        this.imageDisplay = fileReader.result as string;
        console.log(fileReader.result)
      }
      fileReader.readAsDataURL(file);
    }
  }


  private _checkEditMode(){
    this.route.params.subscribe(params=>{
     if(params['id']){
       this.editmode = true
       this.currentProductId = params['id']
       this.productService.getProduct(params['id']).subscribe((pro)=>{
         this.productForm['name'].setValue(pro.result.name);
         this.productForm['price'].setValue(pro.result.price);
         this.productForm['category'].setValue(pro.result.category.id);
         this.productForm['countInStock'].setValue(pro.result.countInStock);
         this.productForm['brand'].setValue(pro.result.brand);
         this.productForm['description'].setValue(pro.result.description);
         this.productForm['isFeatured'].setValue(pro.result.isFeatured);
         this.productForm['about'].setValue(pro.result.about);
         this.imageDisplay = pro.result.image
         this.productForm['image'].setValidators([])
         this.productForm['image'].updateValueAndValidity()
       })
     }
    })
   }

   onCancel(){
    this.location.back();
   }

}
