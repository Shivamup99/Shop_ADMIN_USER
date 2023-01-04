import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit , OnDestroy {

  categories: Category[] = [];
  endSubscription$: Subject<any> = new Subject()
  constructor(private categoryService:CategoryService,private router:Router,private messageService:MessageService,private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getCategories();
  }
  // I am using end subs becuase of prevent leak memory like when I move from one router to other then previous rote data shold distroy from so I use pipe,takeuntli,subject and onDistrou
  ngOnDestroy(): void {
    this.endSubscription$.next;
    this.endSubscription$.complete();
  }

  deleteCategory(categoryId:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete category ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(categoryId).subscribe((res)=>{
          this.getCategories()
          this.messageService.add({severity:'success', summary:'Service Message', detail:res.message});
        },(error)=>{
          this.messageService.add({severity:'error', summary:'Service Message', detail:'category can not be deleted'})
        })
      },
      reject: (type: any) => {}
  });
  }

  private getCategories(){
    this.categoryService.getCategories().pipe(takeUntil(this.endSubscription$)).subscribe((res:any)=>{
      this.categories = res.result
     // console.log(this.categories)
    })
  }

  updateCategory(categoryId:string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

}
