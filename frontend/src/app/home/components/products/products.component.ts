import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { ProductsStoreItem } from '../../services/products/products.storeItems';
import { RouterModule } from '@angular/router';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { Product } from '../types/products.type';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RatingComponent, RouterModule, FontAwesomeModule, MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  faShoppingCart = faShoppingCart;
  totalProducts = 0;
  pageSize = 12;
  currentPage = 0;
  displayedProducts = [];
  products = [];

  constructor(public productStore: ProductsStoreItem, private cart: CartStoreItem) { }

  ngOnInit() {
    this.productStore.products$.subscribe(products => {
      this.products = products;
      this.totalProducts = products.length;
      this.loadProducts();
    });
  }

  addToCart(product: Product) {
    this.cart.addProduct(product);
  }

  onPageChange(event) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadProducts();
  }

  loadProducts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

}
