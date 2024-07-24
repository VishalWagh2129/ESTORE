import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import { Order,OrderItem } from '../../components/types/order.type';
import { DeliveryAddress } from '../../components/types/cart.type';
import { UserServiceService } from '../users/user-service.service';
import { PastOrder,PastOrderProduct } from '../../components/types/order.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // apiUrl:string='http://localhost:3000/api';
  apiUrl : string = 'https://estore-3ey7.onrender.com/api';

  constructor(private httpClient: HttpClient,
    private cartStore: CartStoreItem,
    private userservice: UserServiceService) { }


  saveOrder(
    deliveryAddress: DeliveryAddress,
    userEmail: string
  ): Observable<any> {
    // const url: string = 'http://localhost:3000/api/add';
    const url : string = 'https://estore-3ey7.onrender.com/api/add';
    const orderDetails: OrderItem[] = [];
    this.cartStore.cart.products.forEach((product) => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        price: product.product.price,
        qty: product.quantity,
        amount: product.amount,
      };
      orderDetails.push(orderItem);
    });

    const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStore.cart.totalAmount,
      userEmail: userEmail,
      orderDetails: orderDetails,
    };
    return this.httpClient.post(url, order, {
      headers: { authorization: this.userservice.token },
    });
  }

  getOrders(userEmail: string): Observable<PastOrder[]> {
    // const url: string = `http://localhost:3000/api/allorders?userEmail=${userEmail}`;
    const url : string = `https://estore-3ey7.onrender.com/api/allorders?userEmail=${userEmail}`;

    return this.httpClient.get<PastOrder[]>(url, {
      headers: { authorization: this.userservice.token },
    });
  }

  getOrderProducts(orderId: number): Observable<PastOrderProduct[]> {
    // const url: string = `http://localhost:3000/api/orderproducts?orderId=${orderId}`;
    const url : string = `https://estore-3ey7.onrender.com/api/orderproducts?orderId=${orderId}`;

    return this.httpClient.get<PastOrderProduct[]>(url, {
      headers: { authorization: this.userservice.token },
    });
  }

  getAllOrders(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/getAllOrders`);
  }
}
