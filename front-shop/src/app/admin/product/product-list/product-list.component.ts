import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit , OnDestroy {

  products :Product[]=[];
  endSubscription$: Subject<any> = new Subject()
  constructor(private productService:ProductService,private messageService:MessageService,private router:Router,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
   this.getProducts()
  }

  ngOnDestroy(): void {
    this.endSubscription$.next;
    this.endSubscription$.complete();
  }

  private getProducts(){
    this.productService.getProducts().pipe(takeUntil(this.endSubscription$)).subscribe((res:any)=>{
      this.products = res.result;
      //console.log(this.products)
    })
  }
  updateProduct(productId:string){
    this.router.navigateByUrl(`products/form/${productId}`)
  }

  deleteProduct(productId:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete product ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe((res)=>{
          this.getProducts()
          this.messageService.add({severity:'success', summary:'Service Message', detail:res.message});
        },(error)=>{
          this.messageService.add({severity:'error', summary:'Service Message', detail:'product can not be deleted'})
        })
      },
      reject: (type: any) => {}
  });
  }

  // sortProductName(name:string){

  // }

}
