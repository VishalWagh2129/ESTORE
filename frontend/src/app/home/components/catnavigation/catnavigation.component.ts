import { Component,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesStoreItem } from '../../services/category/categories.storeitem';
import { Category } from '../types/categories.data';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss'
})
export class CatnavigationComponent {
  @Output()
  categoryClicked:EventEmitter<number>=new EventEmitter<number>();
  displayOptions: boolean = true;

  menuOpen = false;

  constructor(public categoryStore:CategoriesStoreItem,private router: Router) {
    router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event) => {
      this.displayOptions = (event as NavigationEnd).url === '/home' ? true : false;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  
  onCategoryClick(category:Category):void{
    this.categoryClicked.emit(category.id);
  }

}
