import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesStoreItem } from './services/category/categories.storeitem';
import { ProductsStoreItem } from './services/products/products.storeItems';
import { SearchKeyword } from './components/types/searchKeyword.type';
import { RouterOutlet } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UserServiceService } from './services/users/user-service.service';
import { SubCategoriesStoreItem } from './services/sub-category/subcategory.storeitem';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,WishlistComponent,FooterComponent,ReactiveFormsModule,RouterOutlet,SidenavigationComponent,CatnavigationComponent,FontAwesomeModule,ProductsComponent,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  subscriptions:Subscription = new Subscription();
  udid:any;

  constructor(private categoriesStoreItem:CategoriesStoreItem,
    private productsStoreItem:ProductsStoreItem,
    private subCategoriesStoreItem:SubCategoriesStoreItem,
    private router:Router,
    private userService:UserServiceService
  ){

    this.subscriptions.add(
      this.userService.loggedInUser$.subscribe((result) => {
        this.udid = result.udid;
      })
    );

    router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event) => {
      if((event as NavigationEnd).url === '/home'){
        router.navigate(['home/products']);
      }
    });
    this.categoriesStoreItem.loadCategories();
    this.subCategoriesStoreItem.loadSubCategories();
    this.productsStoreItem.loadProducts();
  }

  onSelectSubCategory(subCategeoryId:number){
    this.productsStoreItem.loadProducts('subcategoryid=' + subCategeoryId);
  }

  onSelectCategory(categeoryId:number){
    this.productsStoreItem.loadProducts('maincategoryid=' + categeoryId);
  }

  onSearchKeyword(searchKeyword:SearchKeyword){
    this.productsStoreItem.loadProducts('maincategoryid=' + searchKeyword.categoryId + '&keyword=' + searchKeyword.keyword);
  }


}
