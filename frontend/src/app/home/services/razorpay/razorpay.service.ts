import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

    private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  createOrder(amount: number, currency: string = 'INR') {
    return this.http.post(`${this.baseUrl}/create-order`, { amount, currency });
  }

  getOptions(orderId: string, amount: number, key: string) {
    return {
      key: key,
      amount: amount * 100, // amount in the smallest currency unit
      currency: 'INR',
      name: 'Estore',
      description: 'Test Transaction',
      image: '',
      order_id: orderId,
      handler: (response: any) => this.razorpayResponseHandler(response, amount, 'INR'),
      prefill: {
        name: 'Estore',
        email: 'vishalwagh8149@gmail.com',
        contact: '7350790231'
      },
      notes: {
        address: 'Ulhasnagar-421001'
      },
      theme: {
        color: '#F37254'
      }
    };
  }

  private razorpayResponseHandler(response: any, amount: number, currency: string) {
    let status = 'Success';
    if(response.error){
        status='Failed';
    }
    const paymentDetails = {
      ORDER_ID: response.razorpay_order_id,
      PAYMENT_ID: response.razorpay_payment_id,
      PAYMENT_STATUS: status, // Update this based on actual status
      AMOUNT:amount,
      CURRENCY:currency
    };
    this.http.post(`${this.baseUrl}/save-payment`, paymentDetails).subscribe({
      next: (result) => {
        console.log('Payment details saved successfully', result);
      },
      error: (error) => {
        console.error('Failed to save payment details', error);
      }
    });
  }
}
