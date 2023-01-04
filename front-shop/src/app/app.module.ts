import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {RatingModule} from 'primeng/rating';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarComponent } from './admin/shared/sidebar/sidebar.component';
import { ShellComponent } from './admin/shared/shell/shell.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { OrderDetailComponent } from './admin/order/order-detail/order-detail.component';
import { OrderListComponent } from './admin/order/order-list/order-list.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { AddProductsComponent } from './admin/product/add-products/add-products.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { JwtInterceptor } from './auth/services/local/gaurd/jwt.interceptor';
import { HomeComponent } from './frontend/home/home.component';
import { HeaderComponent } from './frontend/header/header.component';
import { SearchComponent } from './frontend/search/search.component';
import { HeroComponent } from './frontend/hero/hero.component';
import { BannerComponent } from './frontend/hero/banner/banner.component';
import { CategoryBannerComponent } from './frontend/hero/category-banner/category-banner.component';
import { FeatureProductComponent } from './frontend/hero/feature-product/feature-product.component';
import { ProductsComponent } from './frontend/products/products.component';
import { ProductsShopComponent } from './frontend/products-shop/products-shop.component';
import { ProductDetailsComponent } from './frontend/product-details/product-details.component';
import { ProductGalleryComponent } from './frontend/product-gallery/product-gallery.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    ShellComponent,
    CategoryListComponent,
    AddCategoryComponent,
    OrderDetailComponent,
    OrderListComponent,
    ProductListComponent,
    AddProductsComponent,
    AddUserComponent,
    UserListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    HeroComponent,
    BannerComponent,
    CategoryBannerComponent,
    FeatureProductComponent,
    ProductsComponent,
    ProductsShopComponent,
    ProductDetailsComponent,
    ProductGalleryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    TagModule,
    FieldsetModule,
    InputMaskModule,
    CheckboxModule,
    RatingModule
  ],
  providers: [MessageService, ConfirmationService,
  {provide:HTTP_INTERCEPTORS , useClass:JwtInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
