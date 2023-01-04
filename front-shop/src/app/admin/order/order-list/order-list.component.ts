import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrdersService } from '../../services/orders/orders.service';
import { ORDER_STATUS } from '../constant/order_status';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit,OnDestroy {

  orders:Order[]=[];
  orderStatus = ORDER_STATUS;
  endSubscription$: Subject<any> = new Subject()
  constructor(private orderService:OrdersService,private router:Router,private confirmationService:ConfirmationService,private messageService:MessageService) {}
  ngOnInit(): void {
    this._getOrders()
  }

  ngOnDestroy(): void {
    this.endSubscription$.next;
    this.endSubscription$.complete();
  }

  private _getOrders(){
    this.orderService.getOrders().pipe(takeUntil(this.endSubscription$)).subscribe((res:any)=>{
      this.orders = res.result
      //console.log(res.result)
      //console.log(this.orderStatus[0].label)
    })
  }

  showOrder(orderId: any){
    this.router.navigateByUrl(`orders/${orderId}`)
  }

  deleteOrder(orderId:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete order ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(orderId).subscribe((res)=>{
          this._getOrders()
          this.messageService.add({severity:'success', summary:'Service Message', detail:res.message});
        },(error)=>{
          this.messageService.add({severity:'error', summary:'Service Message', detail:'order can not be deleted'})
        })
      },
      reject: (type: any) => {}
  });
  }

}

