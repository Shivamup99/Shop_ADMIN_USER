import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrdersService } from '../../services/orders/orders.service';
import { ORDER_STATUS } from '../constant/order_status';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order:any=Order
  orderStatus:any
  constructor(private orderService:OrdersService,private route:ActivatedRoute,private messageService:MessageService,private location:Location) {}
  ngOnInit(): void {
    this._makeStatus()
    this._getOrder()
  }
  private _getOrder(){
   this.route.params.subscribe(param=>{
    if(param['id']){
      this.orderService.getOrder(param['id']).subscribe(order=>{
        this.order = order.result
      //  console.log(order)
      })
    }
   })
  }
  private _makeStatus(){
    this.orderStatus = Object.keys(ORDER_STATUS).map((key:any)=>{
      return{
        id:key,
        name:ORDER_STATUS[key as keyof typeof ORDER_STATUS].label
      }
    })
  }

  onStatusChange(event: any){
    this.orderService.updateOrder({status:event.value},this.order._id).subscribe((res:any)=>{
        this.messageService.add({severity:'success', summary:'Service Message', detail:res.success});
      timer(2000).toPromise().then(done=> this.location.back())
    }, (error)=>{
      this.messageService.add({severity:'error', summary:'Service Message', detail:'status can not be updated'});
    })
  }

}
