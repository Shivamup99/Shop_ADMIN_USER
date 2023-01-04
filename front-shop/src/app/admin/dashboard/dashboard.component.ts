import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  order:any
  product:any
  customer:any
  totalSales:any
  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this._getOrderCount()
    this._getProductCount()
    this._getCustomerCount()
    this._getTotalSales()
  }

  private _getOrderCount(){
    this.dashboardService.getOrderCount().subscribe(res=>{
      this.order= res
     // console.log(this.order)
    })
  }

  private _getTotalSales(){
    this.dashboardService.getTotalOrderSale().subscribe(res=>{
      this.totalSales= res
     // console.log(this.totalSales)
    })
  }

  private _getProductCount(){
    this.dashboardService.getProductCount().subscribe(res=>{
      this.product= res
    })
  }

  private _getCustomerCount(){
    this.dashboardService.getCustomerCount().subscribe(res=>{
      this.customer= res
      //console.log(this.customer)
    })
  }

}
