import { Component, OnDestroy,Output,EventEmitter, OnInit } from '@angular/core';
import { Category } from '../types/categories.data';
import { SubCategory } from '../types/subcategories.type';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoriesStoreItem } from '../../services/category/categories.storeitem';
import { SubCategoriesStoreItem } from '../../services/sub-category/subcategory.storeitem';

@Component({
  selector: 'app-sidenavigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.scss'
})
export class SidenavigationComponent implements OnDestroy,OnInit {
  @Output()
  subCategoryClicked:EventEmitter<number> = new EventEmitter<number>();
  categories: Category[] = [];
  subCategories:SubCategory[]=[];
  subscriptions: Subscription = new Subscription();

  constructor(private categoryStore: CategoriesStoreItem,private subCategoriesStoreItem:SubCategoriesStoreItem) {
    this.subscriptions.add(
      categoryStore.categories$.subscribe((res:any) => {
        this.categories = res.data;    
      })
    );
    this.subscriptions.add(
      subCategoriesStoreItem.subcategories$.subscribe((subCategory:any) => {
        this.subCategories = subCategory;   
      })
    );
  }

  ngOnInit(): void {
   
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getSubCategories(udid):SubCategory[]{
    return this.subCategories.filter((subcategory)=>udid === subcategory.category_id);
  }

  onSubCategoryClick(subCategeory:SubCategory):void{
    this.subCategoryClicked.emit(subCategeory.udid);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
