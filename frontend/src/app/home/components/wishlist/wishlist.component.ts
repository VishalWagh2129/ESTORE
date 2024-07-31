import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartStoreItem } from '../../../services/cart/cart.storeItem';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CartItem } from '../types/cart.type';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  faXmark = faXmark;
  faCircleXmark = faCircleXmark;
  alertType: number = 0;
  alertMessage: string = '';
  wishlistData: any = [];

  constructor(public cartStore: CartStoreItem,
    private router: Router,
  ) { }


  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }

  navigateToDetail(data) {
    this.router.navigate([`home/product/${data.product.id}`]);
  }

}
