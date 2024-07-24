import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartItem } from '../types/cart.type';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/users/user-service.service';
import { loggedInUser } from '../types/user.type';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';
import { DeliveryAddress } from '../types/cart.type';
import { RazorpayService } from '../../services/razorpay/razorpay.service';

declare var Razorpay: any;
declare var RazorpayAffordabilitySuite: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RatingComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {

  orderForm: FormGroup;
  faTrash = faTrash;
  user: loggedInUser;
  subscriptions: Subscription = new Subscription();
  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;

  constructor(public cartStore: CartStoreItem, private router: Router,
    private userService: UserServiceService, private fb: FormBuilder,
    private orderService: OrderService,
    private razorpayService: RazorpayService
  ) {
    this.user = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      pin: '',
      email: '',
      udid: ''
    };
    this.subscriptions.add(
      userService.loggedInUser$.subscribe((loggedUser) => {
        if (loggedUser.firstName) {
          this.user = loggedUser;
        }
      })
    );
  }



  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: [
        `${this.user.firstName} ${this.user.lastName}`,
        Validators.required,
      ],
      address: [this.user.address, Validators.required],
      city: [this.user.city, Validators.required],
      state: [this.user.state, Validators.required],
      pin: [this.user.pin, Validators.required],
    });

    // if (typeof Razorpay === 'undefined') {
    //   console.error('Razorpay script not loaded');

    // } else {
    //   console.log('Razorpay script loaded successfully');
    // }
    // const widgetConfig = {
    //   "key": "rzp_test_Aa7UfjnuT15I7E",
    //   "amount": 40000,
    // };
    // const rzpAffordabilitySuite = new RazorpayAffordabilitySuite(widgetConfig);
    // rzpAffordabilitySuite.render();
  }


  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }

  onSubmit(): void {
    if (this.userService.isUserAuthenticated) {
      const deliveryAddress: DeliveryAddress = {
        userName: this.orderForm.get('name')?.value,
        address: this.orderForm.get('address')?.value,
        city: this.orderForm.get('city')?.value,
        state: this.orderForm.get('state')?.value,
        pin: this.orderForm.get('pin')?.value,
      };
      this.subscriptions.add(
        this.orderService
          .saveOrder(deliveryAddress, this.user.email)
          .subscribe({
            next: (result) => {
              const amount = this.cartStore.cart.totalAmount;
              // this.razorpayService.createOrder(amount).subscribe((res: any) => {
              //   const options = this.razorpayService.getOptions(res.order.id, amount, res.key);
              //   const rzp1 = new Razorpay(options);
              //   rzp1.open();
              // });
              const key = "rzp_test_Aa7UfjnuT15I7E";
              const widgetConfig = {
                "key": key,
                "amount": amount,
              };
              const rzpAffordabilitySuite = new RazorpayAffordabilitySuite(widgetConfig);
              rzpAffordabilitySuite.render();
              this.cartStore.clearCart();
              this.alertType = 0;
              this.alertMessage = 'Order registered successfully!';
              this.disableCheckout = true;
            },
            error: (error) => {
              this.alertType = 2;
              if (error.error.message === 'Authorization failed!') {
                this.alertMessage = 'Please log in to register your order.';
              } else {
                this.alertMessage = error.error.message;
              }
            },
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
