import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminProductsService } from '../../../services/admin-products/admin-products.service';
import { ComponentManagerService } from '../../../services/component-manager.service';
import { CurrentUserModel } from '../../types/common.model';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterModule,MatIconModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent {

  productsData:any=[];
  user:CurrentUserModel = new CurrentUserModel();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar : MatSnackBar,
    private productsService:AdminProductsService,
    private componentManagerService:ComponentManagerService
  ) {
  }

  ngOnInit(){
    this.getAllProducts();
    this.user = this.componentManagerService.user;
  }

  getAllProducts(){
    this.productsService.getAll().subscribe((res:any)=>{
      if(res.success){
        this.productsData = res.data;
      }
    });
  }

  deleteProduct(data){
    this.productsService.delete(data.UDID).subscribe((res:any)=>{
      if(res.success){
        this.snackBar.open('Brand Deleted successfully', 'Close', {
          duration: 3000 // duration in milliseconds
        });
      }
      this.getAllProducts();
    });
  }
  displayedColumns: string[] = ['name', 'description','price','action'];

  editProduct(data){  
    this.router.navigate(['/admin/products/add/'], { queryParams: { id: data.UDID, mode:'edit'} });
  }

  addProduct(){
    this.router.navigate(['/admin/products/add'], {queryParams: { mode:'add'} });
  }

}
