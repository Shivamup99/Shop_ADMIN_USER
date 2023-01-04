import { Category } from "./category"

export class Product{
  id?:string
  name?:string
  description?:string
  about?:string
  image?:string
  images?:string[]
  brand?:string
  price?:number
  category?:Category
  countInStock?:number
  rating?:number
  reviews?:number
  isFeatured?:number
}
