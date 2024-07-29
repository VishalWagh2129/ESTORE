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

@Component({
  selector: 'app-brands-list',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterModule,MatIconModule],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.scss'
})
export class BrandsListComponent {

  brandData:any=[];
  user:CurrentUserModel = new CurrentUserModel();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private brandService:BrandService,
    private snackBar : MatSnackBar,
    private componentManagerService:ComponentManagerService
  ) {
  }

  ngOnInit(){
    this.getAllBrands();
    this.user = this.componentManagerService.user;
  }

  getAllBrands(){
    this.brandService.getAll().subscribe((res:any)=>{
      if(res.success){
        this.brandData = res.data;
      }
    });
  }

  deleteBrand(data){
    this.brandService.delete(data.ID).subscribe((res:any)=>{
      if(res.success){
        this.snackBar.open('Brand Deleted successfully', 'Close', {
          duration: 3000 // duration in milliseconds
        });
      }
      this.getAllBrands();
    });
  }
  displayedColumns: string[] = ['name', 'description','status','action'];

  editBrand(data){  
    this.router.navigate(['/admin/brands/add/'], { queryParams: { id: data.udid,mode:'edit'} });
  }

  addBrand(){
    this.router.navigate(['/admin/brands/add'], {queryParams: { mode:'add'} });
  }

}
