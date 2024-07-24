import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotateRight,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { faCartFlatbed } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faSquarePhone } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  faRotateRight=faRotateRight;
  faCartShopping=faCartShopping;
  faShoppingCart=faShoppingCart;
  faAward=faAward;
  faCartFlatbed=faCartFlatbed;
  faCreditCard=faCreditCard;
  faSquarePhone=faSquarePhone;
  faLocationDot=faLocationDot;

}
