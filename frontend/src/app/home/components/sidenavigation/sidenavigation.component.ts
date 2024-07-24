import { Component, OnDestroy,Output,EventEmitter } from '@angular/core';
import { Category } from '../types/categories.data';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoriesStoreItem } from '../../services/category/categories.storeitem';

@Component({
  selector: 'app-sidenavigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.scss'
})
export class SidenavigationComponent implements OnDestroy {
  @Output()
  subCategoryClicked:EventEmitter<number> = new EventEmitter<number>();
  categories: Category[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(categoryStore: CategoriesStoreItem) {
    this.subscriptions.add(
      categoryStore.categories$.subscribe((categories) => {
        this.categories = categories;     
      })
    );
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter(
      (category) => parentCategoryId ? category.parent_category_id === parentCategoryId
        : category.parent_category_id === null
    );
  }

  onSubCategoryClick(subCategeory:Category):void{
    this.subCategoryClicked.emit(subCategeory.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
