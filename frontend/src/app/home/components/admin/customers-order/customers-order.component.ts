import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentManagerService } from '../../../services/component-manager.service';
import { CurrentUserModel } from '../../types/common.model';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-customers-order',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterModule,MatIconModule],
  templateUrl: './customers-order.component.html',
  styleUrl: './customers-order.component.scss'
})
export class CustomersOrderComponent {

  user:CurrentUserModel = new CurrentUserModel();
  customerData:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar : MatSnackBar,
    private componentManagerService:ComponentManagerService,
    private customerOrderService:OrderService
  ) {
  }

  ngOnInit(){
    this.getAllProducts();
    this.user = this.componentManagerService.user;
  }

  getAllProducts(){
    this.customerOrderService.getAllOrders().subscribe((res:any)=>{
      if(res.success){
        this.customerData = res.data;
      }
    });
  }

  displayedColumns: string[] = ['name', 'order_date','price','cname','cemail','cmobile'];

}
