import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentManagerService } from '../../../../services/component-manager.service';
import { CurrentUserModel } from '../../types/common.model';
import { CategoryService } from '../../../../services/category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,RouterModule,MatIconModule,MatTableModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  brandData:any=[];
  user:CurrentUserModel = new CurrentUserModel();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService:CategoryService,
    private snackBar : MatSnackBar,
    private componentManagerService:ComponentManagerService
  ) {
  }

  ngOnInit(){
    this.getAllCategories();
    this.user = this.componentManagerService.user;
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((res:any)=>{
      if(res.success){
        this.brandData = res.data;
      }
    });
  }

  deleteBrand(data){
    this.categoryService.delete(data.udid).subscribe((res:any)=>{
      if(res.success){
        this.snackBar.open('Category Deleted successfully', 'Close', {
          duration: 3000 // duration in milliseconds
        });
      }
      this.getAllCategories();
    });
  }
  displayedColumns: string[] = ['name', 'status','action'];

  editBrand(data){  
    this.router.navigate(['/admin/category/add/'], { queryParams: { id: data.udid,mode:'edit'} });
  }

  addBrand(){
    this.router.navigate(['/admin/category/add'], {queryParams: { mode:'add'} });
  }

}
