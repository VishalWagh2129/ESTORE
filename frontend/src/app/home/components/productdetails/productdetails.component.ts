import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../components/types/products.type';
import { Subscription } from 'rxjs';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { CommonModule } from '@angular/common';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../../services/cart/cart.storeItem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { CartItem } from '../types/cart.type';
import { UserServiceService } from '../../../services/users/user-service.service';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [RatingComponent,CommonModule,FontAwesomeModule,MatTabsModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnDestroy,OnInit {
  faShoppingCart = faShoppingCart;
  faHeart=faHeart;
  faPlus=faPlus;
  product: Product;
  subscriptions: Subscription = new Subscription();
  sizes: string[] = ['S', 'M', 'L', 'XL'];
  isWishlistActive = false;
  udid:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cart: CartStoreItem,
    private userService:UserServiceService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.subscriptions.add(
      this.productsService.getProduct(id).subscribe((res:any) => {
        this.product = res.data;   
      })
    );
    this.subscriptions.add(
      this.userService.loggedInUser$.subscribe((result) => {
        this.udid = result.udid;
      })
    );
  }

  addToCart() {
    this.cart.addProduct(this.product);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cart.addProduct(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cart.decreaseProductQuantity(cartItem);
    }
  }

 

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
