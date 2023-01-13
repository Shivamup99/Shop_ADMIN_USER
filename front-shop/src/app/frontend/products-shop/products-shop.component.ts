import { ActivatedRoute } from '@angular/router';
import { Category } from './../../models/category';
import { CategoryService } from './../../admin/services/category/category.service';
import { Product } from './../../models/product';
import { ProductService } from './../../admin/services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-shop',
  templateUrl: './products-shop.component.html',
  styleUrls: ['./products-shop.component.scss']
})
export class ProductsShopComponent implements OnInit {
  products:Product[] = []
  categories:Category[]=[]
  checked: any;
  isCategoryPage:boolean | undefined
  page = 1;
  itemsPerPage = 6;
  totalItems : any;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  constructor(private productService:ProductService,private categoryService:CategoryService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      params['categoryId'] ? this._getProducts([params['categoryId']]) : this._getProducts()
      params['categoryId'] ? this.isCategoryPage=true:this.isCategoryPage=false
    })
    //this._getProducts();
    this._getCategory();
  }

  private _getProducts(categoriesFilter ?:string[]){
    this.productService.getProducts(categoriesFilter).subscribe((res:any)=>{
      this.products = res.result
    })
  }

  private _getCategory(){
   this.categoryService.getCategories().subscribe((res:any)=>{
    this.categories = res.result
   })
  }

  categoryFilter(){
    const selectedCat = this.categories.filter(cat=>cat.checked).map(category=>category.id)
    this._getProducts(selectedCat as string[])
  }

}
