import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/admin/services/category/category.service';

@Component({
  selector: 'app-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrls: ['./category-banner.component.scss']
})
export class CategoryBannerComponent implements OnInit , OnDestroy{
  category:Category[]=[];
  endSubs$:Subject<any> = new Subject();
  constructor(private categoryService:CategoryService) { }


  ngOnInit(): void {
    this._getCategories()
  }

  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete();
  }

  private _getCategories(){
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe((res:any)=>{
      this.category = res.result
      //console.log(this.category)
    })
  }

}
