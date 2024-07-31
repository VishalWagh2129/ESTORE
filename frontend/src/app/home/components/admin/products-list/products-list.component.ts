import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminProductsService } from '../../../../services/admin-products/admin-products.service';
import { MatRadioModule } from '@angular/material/radio';
import { ComponentManagerService } from '../../../../services/component-manager.service';
import { BrandService } from '../../../../services/brand/brand.service';
import { CurrentUserModel } from '../../types/common.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterModule, MatRadioModule,MatTableModule,MatIconModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {

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
    this.router.navigate(['/admin/products/add/'], { queryParams: { id: data.udid, mode:'edit'} });
  }

  addProduct(){
    this.router.navigate(['/admin/products/add'], {queryParams: { mode:'add'} });
  }

}
