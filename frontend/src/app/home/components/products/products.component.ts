import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { ProductsStoreItem } from '../../services/products/products.storeItems';
import { RouterModule } from '@angular/router';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { Product } from '../types/products.type';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RatingComponent,RouterModule,FontAwesomeModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  faShoppingCart=faShoppingCart;

  constructor(public productStore:ProductsStoreItem,private cart:CartStoreItem) { }

  addToCart(product: Product) {
    this.cart.addProduct(product);
  }

}
