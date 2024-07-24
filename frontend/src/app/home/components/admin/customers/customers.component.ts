import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandService } from '../../../services/brand/brand.service';
import { ComponentManagerService } from '../../../services/component-manager.service';
import { CurrentUserModel } from '../../types/common.model';
import { UserServiceService } from '../../../services/users/user-service.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterModule,MatIconModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {


  customerData:any=[];
  user:CurrentUserModel = new CurrentUserModel();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService:UserServiceService,
    private snackBar : MatSnackBar,
    private componentManagerService:ComponentManagerService
  ) {
  }

  ngOnInit(){
    this.getAllCustomers();
    this.user = this.componentManagerService.user;
  }

  getAllCustomers(){
    this.userService.getAllCustomers().subscribe((res:any)=>{
      if(res.success){
        this.customerData = res.data;
      }
    });
  }

  deleteCustomer(data){
    // this.brandService.delete(data.ID).subscribe((res:any)=>{
    //   if(res.success){
    //     this.snackBar.open('Brand Deleted successfully', 'Close', {
    //       duration: 3000 // duration in milliseconds
    //     });
    //   }
    //   this.getAllBrands();
    // });
  }
  displayedColumns: string[] = ['name', 'email','pin','state','city','action'];

  editCustomer(data){  
    this.router.navigate(['/admin/customers/edit'], { queryParams: { id: data.udid,mode:'edit'} });
  }


}
