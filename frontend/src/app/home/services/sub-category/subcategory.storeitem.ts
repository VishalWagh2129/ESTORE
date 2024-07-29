import { StoreItem } from '../../../shared/storeitems';
import { Category } from '../../components/types/categories.data';
import { SubcategoryService } from './subcategory.service';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class SubCategoriesStoreItem extends StoreItem<Category[]> {
  constructor(private subCategoryService: SubcategoryService) {
    super([]);
  }

  async loadSubCategories() {
    this.subCategoryService.getAll().subscribe((res:any) => {
      this.setValue(res.data);
    });
  }

  get subcategories$(): Observable<Category[]> {
    return this.value$;
  }

}
