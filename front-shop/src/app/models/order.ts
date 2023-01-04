import { User } from './user';
import { OrderItem } from "./order-item";

export class Order{
  orderItems?:OrderItem
  shippingAddress1?:string
  shippingAddress2?:string
  phone?:number
  zip?:number
  city?:string
  country?:string
  status?:number
  totalPrice?:number
  user?:User
  id?:string
  createdAt?:string
}
