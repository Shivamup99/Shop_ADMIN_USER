import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/admin/services/product/product.service';

@Component({
  selector: 'app-feature-product',
  templateUrl: './feature-product.component.html',
  styleUrls: ['./feature-product.component.scss']
})
export class FeatureProductComponent implements OnInit {
  featurePro:Product[]=[]
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this._getFeatureProduct()
  }

  private _getFeatureProduct(){
    this.productService.getFeatureProduct(4).subscribe((res:any)=>{
      this.featurePro = res.result
     // console.log(this.featurePro)
    })
  }

}
