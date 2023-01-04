import { Product } from './../../models/product';
import { ProductService } from 'src/app/admin/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!:Product
  quantity!:number
  constructor(private productService:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      if(params['productId']){
        this._getProduct(params['productId'])
      }
    })
  }

  private _getProduct(id:string){
    this.productService.getProduct(id).subscribe((res:any)=>{
      this.product = res.result
      console.log(this.product)
    })
  }

  addToCart(){

  }

}
