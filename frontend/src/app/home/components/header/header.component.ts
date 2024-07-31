import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../../../services/category/categories.storeitem';
import { CommonModule } from '@angular/common';
import { SearchKeyword } from '../types/searchKeyword.type';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartStoreItem } from '../../../services/cart/cart.storeItem';
import { RouterModule } from '@angular/router';
import { UserServiceService } from '../../../services/users/user-service.service';
import { Subscription } from 'rxjs';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;
  faHeart = faHeart;
  faUser = faUser;
  displaySearch: boolean = true;
  dropdownOpen:boolean=false;

  isUserAuthenticated: boolean = false;
  userName: string = '';
  subscriptions: Subscription = new Subscription();

  @Output()
  searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>();

  constructor(public categoryStore: CategoriesStoreItem, private router: Router,
    public cartStore: CartStoreItem,
    private userService: UserServiceService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.displaySearch =
          (event as NavigationEnd).url === '/home/products' ? true : false;
      });

    this.subscriptions.add(
      this.userService.isUserAuthenticated$.subscribe((result) => {
        this.isUserAuthenticated = result;
      })
    );

    this.subscriptions.add(
      this.userService.loggedInUser$.subscribe((result) => {
        this.userName = result.firstName;
      })
    );
  }



  onClickSearch(keyword: string, categoryId: string): void {
    this.searchClicked.emit({
      categoryId: parseInt(categoryId), keyword: keyword
    });
  }

  navigateToCart(): void {
    this.router.navigate(['home/cart']);
  }

  navigateToWishlist():void{
    this.router.navigate(['home/wishlist']);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['home/products']);
  }

  pastOrders(): void {
    this.router.navigate(['home/pastorders']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
