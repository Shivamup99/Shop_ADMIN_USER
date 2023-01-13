import { GalleryComponent } from './admin/gallery/gallery.component';
import { ProductDetailsComponent } from './frontend/product-details/product-details.component';
import { ProductsShopComponent } from './frontend/products-shop/products-shop.component';
import { HomeComponent } from './frontend/home/home.component';
import { AddProductsComponent } from './admin/product/add-products/add-products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './admin/shared/shell/shell.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { OrderListComponent } from './admin/order/order-list/order-list.component';
import { OrderDetailComponent } from './admin/order/order-detail/order-detail.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { LoginComponent } from './auth/login/login.component';
import { Authgaurd } from './auth/services/local/gaurd/authgaurd.service';

const routes: Routes = []=[
  {path:'',component:ShellComponent,
  canActivate:[Authgaurd],
  children:[
     {path:'',component:DashboardComponent},
     {path:'categories',component:CategoryListComponent},
     {path:'categories/form',component:AddCategoryComponent},
     {path:'categories/form/:id',component:AddCategoryComponent},
     {path:'products',component:ProductListComponent},
     {path:'products/form',component:AddProductsComponent},
     {path:'products/form/:id',component:AddProductsComponent},
     {path:'orders',component:OrderListComponent},
     {path:'orders/:id',component:OrderDetailComponent},
     {path:'users',component:UserListComponent},
     {path:'users/form',component:AddUserComponent},
     {path:'users/form/:id',component:AddUserComponent},
     {path:'products/gallery/:id',component:GalleryComponent}
  ]
 },
 {path:'login',component:LoginComponent},
 {path:'home',component:HomeComponent},
 {path:'products/shop',component:ProductsShopComponent},
 {path:'products/category/:categoryId',component:ProductsShopComponent},
 {path:'products/:productId',component:ProductDetailsComponent},
 {path:'**', redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
