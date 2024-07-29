import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../services/category/category.service';
import { SubcategoryService } from '../../../../services/sub-category/subcategory.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ComponentManagerService } from '../../../../services/component-manager.service';

@Component({
  selector: 'app-subcategory-edit',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './subcategory-edit.component.html',
  styleUrl: './subcategory-edit.component.scss'
})
export class SubCategoryEditComponent implements OnInit {

  subcategoryForm: FormGroup;
  submitted: boolean = false;
  subCategoryId: any;
  mode: any;
  brandDetailData: any;
  categoryData:any=[];
  user: any;

  constructor(private fb: FormBuilder,
    private subcategoryService: SubcategoryService,
    private categoryService:CategoryService,
    private router: Router,
    private SnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private componentManagerService: ComponentManagerService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (!!params.id) {
        this.subCategoryId = params.id;
        this.mode = params.mode;
        this.getSubCategoryDetailsById(this.subCategoryId);
      }
    });
    this.subcategoryForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.user = this.componentManagerService.user;
    this.getAllActiveCategories();
  }

  getAllActiveCategories(){
    this.categoryService.getAllActiveCategories().subscribe((res:any)=>{
      if(res.success){
        this.categoryData = res.data;
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.subcategoryForm.valid) {
      const data = {
        subcategory_name: this.subcategoryForm.value.name,
        created_by: this.user.UDID,
        updated_by: this.user.UDID,
        record_status: this.subcategoryForm.value.status,
        category_id:this.subcategoryForm.value.category,
      };
      this.subcategoryService.save(data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Category saved successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/subcategory']);
        } else {
          this.SnackBar.open('Error While Saving Category', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  onUpdate() {
    this.submitted = true;
    if (this.subcategoryForm.valid) {
      const data = {
        subcategory_name: this.subcategoryForm.value.name,
        updated_by: this.user.UDID,
        record_status: this.subcategoryForm.value.status,
        category_id:this.subcategoryForm.value.category,
      };
      this.subcategoryService.update(this.subCategoryId, data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Category Updated successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/subcategory']);
        } else {
          this.SnackBar.open('Error While Updated Category', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  getSubCategoryDetailsById(id) {
    this.subcategoryService.getById(id).subscribe((res: any) => {
      if (res.success) {
        this.brandDetailData = res.data;
        this.setData(res.data);
      }
    })
  }

  setData(data) {
    if (this.mode === 'edit') {
      this.subcategoryForm.get('name').setValue(data.subcategory_name);
      this.subcategoryForm.get('status').setValue(data.record_status);
      this.subcategoryForm.get('category').setValue(data.category_id);
    }
  }

}
